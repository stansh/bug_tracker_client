
import React, { useEffect, useState,forwardRef, createElement } from "react";
import { Form,FormGroup,Input,Label,Col,Button, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { removeTicketRedux,updateTicketRedux} from "../redux/actionCreators";
import { useUser } from "../auth/useUser";

const mapStateToProps = state => { 
  return {
      projects: state.projectsReducer.projects,
      users: state.usersReducer.users,
      tickets:state.ticketsReducer.tickets
  };
};

const mapDispatchToProps =  {
  removeTicketRedux: (data) => removeTicketRedux(data),
  updateTicketRedux : (data) => updateTicketRedux(data) 
}




function ModifyTicket (props) { 

  const index = props.tickets.indexOf(props.ticket)
  let currentAssignee = props.tickets[index].assignee
  const otherUsers = props.users.filter(user=> user._id !== currentAssignee._id)
  let currentPriority = props.tickets[index].priority
  const user = useUser()


  const changePriority = (e) => {
    currentPriority = e.target.options[e.target.selectedIndex].value
    document.getElementById(`currentPriority${index}`).innerHTML = currentPriority
  }

  const changeAssignee = (e) => {
    const selectedAssigneeId = e.target.options[e.target.selectedIndex].value
    currentAssignee = props.users.find(user=> user._id === selectedAssigneeId )
    document.getElementById(`currentAssignee${index}`).innerHTML = currentAssignee.firstname + ' '+  currentAssignee.lastname
  }




const updateTicket = (e) => {
  
  e.preventDefault()
  document.getElementById('modifyTicketCloseBtn' + index).click()
  const commentText = document.getElementById(`ticketComment${index}`).value
  const updateData = {
    commentText: commentText,
    assignee: currentAssignee,
    priority: currentPriority,
    commentator: user._id
   
  }
  console.log(updateData )
  document.getElementById(`ticketComment${index}`).value = ''

  return fetch(`/tickets/${props.ticket._id}`, {
    method: "POST",
    body: JSON.stringify(updateData),
    headers: {
        "Content-Type": "application/json" 
    }
  })
  .then(response => {
          if (response.ok) {
            //document.getElementById(`ticketComment${index}`).value = ""
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
  .then(res => props.updateTicketRedux(res))
 //.then(res => console.log("respone:", res))
  .catch(error => {console.log('Error: ', error.message)})
    
    
  }  


const removeTicket = () => {
  document.getElementById('modifyTicketCloseBtn' + index).click()
  return fetch(`/tickets/${props.ticket._id}`, {
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
  .then(res => props.removeTicketRedux(res))
  //.then(res => console.log(res))
  .catch(error => {console.log('Error: ', error.message)})
}





return (
    <>
    <Form  onSubmit = {updateTicket}>
      <FormGroup>""
        <Label for="ticketDescription">
          Issue Description: <br /> <strong>{props.ticket.description}</strong>
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
      </FormGroup>
      <FormGroup row>
          <Label
            for="selectPriority"
            sm={4}
          >
            Priority: <strong id={`currentPriority${index}`}>{currentPriority}</strong>
          </Label>
          <Col sm={10}>
            <Input
              id="selectPriority"
              name="sselectPriority"
              type="select"
              onClick= {changePriority}
            >  
              <option value = 'low'>Low</option>
              <option value = 'medium'>Medium</option>
              <option value = 'high'>Hight</option>

            </Input>
          
          </Col>
        </FormGroup>
      <FormGroup row>
          <Label
            for={`selectAssignee${index}`}
            sm={8}
          >
            Current Assignee:  <strong id={`currentAssignee${index}`}>{currentAssignee.firstname} {currentAssignee.lastname}</strong>
          </Label>
          <Col sm={10}>
          <Input
              id={`selectAssignee${index}`}
              name="selectAssignee"
              type="select"
              onClick= {changeAssignee}
            >
              {otherUsers.map((user,index) =>(<option key = {index} value = {user._id} >{user.firstname} {user.lastname}</option>))}
              
            </Input>
          
          </Col>
        </FormGroup>
        
        <Button  color = 'primary' type = 'submit' >Update Ticket</Button>
        <Button  color = 'success' onClick ={removeTicket}> Ticket Resolved</Button>
    </Form>
    </>

)
}


export default connect(mapStateToProps,mapDispatchToProps)(ModifyTicket);