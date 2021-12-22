
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


function ModifyTicket ({ticket,users,tickets}) { 
  const index = tickets.indexOf(ticket).toString()


const handleComment = (e) => {
 let commentText = document.getElementById(`ticketComment${index}`).value
 
  const newComment = {
    text: commentText 
   
  }


  //const newComment = document.getElementById(`ticketComment${index}`).value
  console.log(newComment)
  return fetch(`/tickets/${ticket._id}`, {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
        "Content-Type": "application/json" 
    }
  })
  .then(response => {
          if (response.ok) {
            document.getElementById(`ticketComment${index}`).value = ""
              return response;
          } else {
              const error = new Error(`Error ${response.status}: ${response.statusText}`);
              error.response = response;
              throw error;
          }
      },
      error => { throw error; }
  )
  .then(res => res.json())
  .catch(error => {console.log('Error: ', error.message)})

  

} 




 
  


const updateTicket = (e) => {
    e.preventDefault()
    /* const index = tickets.indexOf(ticket).toString()
    console.log(index) */
    document.getElementById('modifyTicketCloseBtn' + index).click()
  }  


const removeTicket = () => {
  console.log ("remove")
}





return (
    <>
    <Form  onSubmit = {updateTicket}>
      <FormGroup>
        <Label for="ticketDescription">
          Issue Description: <br /> <strong>{ticket.description}</strong>
        </Label>
      </FormGroup>
      <FormGroup>
        <Label for={`ticketComment${index}`}>
          Commnets:
        </Label>
        <Input
          id={`ticketComment${index}`}
          name="ticketComment"
          type = "textarea"
          
        />
        <Button onClick ={handleComment}>Add Commnet</Button>
      </FormGroup>
      <FormGroup row>
          <Label
            for="selectAssignee"
            sm={2}
          >
            Assignee
          </Label>
          <Col sm={10}>
          <Input
              id="selectAssignee"
              name="selectAssignee"
              type="select"
            >
              {users.map(user =>(<option value = {user._id}>{user.firstname} {user.lastname}</option>))}
            </Input>
          
          </Col>
        </FormGroup>
        
        <Button  color = 'primary' type = 'submit' >Update Ticket</Button>
        <Button  color = 'success' onClick ={removeTicket}> Ticket Resolved</Button>
    </Form>
    </>

)
}


export default connect(mapStateToProps,null)(ModifyTicket);