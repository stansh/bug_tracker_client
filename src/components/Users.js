import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { getUsersData} from "../redux/actionCreators";
import { connect } from 'react-redux';
import Loading from "./Loading";



const mapDispatchToProps =  {
    getUsersData: () => getUsersData()
}


const mapStateToProps = state => { 
    return {
        users: state.usersReducer.users,
        isLoading: state.usersReducer.isLoading
    };
};

function Users (props) {
   



  
   return (
        <>   
            
            <h5>Users</h5>
            {props.isLoading && <Loading />}
            <Table striped>
                <thead>
                    <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        E-mail
                    </th>
                   
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user,index) => (
                        <tr key = {index}>
                            <td>
                            {user.firstname + " " + user.lastname}
                            </td>
                            <td>
                            {user.username}
                            </td>
                        
                        </tr> 
                    ))}

                </tbody>
            </Table>
       </>        
   )
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
export default connect(mapStateToProps, mapDispatchToProps)(Users);