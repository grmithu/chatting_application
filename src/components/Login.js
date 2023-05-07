import React from 'react'
import { Alert, Container, Row, Button, Form,Spinner, Span, Modal} from 'react-bootstrap'
import { useState}  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

 



const Login = () => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const auth = getAuth();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let [email, setEmail] = useState("")
  let [erremail, setErremail] = useState("")
  let [password, setPassword] = useState("")
  let [errpassword, setErrpassword] = useState("")
  let [msg, setMsg] = useState("")
  let [match, setmatch] = useState("")
  let [loading, setLoading] = useState(false)
  let [resetemail, setResetemail] = useState("")
  let [errresetemail, setErresetemail] = useState("")
  let [wpass, setWpass] = useState("")

   
  let handleEmail=(e)=>{
    setEmail(e.target.value) 
  }
  let handlePassword=(e)=>{
    setPassword(e.target.value) 
  }
 

  let handleSubmit=(e)=>{
    e.preventDefault()
    
    if(email == ""){
      setErremail("Give an email")
    }
    else if(password == ""){
      setErrpassword("Set your password")
    }
    else{
      setLoading(true)
      
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setEmail("")
          setPassword("")
          setLoading(false)
          navigate("/", {state:"Welcome to galpo"});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode.includes("wrong-password")){
              setWpass("Password not match")
              setLoading(false)
          }
          console.log(error)
        });
    }
  }
 

  const notify = () => toast(state);
  const notify2 = () => toast("Please check your Email for password reset");

  if(msg){
    if(state){
      notify()
      setMsg(false) 
    }
  }


  let handleResetEmail=(e)=>{
    setResetemail(e.target.value)
  }

  let handlePasswordReset=()=>{
    
    if(resetemail == ""){
      setErresetemail("Please give an email")
    }
    else{
      sendPasswordResetEmail(auth, resetemail)
      .then(() => {
        setShow(false)
        notify2()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ace")
      });
    }
  }


  return (
    <div>
      <Container>
        <ToastContainer />
        <Row>
          <Alert className='text-center mt-5  ' variant='primary'>
          <h1>Login For Prothom</h1>
          </Alert>

          <Form>
            
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
              {wpass
              ?
                <Form.Text className="text-muted err b">
                   {wpass }
                </Form.Text>
              :
                ""
              } 
            </Form.Group>

          

            
          {loading
              ?
                <Button className='w-100' variant="primary" type="submit">
                <Spinner animation="border" role="status"  >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </Button>
              : 
              <Button onClick={handleSubmit} className='w-100' variant="primary" type="submit">
              Login  
              </Button>
               
            }
            

            <div className="text-center mt-3">
                <Form.Text id="passwordHelpBlock" muted >
                Don't have an Account? <Link to="/registration">Create Account</Link>
                </Form.Text>
            </div>

            <div className="text-center mt-3">
                <Form.Text id="passwordHelpBlock" muted >
                Forget your password? <Button onClick={handleShow} variant="danger" size="sm">Reset</Button>
                </Form.Text>
            </div>
        
        
      
      
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleResetEmail} type="email" placeholder="Enter email" />
            {errresetemail
            ? 
              <Form.Text className="text-muted err">
              We'll never share your email with anyone else.
            </Form.Text>
            :
              ""
            }
          
          </Form.Group>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePasswordReset}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>


      </Form>
        </Row>
      </Container>
    </div>
  )
}



export default Login

