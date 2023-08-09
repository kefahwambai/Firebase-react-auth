import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSignupError("Password and confirmation do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);

      await updateProfile(user, { displayName, phoneNumber });

      await sendEmailVerification(auth.currentUser);
      
      // Update the user's display name
      

      navigate("/");
    } catch (error) {
      console.log("Sign Up Error:", error.message);
      setSignupError(error.message); 
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Signup</h2>
          <Form type="submit" onSubmit={handleSubmit}>
            {signupError && <Alert className="SignupError">{signupError}</Alert>}
            <Form.Group id="displayName"> 
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={displayName} required onChange={(e) => setDisplayName(e.target.value)} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="phoneNumber"> 
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" placeholder="Begin with country code"value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group id="passwordconfirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" value={passwordConfirmation} required onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
            <Button className='w-100 mt-4' type="submit">Signup</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
