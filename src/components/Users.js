import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { getUsersData} from "../redux/actionCreators";
import { connect } from 'react-redux';



const mapDispatchToProps =  {
    getUsersData: () => getUsersData()
}


const mapStateToProps = state => { 
    return {
        users: state.usersReducer.users
    };
};

function Users (props) {
   
   

   /*  //const getUsersData = () => dispatch => { 
        const getUsersData = () => { 
            
            //dispatch(productsLoading());
            fetch( "/users")
                .then(response => {
                if (response.ok) { 
                   // console.log(response)
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
            .then(res => props.loadUsers(res))
            .catch(error => console.log(error)) 
            };
 */
 
         
  
/*     useEffect(() => {
        props.getUsersData()
    },[]);  
 */



  
   return (
        <>   
            <h5>Users</h5>
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