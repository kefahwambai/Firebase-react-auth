import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    // const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        // setUser(user);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
    
    
    function handleLogout() {
        signOut(auth)        
        .then(() => {
                       
            console.log("Success!")
            setMessage("Successfuly Logged out!")
            navigate("/login") 
        })
        .catch((error) =>{
            const errorMessage = error.errormessage
            console.log("Failed to logout", errorMessage)
        })
    }

    const user = auth.currentUser;
        if (user !== null) {    
       
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert className='SignupError'>{error}</Alert>}
                    {message && <Alert className='=LogoutMessage'>{message}</Alert>}
                    {user ? <span><strong>Name</strong> {user.displayName}</span> : null}
                    <br/> 
                    {user ? <span><strong>Phone Number</strong> {user.phoneNumber}</span> : null}  
                    <br/>                   
                    {user ? <span><strong>Email</strong> {user.email}</span> : null}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>

            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </>
    );
}
