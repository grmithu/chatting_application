import React, { useEffect } from 'react'
import { Button , Form, Modal, ProgressBar} from 'react-bootstrap';
//import {Form} from 'react-bootstrap/Form';
import {useState} from 'react'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const Middle = () => {

  let [msg,setMsg] = useState("")
  let [usermsg,setUserMsg] = useState("")
  let [fileforupload,setFileforupload] = useState("")
  let [progress,setProgress] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  let handleMsg = (e)=>{
    setMsg(e.target.value)
  }

  let handleSend = () =>{
    const db = getDatabase();
    set(ref(db, 'message/'), {
       msg: msg
  });
  }

  useEffect(()=>{
    const db = getDatabase();
    const starCountRef = ref(db, 'message/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserMsg(data)
    });
  },[])

  let handleFileSelect = (e) =>{
    setFileforupload(e.taget.files[0]) 
    console.log(e.target.files[0].name)
  }
 
  let handleFileUpload = () => {
  
    const storage = getStorage();

    const metadata = {
      contentType: 'image/jpeg'
    };
  

    // const storageRef = refer(storage, `test/${fileforupload.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, fileforupload);


    const storageRef = refer(storage, 'images/' + fileforupload.name);
    const uploadTask = uploadBytesResumable(storageRef, fileforupload, metadata);

    uploadTask.on('state_changed', 
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress)
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
  );
}

  return (
   <>
        <div className="middle">
            <h1> {usermsg.msg}</h1>
        </div>
        
        <Form.Control onChange={handleMsg} type="email" placeholder="name@example.com" />
            
        <Button className='w-50' onClick={handleSend} >Send</Button> 
        <Button className='w-50' variant="primary" onClick={handleShow}>File</Button> 



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a file for upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control onChange={handleFileSelect} type="file" placeholder="Enter File" />
          { <ProgressBar now={progress} label={`${progress}%`} /> }
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )

}

export default Middle


