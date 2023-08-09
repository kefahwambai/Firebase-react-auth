import React, {useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import NavigationBar from './Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
 

  return (
    

    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>

      <div className="w-100" style={{ maxWidth: "400px"}}>      
        <Router>
          <Routes>
            
            <Route exact path="/" Component={Dashboard}/>
            <Route path="/signup" Component={Signup}/>
            <Route path="/login" Component={Login}/>
            <Route path="/forgot-password" Component={ForgotPassword}/>
          </Routes>         
            
          
        </Router>      
      </div>
    </Container>
    
  
     
    
  );
}

export default App;
