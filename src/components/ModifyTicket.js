
import React, { useEffect, useState,forwardRef } from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
  return {
      projects: state.projectsReducer.projects,
      users: state.usersReducer.users,
      tickets:state.ticketsReducer.tickets
  };
};


function ModifyTicket (ticket) { 
console.log(ticket.ticket)



return (
    <>
    <h3>{ticket.description}</h3>
    {/* <span>{ticket._Id}</span>
    <span>{ticket.assignee}</span> */}
    </>

)
}


export default connect(mapStateToProps,null)(ModifyTicket);