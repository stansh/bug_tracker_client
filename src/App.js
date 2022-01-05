import React from 'react';
import './App.css';
import Projects from './components/Projects';
import Users from './components/Users'
import Tickets from './components/Tickets';
import Header from './components/Nav';
import Main  from './components/Main'
import {Routes, Route,BrowserRouter} from 'react-router-dom';


function App() {
  return (
    
    <div className='container'> 
      <div  className = 'row'>
      <Header />
      </div>
       
       <Routes>
          <Route index path = '/' element ={<Main />} />
          <Route path = '/tickets' element = {<Tickets />} />
        </Routes>
       
  
        
    </div>
  );
}

export default App;


{/*  <form id="signInForm">
      <h5>Sign In Form</h5>
        <label >Username:</label>
        <input type="text" />
        <label >Password:</label>
        <input type="text" />
      </form>

      <form id="signUpForm">
        <h5>Sign Up Form</h5>
        <label >First Name:</label>
        <input type="text" />
        <label >Username:</label>
        <input type="text" />
        <label >Password:</label>
        <input type="text" />
      </form> */}