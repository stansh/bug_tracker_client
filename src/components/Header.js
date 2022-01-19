import React, { useEffect,useState,useRef } from 'react';
import { Nav, NavItem,  NavLink, NavbarBrand,Button  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../auth/useUser';
import { connect } from 'react-redux';


const mapStateToProps = state => { 
  return {
      //projects: state.projectsReducer.projects,
      users: state.usersReducer.users,
      //tickets:state.ticketsReducer.tickets
     
  };
};


function Header(props) {

  const user = useUser()
  const navigate = useNavigate();
  

  const handleLogout =() => {
   
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    
      <Nav>
        <NavbarBrand  className='pl-3' href="/"><img  src="/bugLogo.png" alt="bug-logo" width = '100px' /></NavbarBrand> 
        <Link className='mt-3' to="/">Main</Link>
        <Link className='mt-3' to="/tickets">Tickets</Link>
        <div id='logoutBtn'  >
            <h6>
              {props.users.map(item => {
                  if (item._id === user._id) {
                    return 'Hi, ' + item.firstname
                  }
                })}
            </h6>
            <Button  className='btn-sm btn-light mb-2' onClick = {handleLogout}>Logout</Button>
        </div>
        
      </Nav>
    
  );
}


export default connect(mapStateToProps,null) (Header);