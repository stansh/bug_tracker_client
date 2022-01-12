import React from 'react';
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
  const userToDisplay = props.users.find(u => u._id === user._id) 
 // console.log(userToDisplay )
  const navigate = useNavigate();

  const handleLogout =() => {
    localStorage.removeItem('token');
    navigate('/login');
  }
 
  
    return (
      <div>
        <Nav  >
          <NavbarBrand  className='pl-3' href="/"><img  src="bugLogo.png" alt="bug-logo" width = '100px' /></NavbarBrand> 
          <Link className='mt-3' to="/">Main</Link>
          <Link className='mt-3' to="/tickets">Tickets</Link>
          <span id='logoutBtn' >
             <h6>Hi, {userToDisplay.firstname}</h6>
             <Button  className='mt-3 btn-sm' onClick = {handleLogout}>Logout</Button>
          </span>
          
        </Nav>
      </div>
    );
  }


export default connect(mapStateToProps,null) (Header);