import React, { useEffect, useState,setState } from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import { useToken } from '../auth/useToken';



function Login () {
   // const [token, setToken] = useToken();
  
  
    
    const [error, setError] = useState(null);

    //console.log("login token", token)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    

    const handleLogin = (e) => {
       

        e.preventDefault()
        console.log('login ');
        const credentials = {
            username: email,
            password,
        }
        return fetch("/users/login" ,{
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json" 
            }
          },)
          .then(response => {
                  if (response.ok) {
                   //  setToken(response.token);

                  /*     navigate('/')  */
                     
                      
                      return response;
                  } else {
                      const error = new Error(`Error ${response.status}: ${response.statusText}`);
                      error.response = response;
                      alert(response.statusText)
                      throw error;
                  }
              },
              error => { throw error; }
          )
         .then(res => res.json())

       .then(res => {
        localStorage.setItem("token", res.token);
       navigate('/')
    })
   

         .catch(error => {
             console.log('Error: ', error.message)
             setError(error.message)
            })

    }



    return (
        <>
            <Form onSubmit = {handleLogin}> 
                <h3>Login</h3>
                <FormGroup>
                    <Label for="email">
                        E-mail
                    </Label>
                    <Col sm={4}>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Enter your e-mail"
                        type = "email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                        Password
                    </Label>
                    <Col sm={4}>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type = "password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    />
                     </Col>
                </FormGroup>
                <Button type = "submit" >Login</Button>
                <Button type = "button" onClick={() => navigate('/signup')} >Registration</Button>
            </Form>
        </>
    )

}


export default Login