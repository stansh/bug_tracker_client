
import React, { useEffect, useState,forwardRef } from "react";
import { Form,FormGroup,Input,Label,Col,Button, Badge } from 'reactstrap';
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



const updateTicket = (e) => {
  
  //e.preventDefault()
  document.getElementById('modifyTicketCloseBtn' + index).click()
  const commentText = document.getElementById(`ticketComment${index}`).value
  const assignee= document.getElementById(`selectAssignee${index}`).value
 
  const updateData = {
    commentText: commentText,
    assignee: assignee
   
  }

  console.log(updateData)
  return fetch(`/tickets/${ticket._id}`, {
    method: "POST",
    body: JSON.stringify(updateData),
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


const removeTicket = () => {
  document.getElementById('modifyTicketCloseBtn' + index).click()
  return fetch(`/tickets/${ticket._id}`, {
    method: "DELETE",
    body: JSON.stringify(),
    headers: {
        "Content-Type": "application/json" 
    }
  })
  .then(response => {
          if (response.ok) {
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





return (
    <>
    <Form  onSubmit = {updateTicket}>
      <FormGroup>""
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
        {/* <Button onClick ={handleComment}>Add Commnet</Button> */}
      </FormGroup>
      <FormGroup row>
          <Label
            for={`selectAssignee${index}`}
            sm={6}
          >
            Assignee:  {tickets[index].assignee.firstname} {tickets[index].assignee.lastname}
          </Label>
          <Col sm={10}>
          <Input
              id={`selectAssignee${index}`}
              name="selectAssignee"
              type="select"
            >
              <br /> 
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