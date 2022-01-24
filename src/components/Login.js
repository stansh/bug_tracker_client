import React, {useState} from "react";
import { Form,FormGroup,Input,Label,Col,Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { getUsersData, getTicketsData, getProjectsData} from "../redux/actionCreators";

const mapDispatchToProps =  {
    getUsersData: () => getUsersData(),
    getProjectsData: () => getProjectsData(),
    getTicketsData: () => getTicketsData(),
    
  }

function Login (props) {
    document.body.style.backgroundImage = 'linear-gradient(90deg, #60d39a 0%, #2385BE 150%)'

    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin = (e) => {
       
        e.preventDefault()
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
            props.getUsersData();
            props.getProjectsData();
            props.getTicketsData();
            navigate('/')
    })
   
        .catch(error => {
            console.log('Error: ', error.message)
            setError(error.message)
        })
    }
    
 

    return (
        <div>
          
            <Form onSubmit = {handleLogin} id = 'loginForm'  > 
            <img  src="/bugLogoBlack.png" alt="bug-logo" width = '180px'  id = 'logoLogin' class="d-block mx-auto mb-5" /> 
                <h5>Login </h5>
                <FormGroup>
                    <Label for="email">
                        E-mail
                    </Label>
                    <Col sm={8}>
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
                <Button type = "submit" color ='primary' >Login</Button>
                <Button type = "button" className = 'mx-2' onClick={() => navigate('/signup')} >Registration</Button>
               
            </Form>

        </div>
    )

}


export default connect(null, mapDispatchToProps) (Login)