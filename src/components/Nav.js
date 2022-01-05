import React from 'react';
import { Nav, NavItem, NavLink, NavbarBrand  } from 'reactstrap';
import { Link } from 'react-router-dom';

function Header() {
  
    return (
      <div>
        {/* <p>List Based</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Link based</p> */}
        <Nav  id = 'nav' >
        <NavbarBrand  className='pl-3' href="/"><img src="bug.png" alt="bug-logo" width = '25px' /><h6>BUG TRACKER</h6></NavbarBrand> 
          <NavLink><Link to="/">Main</Link></NavLink> <NavLink><Link to="/tickets">Tickets</Link> </NavLink>
        </Nav>
      </div>
    );
  }


export default Header;