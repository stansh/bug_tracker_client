import React, { useEffect, useState } from "react";
import { Table,Modal,ModalBody,ModalHeader,ModalFooter,Button } from 'reactstrap';
import CreateTicket from './CreateTicket'

function Tickets () {
    const [tickets, setTickets] = useState([])
   

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
            .then(res => setTickets(res))
            .catch(error => console.log(error)) 
            };

 
         
  
    useEffect(() => {
        getTicketsData()
    },[]);  




   console.log(tickets)
   return (

        <>  
            <div>
                <h5>Tickets</h5>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create New Ticket</button>
            </div> 
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Ticket Information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <CreateTicket />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick>Sunmit</button>
                    </div>
                    </div>
                </div>
</div>
 

            <Table striped>
                <thead>
                    <tr>
                    <th>
                        Description
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
                    {tickets.map((tic,index) => (
                        <tr>
                            <th scope="row">
                            {tic.description}
                            </th>
                            <td>
                            {tic.project}
                            </td>
                            <td>
                            {tic.asssignee}
                            </td>
                            <td>
                            {tic.createdBy}
                            </td>
                            <td>
                            <button>Modify</button>
                            </td>
                        </tr> 
                    ))}

                </tbody>
            </Table>

       </>        
   )
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
export default Tickets;