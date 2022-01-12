import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, ListGroup,ListGroupItem } from 'reactstrap';
import { loadTickets} from "../redux/actionCreators";
import { connect } from 'react-redux';
import  {Link} from 'react-router-dom';


const mapStateToProps = state => { 
    return {
        projects: state.projectsReducer.projects,
        tickets: state.ticketsReducer.tickets
        
    };
  };
  
  const mapDispatchToProps =  {
   loadTickets: (data) => loadTickets(data)
  
    
   
  }



function TicsByProject (props) {

    /* const getTicketsData = () => { 
        //dispatch(productsLoading());
        fetch( "/tickets")
            .then(response => {
            if (response.ok) { 
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
        .then(res => props.loadTickets(res) )
        .catch(error => console.log(error)) 
        };

    useEffect(() => {
        getTicketsData();
        
       
    },[]);   */

    return (
        <div className = 'row'>
             <h5>Tickets by Projects</h5>
            {props.projects.map((proj,index) =>(
                <Card className = 'col-md-3 px-0 mx- ' key = {index}>
                    <CardBody>
                        <CardTitle><h4>{proj.title}</h4></CardTitle>
                        <ListGroup className="mx-0">
                            {props.tickets.map((tic,index) => {
                                if (tic.project._id === proj._id) {
                                    return <ListGroupItem key = {index}  >
                                                <Link to = {`/tickets/${tic._id}`}>
                                                {tic.description}
                                                <br /> 
                                                <i><small> Created: {tic.createdAt.substr(0,10)} Priority: {tic.priority}</small></i>
                                                </Link>
                                            </ListGroupItem>
                                }
                            })}

                        </ListGroup>
                        

                    </CardBody>
                </Card>

            ))}
        
        </div>

    )

}


export default connect(mapStateToProps,mapDispatchToProps)(TicsByProject);