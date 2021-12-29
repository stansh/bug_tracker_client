
import React, { useEffect, useState,forwardRef } from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addTicketRedux} from "../redux/actionCreators";

const mapStateToProps = state => { 
  return {
      projects: state.projectsReducer.projects,
      users: state.usersReducer.users
  };
};

const mapDispatchToProps =  {
  addTicketRedux: (data) => addTicketRedux(data)
 
}



function CreateTicket (props) {

  const onSubmit = (event)=> {
   
    event.preventDefault()
    document.querySelector("#modalCloseBtn").click()
  
    const formData = {
      description: event.target.description.value,
      assignee:event.target.selectAssignee.options[event.target.selectAssignee.selectedIndex].value,
      project:event.target.selectProject.options[event.target.selectProject.selectedIndex].value
    }
   

    return fetch('/tickets', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
          "Content-Type": "application/json" // so the server knows that the body will be formated as JSON
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
    .then(res => props.addTicketRedux(res))
    .catch(error => {console.log('Error: ', error.message)})

  } 
    

  return (

    <>
      <Form  onSubmit = {event => onSubmit(event)}>
        <FormGroup>
          <Label for="ticketDescription">
            Description
          </Label>
          <Input
            id="ticketDescription"
            name="description"
            placeholder="Describe issue"
            type = "textarea"

          />
        </FormGroup>
        <FormGroup row>
          <Label
            for="selectProject"
            sm={2}
          >
            Project:
          </Label>
          <Col sm={10}>
            <Input
              id="selectProject"
              name="selectProject"
              type="select"
            >
              {props.projects.map((proj,index) =>(<option key = {index} value = {proj._id}>{proj.title}</option>))}
            </Input>
          
          </Col>
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
              {props.users.map((user,index) =>(<option key = {index} value = {user._id}>{user.firstname} {user.lastname}</option>))}
            </Input>
          
          </Col>
        </FormGroup>
    
        <Button type = "submit" >Submit</Button>
      </Form>
    </>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTicket);