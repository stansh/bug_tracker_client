import React, { useEffect, useState,forwardRef } from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import { useToken } from "../auth/useToken";



function Signup () {
  //  const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
  

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault()
        console.log('Sign up ');
        const newUser = {
            username: email,
            password,
            firstname,
            lastname
        }

        return fetch("/users/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json" 
            }
          })
          .then(response => {
                  if (response.ok) {
                      navigate('/login')
                      return response;
                  } else {
                      const error = new Error(`Error ${response.status}: ${response.statusText}`);
                      error.response = response;
                      throw error;
                  }
              },
              error => { throw error; }
          )
          .then(res => res.json())
         .then(res =>alert(res.status))
         .then(res => console.log("respone:", res))
         .catch(error => {console.log('Error: ', error.message)})

        
    }


    return (
        <>
            <Form onSubmit = {handleSignup}> 
                <h3>Sign Up</h3>
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
                <FormGroup>
                    <Label for="firstaname">
                        First Name
                    </Label>
                    <Col sm={4}>
                    <Input
                        id="firstaname"
                        name="firstaname"
                        placeholder="Enter your first name"
                        type = "text"
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}

                    />
                     </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">
                        Last Name
                    </Label>
                    <Col sm={4}>
                    <Input
                        id="lastname"
                        name="lastname"
                        placeholder="Enter yout last name"
                        type = "text"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}

                    />
                     </Col>
                </FormGroup>
                <Button type = "submit" onClick={handleSignup} >Sign Up</Button>
                
               
            </Form>
        </>
    )

}


export default Signup