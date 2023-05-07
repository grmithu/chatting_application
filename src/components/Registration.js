import { Alert, Container, Row, Button, Form,  Spinner, Span} from 'react-bootstrap'
import { useState} from 'react'
import { Link,useLocation, useNavigate} from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set } from "firebase/database";


export default function Registration() {
    const navigate = useNavigate();

    // const {state} = useLocation();
    //const notify = () => toast("Wow so easy!");

    let [username, setUsername] = useState("")
    let [errusername, setErrusername] = useState("")
    let [email, setEmail] = useState("")
    let [erremail, setErremail] = useState("")
    let [password, setPassword] = useState("")
    let [errpassword, setErrpassword] = useState("")
    let [cpassword, setCpassword] = useState("")
    let [errcpassword, setErrcpassword] = useState("")
    let [match, setmatch] = useState("")
    let [loading, setLoading] = useState(false)
    let [sameemail, setSameemail] = useState("")
   
    let handleUsername=(e)=>{
      setUsername(e.target.value) 
    }
    let handleEmail=(e)=>{
      setEmail(e.target.value) 
    }
    let handlePassword=(e)=>{
      setPassword(e.target.value) 
    }
    let handleCpassword=(e)=>{
      setCpassword(e.target.value) 
    }
  
  
    let handleSubmit=(e)=>{
      e.preventDefault()
      if(username == ""){
        setErrusername("Give a name")
      }
      else if(email == ""){
        setErremail("Give an email")
      }
      else if(password == ""){
        setErrpassword("Set your password")
      } 
      else if(cpassword == ""){
        setErrcpassword("Please your confirm password")
      }
      else if(password != cpassword){
        setmatch("Please not match")
      }
      else{
        setLoading(true)
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            
            updateProfile(auth.currentUser, {
              displayName: username, 
              photoURL: "https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media-thumbnail.png"
            }).then(() => {

              const db = getDatabase();
                set(ref(db, 'users/' + user.user.uid ),  {
                  username: username,
                  email: email,
                  id: user.user.uid,
                   img: user.user.photoURL
                  //createdAt: Date() 
                }).then(()=> {
                      setUsername("")
                      setErrusername("")
                      setEmail("")
                      setErremail("")
                      setPassword("")
                      setErrpassword("")
                      setCpassword("")
                      setErrcpassword("")
                      setmatch("")
                      setLoading(false)
                      sendEmailVerification(auth.currentUser)
                      .then(() => {
                          console.log("Email send your inbox")
                      });
                      console.log(user)
                      navigate("/login", {state:"Account Created Successful"});
                      })
                })

              

            })
            // .catch((error) => {
              
            // }); 

            

            
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode.includes ("email")){
              setSameemail("Email Already In Use")
              setLoading(false)
            }
           
          });
      }
    }


   
  return (
    <div>

        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer /> 

      <Container>
        <Row>
          <Alert className='text-center mt-5  ' variant='primary'>
          <h1>Registration</h1>
          </Alert>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control onChange={handleUsername} type="text" placeholder="Write your full name" value={username} />
              {errusername
              ?
                <Form.Text className="text-muted err b">
                   {errusername}
                </Form.Text>
              :
                ""
              }  
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" value={email}/>
              {erremail
              ?
                <Form.Text className="text-muted err b">
                   {erremail}
                </Form.Text>
              :
                ""
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handlePassword} type="password" placeholder="Password" value={password}/>
              {errpassword
              ?
                <Form.Text className="text-muted err b">
                   {errpassword}
                </Form.Text>
              :
                ""
              } 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control onChange={handleCpassword} type="password" placeholder="Confirm Password" value={cpassword}/>
              {errcpassword
              ?
                <Form.Text className="text-muted err b">
                   {errcpassword}
                </Form.Text>
              :
                ""
              }
              {match
              ?
                <Form.Text className="text-muted err b">
                   {match}
                </Form.Text>
              :
                ""
              }
              {sameemail
              ?
                <Form.Text className="text-muted err b">
                   {sameemail}
                </Form.Text>
              :
                ""
              }
            </Form.Group>
            
            {loading
            ?
              <Button  className='w-100' variant="primary" type="submit">
              <Spinner animation="border" role="status"  >
              <span className="visually-hidden">Loading...</span>
              </Spinner>
              </Button>
            : 
            <Button onClick={handleSubmit} className='w-100' variant="primary" type="submit">
            "Submit"
            </Button>
            
            }
             

            <div className="text-center mt-3">
                <Form.Text id="passwordHelpBlock" muted >
                Already have an Account? <Link to="/login">Login </Link>
                </Form.Text>
            </div>

          </Form>
        
          

        </Row>
      </Container>
    </div>
  )
}

