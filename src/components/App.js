import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import '../index.js'

import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Loginempleado from "./Loginempleado";
import Admin from "./admin";
import Empleado from "./empleado";
import Register from "./Register";
import Filter from "./Filter"

function App() {
  return (
    
<Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
     <div className="w-100" style={{maxWidth: '400px'}}>
      {/* tabla de rutas */}
      <Router>
      <AuthProvider> 
           <Routes>
            <Route exact path="/" element={
            <PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/signup" element={<Signup/>}/> 
            <Route path="/login" element={<Login/>} />
            <Route path="/login2" element={<Loginempleado/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/empleado" element={<Empleado/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/filter" element={<Filter/>}/>
           </Routes>
      </AuthProvider>
      </Router>
     </div>
  </Container>
    
  )
}

export default App;
