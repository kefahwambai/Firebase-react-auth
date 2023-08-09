import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase"
import { Link, useNavigate} from "react-router-dom"


function Login() { 

  const [displayName, setDisplayName] = useState("");    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();  

    try {      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      const user = userCredential.user;
      
      console.log("User Logged in:", user);
    } catch (error) {
      console.log("Login Error:", error.message);
      setLoginError(error.message); 
    }
  };
 

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          <Form type="sumit" onSubmit={handleSubmit}>
             {loginError && <Alert className="SignupError">{loginError}</Alert>}
           
             <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
           
            <Button className='w-100' type="submit">Login</Button>                      
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login;