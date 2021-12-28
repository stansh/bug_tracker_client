import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { loadProjects} from "../redux/actionCreators";
import { connect } from 'react-redux';




const mapDispatchToProps =  {
    loadProjects: (data) => loadProjects(data)
}


const mapStateToProps = state => { 
    return {
        projects: state.projectsReducer.projects
    };
};

function Projects (props) {

   

   // const getProjectsData = () => dispatch => { 
      const getProjectsData = () => { 
            
            //dispatch(productsLoading());
            fetch( "/projects")
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
            .then(res => props.loadProjects(res))
            .catch(error => console.log(error)) 
            };

 
         
  
    useEffect(() => {
        getProjectsData()

    },[]);  




  
   return (
        <>   
            <h5>Projects</h5>
            <Table striped>
                <thead>
                    <tr>
                    <th>
                        # 
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Date created
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {props.projects.map((proj,index) => (
                        <tr key = {index}>
                            <th scope="row">
                            {index + 1}
                            </th>
                            <td>
                            {proj.title}
                            </td>
                            <td>
                            {proj.description}
                            </td>
                            <td>
                            {proj.timestamp.substr(0,10)}
                            </td>
                        </tr> 
                    ))}

                </tbody>
            </Table>
       </>        
   )
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
