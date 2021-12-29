import React from 'react';
import './App.css';
import Projects from './components/Projects';
import Users from './components/Users'
import Tickets from './components/Tickets';

function App() {
  return (
    <div className='container'> 
      <div className = 'row'>
        <div className = 'col-lg-6 mt-5'>
        <Projects  />
        </div>
        <div className = 'col-lg-6 mt-5'>
        <Users/>
        </div>
        </div>
        <div className = 'row'>
        <div className = 'col-3-md mt-5'>
        <Tickets/>
        </div>
      </div>

      

      
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
        
    </div>
  );
}

export default App;
