import React, { useState } from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import {useNavigate} from 'react-router-dom';




function Signup () {
  
    //const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
  

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault()
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
        .then(res => {
             navigate('/login')
             alert(res.status);
         })
         .catch(error => {console.log('Error: ', error.message)})
    }


    return (
        <>
            <Form onSubmit = {handleSignup} id = 'loginForm' > 
                <h5>Sign Up</h5>
                <FormGroup>
                    <Label for="email">
                        E-mail
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your e-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                        Password
                    </Label>
                    <Col sm={8}>
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
                    <Col sm={8}>
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
                    <Col sm={8}>
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
                <Button type = "submit" color ='primary' >Sign Up</Button>
                <Button type = "button" className = 'mx-2' onClick={() => navigate('/login')} >Log in</Button>
            </Form>
        </>
    )
}


export default Signup