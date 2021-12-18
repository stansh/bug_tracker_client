
import React, { useEffect, useState } from "react";
import { Form,FormGroup,Input,Label,Col } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
  return {
      projects: state.projectsReducer.projects,
      users: state.usersReducer.users
  };
};
function CreateTicket (props) {

 const handleSubmit = () => {
    console.log("handle submit")
  }


  return (


    <>

    
     <Form>
    <FormGroup>
      <Label for="exampleEmail">
        Description
      </Label>
      <Input
        id="ticketDescription"
        name="description"
        placeholder="with a placeholder"
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
          name="select"
          type="select"
        >
          {props.projects.map(proj =>(<option>{proj.title}</option>))}
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
          name="select"
          type="select"
        >
          {props.users.map(user =>(<option>{user.firstname} {user.lastname}</option>))}
        </Input>
       
      </Col>
    </FormGroup>
    
    
    
    </Form>
    </>
   

  )
}

export default connect(mapStateToProps,null)(CreateTicket);