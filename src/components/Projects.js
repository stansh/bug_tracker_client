import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';

function Projects () {
    const [projects, setProjects] = useState([])
   

    //const getProjectsData = () => dispatch => { 
        const getProjectsData = () => { 
            console.log("run")
            //dispatch(productsLoading());
            fetch( "/projects")
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
            .then(res => setProjects(res))
            .catch(error => console.log(error)) 
            };

 
         
  
    useEffect(() => {
        getProjectsData()
    },[]);  




   console.log(projects)
   return (
        <>
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
                    {projects.map((proj,index) => (
                        <tr>
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
export default Projects;