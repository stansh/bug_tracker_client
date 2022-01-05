
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
    const assigneeId = event.target.selectAssignee.options[event.target.selectAssignee.selectedIndex].value
    const projectId  = event.target.selectProject.options[event.target.selectProject.selectedIndex].value
    const assignee = props.users.find(user => user._id === assigneeId)
    const project = props.projects.find(proj => proj._id === projectId)
 
    const formData = {
      description: event.target.description.value,
      assignee: assigneeId,
      project: projectId,
      priority: event.target.selectPriority.options[event.target.selectPriority.selectedIndex].value
    }

    event.target.description.value = ''
   

    return fetch('/tickets', {
      method: "POST",
      body: JSON.stringify(formData),
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
    .then(res => props.addTicketRedux({res,assignee,project}))
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
            for="selectPriority"
            sm={2}
          >
            Priority:
          </Label>
          <Col sm={10}>
            <Input
              id="selectPriority"
              name="sselectPriority"
              type="select"
            >  
              
              <option value = 'low'>Low</option>
              <option value = 'medium'>Medium</option>
              <option value = 'high'>Hight</option>

              
              
            </Input>
          
          </Col>
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