import React, { useEffect, useState,useRef  } from "react";
import { Table,Modal,ModalBody,ModalHeader,ModalFooter,Button } from 'reactstrap';
import { loadTickets} from "../redux/actionCreators";
import CreateTicket from './CreateTicket';
import ModifyTicket from './ModifyTicket';
import { connect } from 'react-redux';


const mapStateToProps = state => { 
    return {
        projects: state.projectsReducer.projects,
        users: state.usersReducer.users,
        tickets:state.ticketsReducer.tickets
    };
  };
  


const mapDispatchToProps =  {
    loadTickets: (data) => loadTickets(data)
}

function Tickets (props) {

    //const getTicketsData = () => dispatch => { 
        const getTicketsData = () => { 
            
            //dispatch(productsLoading());
            fetch( "/tickets")
                .then(response => {
                if (response.ok) { 
                    console.log(response)
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);  
                    error.response = response;
                    throw error;
                }
                },
                    error => { 
                        const errMess = new Error(error.message);
                        throw errMess;
                        }
                )
            .then(res => res.json())
            .then(res => props.loadTickets(res))
            .catch(error => console.log(error)) 
            };

 
         
  
    useEffect(() => {
        getTicketsData()
    },[]);  




   console.log("TICKETS: ",props.tickets)
   return (

        <>  
            <div>
                <h5>Tickets</h5>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newTicketModal">Create New Ticket</button>
            </div> 
            <div className="modal fade" id="newTicketModal"  aria-labelledby="newTicketModalLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">

                        <button id = 'modalCloseBtn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ModifyTicket />
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick = {handleSubmit}>Submit</button>
                    </div> */}
                    </div>
                </div>
            </div>
 

            <Table striped>
                <thead>
                    <tr>
                    <th>
                        Issue Description
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                         Assignee
                    </th>
                    <th>
                        Created by
                    </th>
                    <th>
                        
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((tic,index) => (
                        <tr key = {index}>
                            <th scope="row">
                            {tic.description}
                            </th>
                            <td>
                            {tic.project.title}
                            </td>
                            <td>
                            {tic.assignee.firstname} {tic.assignee.lastname}
                            </td>
                            <td>
                            {tic.createdBy}
                            </td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modifyTicketModal">Modify</button>
                                </div> 
                                <div className="modal fade" id="modifyTicketModal"  aria-labelledby="modifyTicketModalLabel" aria-hidden="false">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <button id = 'modifyTicketCloseBtn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <ModifyTicket ticket = {tic} />
                                        </div>
                                    
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr> 
                    ))}

                </tbody>
            </Table>

       </>        
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
