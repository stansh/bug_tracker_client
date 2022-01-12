import React, {useEffect} from 'react';
import './App.css';
import Projects from './components/Projects';
import Users from './components/Users'
import Tickets from './components/Tickets';
import Header from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import Main  from './components/Main';
import TicketView from './components/TicketView';
import { PrivateRoute } from './auth/PrivateRoute';

import {Routes, Route} from 'react-router-dom';
import { getUsersData, getTicketsData, getProjectsData,getSpecTicketData} from "./redux/actionCreators";
import { connect } from 'react-redux';

const mapDispatchToProps =  {
  getUsersData: () => getUsersData(),
  getProjectsData: () => getProjectsData(),
  getTicketsData: () => getTicketsData(),
  /* getSpecTicketData: () => getSpecTicketData() */
}

/* const mapStateToProps = state => { 
  return {
      projects: state.projectsReducer.projects,
      users: state.usersReducer.users,
      tickets:state.ticketsReducer.tickets
     
  };
}; */

function App(props) {


  useEffect(() => {
    props.getUsersData();
    props.getProjectsData();
    props.getTicketsData();
  },[]);  

  return (

     <div className='container'> 
      <div className = 'row'>
      </div> 
        <Routes >
          <Route  path = '/login' element ={<Login />}/>
          <Route  path = '/signup' element ={<Signup />}/>
          <Route
            path = '/'
            element={
            <PrivateRoute>
               <Header />
              <Main />
            </PrivateRoute>
            }
          />
          <Route
            path = '/tickets'
            element={
            <PrivateRoute>
               <Header />
              <Tickets/>
            </PrivateRoute>
            }
          />
          <Route
            path = '/tickets/:id'
            element={
            <PrivateRoute>
               <Header />
              <TicketView/>
            </PrivateRoute>
            }
          />
        </Routes>  
     </div> 
  );
}

export default connect(null, mapDispatchToProps)(App);


