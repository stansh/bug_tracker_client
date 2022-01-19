import React, { useEffect, useState,useRef  } from "react";
import { Table,Badge,ModalBody,ModalHeader,ModalFooter,Button } from 'reactstrap';
import { getTicketsData, saveSearchResults} from "../redux/actionCreators";
import  {  Link} from 'react-router-dom';
import CreateTicket from './CreateTicket';
import ModifyTicket from './ModifyTicket';
//import SearchTickets from './SearchTickets'
import { connect } from 'react-redux';




const mapStateToProps = state => { 
    return {
        projects: state.projectsReducer.projects,
        users: state.usersReducer.users,
        tickets:state.ticketsReducer.tickets,
        searchResults: state.ticketsReducer.searchResults
    };
  };


const mapDispatchToProps =  {
    getTicketsData: () => getTicketsData(),
    saveSearchResults: (data) => saveSearchResults(data)
}



function Tickets (props) {
 
    const inputText = useRef();
    const [searchRes,setSearchRes] = useState(null)
    console.log(inputText)
    
    
    const commentsDisplay = e => {
        const index = e.target.value.toString()
        let dispValue = document.getElementById(`comments${index}`).style.display
        if (dispValue === 'none') {
            document.getElementById(`comments${index}`).style.display = 'block'
            e.target.innerHTML= 'Hide Comments'
        } else {
            document.getElementById(`comments${index}`).style.display = 'none'
            e.target.innerHTML= 'Show Comments'
        }
    }
    
    const handleValue = () => {
        console.log(inputText.current.value)
        if (inputText.current.value === '') {
            setSearchRes(null) 
        } 
    }

    const searchTickets = () => {
          console.log("search", inputText.current.value)
          let results;
        if(inputText.current.value === '') {
            results = null;
           // props.saveSearchResults(results)
             setSearchRes(results)
            inputText.current.value = ''
        } else {
            const input = inputText.current.value.split(' ')
            const results = props.tickets.filter(ticket => {
                for ( let i = 0; i < input.length; i++ ) {
                    if(ticket.description.includes(input[i])) {
                        return ticket;
                    }
                }
             })
            console.log("RESULTS",results)
           // props.saveSearchResults(results)
           setSearchRes(results)
            
        }        
  }
  
  useEffect(() => {
      
        inputText.current.addEventListener('keyup', (e) => {
            if(e.keyCode === 13) {
               // e.preventDefault();
                searchTickets()
            }
        })
    
    
   
  },[]);  
 
  
   //if (props.searchResults === null) {
       if(searchRes === null){
    return (

        <>  
            <div className="mt-3">
                <h5>Tickets</h5>
                <span> 
                    <input ref = {inputText} type='search' onChange={handleValue} />
                    <Button className="mx-1" onClick ={searchTickets}>Seacrh Tickets</Button>
                    <Button type="button" color="primary" data-bs-toggle="modal" data-bs-target="#newTicketModal">Create New Ticket</Button>
                </span>
                
            </div> 
            <div className="modal fade" id="newTicketModal"  aria-labelledby="newTicketModalLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4>New Ticket</h4>
                        <button id = 'modalCloseBtn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <CreateTicket />
                    </div>
                    </div>
                </div>
            </div>
            <Table striped  responsive>
                <thead>
                    <tr>
                    <th>
                        Issue Description
                    </th>
                    <th>
                        Priority
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
                        Date created
                    </th>
                    <th>
                        
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((tic,index) => (
                      
                            <tr key = {index} >  
                                <th >
                                    <Link to = {`/tickets/${tic._id}`}>  
                                        <h4>{tic.description}</h4>
                                    </Link>
                                    <Button outline size ='sm' color ='secondary' value = {index} onClick = {commentsDisplay}>Show Commnets</Button>
                                    <div className = 'list-unstyled small comments' id = {`comments${index}`} style = {{display: "none"}}>
                                        <p>Comments: </p>  
                                        {tic.comments.map((com, index )=> (
                                            <li key = {index}>{com.commentText} </li>
                                        ))}
                                    </div>
                                </th>
                                <td>
                                    {tic.priority==="low" && <Badge color='secondary'>Low</Badge> }
                                    {tic.priority==="medium" && <Badge color='warning'>Medium</Badge> }
                                    {tic.priority==="high" && <Badge color='danger'>High</Badge> }
                                    
                                </td>
                                <td>
                                    {tic.project.title}
                                </td>
                                <td>
                                    {tic.assignee.firstname} {tic.assignee.lastname}
                                </td>
                                <td>
                                    {tic.createdBy.firstname} {tic.createdBy.lastname}
                                </td>
                                <td>
                                    {tic.createdAt.substr(0,10)}
                                </td>
                                <td>
                                    <div>
                                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#modifyTicketModal${index}`} >Modify</button>
                                    </div> 
                                    <div className="modal fade" id={`modifyTicketModal${index}`}  aria-labelledby={`modifyTicketModalLabel${index}`} aria-hidden="false">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <button id = {`modifyTicketCloseBtn${index}`} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body" >
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

   } else {
    return (

        <>  
            <div>
                <h5>Tickets </h5>
                <span> 
                    <input ref = {inputText} type='search' onChange={handleValue}/>
                    <Button className="mx-1" onClick ={() => searchTickets(inputText.current.value)}>Seacrh Tickets</Button>
                    <Button type="button" color="primary" data-bs-toggle="modal" data-bs-target="#newTicketModal">Create New Ticket</Button>
                </span>
            </div> 
            <div className="modal fade" id="newTicketModal"  aria-labelledby="newTicketModalLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4>New Ticket</h4>
                        <button id = 'modalCloseBtn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <CreateTicket />
                    </div>
                    </div>
                </div>
            </div>
            <Table striped responsive>
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
                        Date created
                    </th>
                    <th>
                        
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {searchRes.map((tic,index) => (
                        <tr key = {index}>
                            <th >
                            <Link to = {`/tickets/${tic._id}`}>  
                                        <h4>{tic.description}</h4>
                                    </Link>
                                <Button outline size ='sm' color ='secondary' value = {index} onClick = {commentsDisplay}>Show Commnets</Button>
                                <div className = 'list-unstyled small comments' id = {`comments${index}`} style = {{display: "none"}}>
                                    <p>Comments: </p>  
                                    {tic.comments.map((com, index )=> (
                                        <li key = {index}>{com.commentText} </li>
                                    ))}
                                </div>
                            </th>
                            <td>
                                    {tic.priority==="low" && <Badge color='secondary'>Low</Badge> }
                                    {tic.priority==="medium" && <Badge color='warning'>Medium</Badge> }
                                    {tic.priority==="high" && <Badge color='danger'>High</Badge> }
                                    
                                </td>
                            <td>
                                {tic.project.title}
                            </td>
                            <td>
                                {tic.assignee.firstname} {tic.assignee.lastname}
                            </td>
                            <td>
                            {tic.createdBy.firstname} {tic.createdBy.lastname}
                            </td>
                            <td>
                                {tic.createdAt.substr(0,10)}
                            </td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#modifyTicketModal${index}`} >Modify</button>
                                </div> 
                                <div className="modal fade" id={`modifyTicketModal${index}`}  aria-labelledby={`modifyTicketModalLabel${index}`} aria-hidden="false">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <button id = {`modifyTicketCloseBtn${index}`} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body" >
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
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
