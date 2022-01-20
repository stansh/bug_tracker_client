import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { getProjectsData} from "../redux/actionCreators";
import { connect } from 'react-redux';
import Loading from "./Loading";




const mapDispatchToProps =  {
    getProjectsData: () => getProjectsData()
}


const mapStateToProps = state => { 
    return {
        projects: state.projectsReducer.projects,
        isLoading: state.projectsReducer.isLoading
    };
};

function Projects (props) {

console.log(props.projects)

  
   return (
        <>   
            
            <h5>Projects </h5>
            {props.isLoading && <Loading /> }
            <Table striped responsive>
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


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
