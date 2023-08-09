import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase"
import { Link, useNavigate} from "react-router-dom"


function ForgotPassword() { 
  
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
  

  const handleSubmit = async (e) => {
    e.preventDefault();  

     resetPassword(e)
  };

  function resetPassword(e){
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
    .then(() => {
        // navigate('/login')
        setMessage("Success! Check your inbox for further instruction")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage)
    });


  }
 

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          <Form type="sumit" onSubmit={handleSubmit}>
             {loginError && <Alert variant="danger" className="SignupError">{loginError}</Alert>}
             {message && <Alert variant="success">{message}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>           
            <Button className='w-100' type="submit" onSubmit={resetPassword}>Reset Password</Button>                      
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default ForgotPassword;