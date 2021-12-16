import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';

function Projects () {
    const [projects, setProjects] = useState([])

     //const getProjectsData = () => dispatch => { 
        const getProjectsData = () => { 
        //dispatch(productsLoading());
         return fetch( "http://localhost:3000/projects")
         .then(response => {
         if (response.ok) { 
             return response;
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
         //.then(res => console.log(res))
         .catch(error => console.log(error))
         };
  
    useEffect(() => {
    getProjectsData()
     
 
   },[]); 

   return (
       <p>{projects}</p>

   )

}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
export default Projects;