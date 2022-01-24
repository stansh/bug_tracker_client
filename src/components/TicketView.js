import React, { useState } from "react";
import { Form,FormGroup,Input,Label,Col,Button, ListGroup,ListGroupItem } from 'reactstrap';
import { removeTicketRedux, updateTicketRedux,getTicketsData, getUsersData} from "../redux/actionCreators";
import  { useParams, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
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
    updateTicketRedux: (data) => updateTicketRedux(data),
    getTicketsData: () => getTicketsData(),
    getUsersData: () => getUsersData()

  
   
}

  

function TicketView (props) {

  const user = useUser()

  const [deleted, setDeleted] = useState(null)
  console.log(deleted)
  const {id} = useParams();
  const navigate = useNavigate()
  const ticket = props.tickets.find(tic => tic._id === id)
  let currentAssignee;
  let currentPriority;
  let otherUsers;


  


  if (ticket !== undefined) {
    currentAssignee = ticket.assignee
    otherUsers = props.users.filter(user=> user._id !== currentAssignee._id)
    currentPriority = ticket.priority
  }




  const changePriority = (e) => {
    currentPriority = e.target.options[e.target.selectedIndex].value
    document.getElementById(`currentPriority`).innerHTML = currentPriority
  }

  const changeAssignee = (e) => {
    const selectedAssigneeId = e.target.options[e.target.selectedIndex].value
    currentAssignee = props.users.find(user=> user._id === selectedAssigneeId )
    document.getElementById(`currentAssignee`).innerHTML = currentAssignee.firstname + ' '+  currentAssignee.lastname
  }
  
  
  
  
  const updateTicket = (e) => {
    e.preventDefault()
    const commentText = document.getElementById(`ticketComment`).value
    const updateData = {
      commentText: commentText,
      assignee: currentAssignee,
      priority: currentPriority,
      commentator: user._id
     
    }
    document.getElementById(`ticketComment`).value = ''
    return fetch(`/tickets/${ticket._id}`, {
  
    method: "POST",
    body: JSON.stringify(updateData),
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
    .then(res => props.updateTicketRedux(res))
    .catch(error => {console.log('Error: ', error.message)})
      
  }  
  
  
  const removeTicket = (e) => {
    e.preventDefault()
    return fetch(`/tickets/${ticket._id}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
          "Content-Type": "application/json" 
      }
    })
    .then(response => {
            if (response.ok) { 
                setDeleted(true)
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
    .catch(error => {console.log('Error: ', error.message)})
  }

  if(deleted) {
    return  <h5>The ticket has been removed.</h5>
  }

  if(ticket === undefined) {
    return  <h5>Ticket not found</h5>
  }
  
  return (
    <div className=" row">
      <div className="col-md-4" style = {{borderRight:'1px solid #cccccc'}}>
          <h6 className = 'mt-3 mb-2'>Ticket Info: <br /> </h6>
          <h3>{ticket.description}</h3>
          <h6><span style = {{color: 'grey'}}>Priority: </span>{ticket.priority}</h6>
          <h6><span style = {{color: 'grey'}}>Project: </span>{ticket.project.title}</h6>
          <h6><span style = {{color: 'grey'}}>Last modified: </span>{ticket.updatedAt.substr(0,10)}</h6>
          <h6><span style = {{color: 'grey'}}>Date created: </span>{ticket.createdAt.substr(0,10)}</h6>
          <h6><span style = {{color: 'grey'}}>Assignee: </span>{ticket.assignee.firstname} {ticket.assignee.lastname}</h6>
          <h6><span style = {{color: 'grey'}}>Created by: </span>{ticket.createdBy.firstname} {ticket.createdBy.lastname}</h6>
      </div>
      <div className="col-md-4" style = {{borderRight:'1px solid #cccccc'}}>
          <ListGroup className="comments">
              <h6 className = 'mt-3 comments'>Comments:</h6>
              {ticket.comments.map((comm,index )=>(
                  <ListGroupItem key = {index}>
                      {comm.commentText} 
                      <br />
                      <small style ={{fontSize: '.7rem'}}>{props.users.map(user => {
                        if (user._id === comm.commentator) {
                          return user.firstname + ' ' + user.lastname + ' '
                        }
                      })}
                      <br />
                        Date Posted: {comm.createdAt.substr(0,10)}
                      </small>                                                 
                  </ListGroupItem>
                              
              ))}
          </ListGroup>
      </div>
        <div className="col-md-4">
          <h6 className = 'mt-3'>Modify</h6>
          <Form  onSubmit = {updateTicket}>
            <FormGroup>
              <Label for={`ticketComment`}>
                Commnets:
              </Label>
              <Input
                id={`ticketComment`}
                name="ticketComment"
                type = "textarea"
              />
            </FormGroup>
            <FormGroup row>
                <Label
                  for="selectPriority"
                  sm={4}
                >
                  Priority: <strong id={`currentPriority`}>{currentPriority}</strong>
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
                    for={`selectAssignee`}
                    sm={8}
                  >
                    Current Assignee:  <strong id={`currentAssignee`}>{currentAssignee.firstname} {currentAssignee.lastname}</strong>
                  </Label>
                  <Col sm={10}>
                  <Input
                      id={`selectAssignee`}
                      name="selectAssignee"
                      type="select"
                      onClick= {changeAssignee}
                    >
                      {otherUsers.map((user,index) =>(<option key = {index} value = {user._id} >{user.firstname} {user.lastname}</option>))}
                      
                    </Input>
                  
                  </Col>
                </FormGroup>
                <Button  color = 'primary' type = 'submit'>Update Ticket</Button>
                <Button  color = 'success' onClick ={removeTicket}> Ticket Resolved</Button>
          </Form>
        </div>
      </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketView);
