import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import React, {useState} from 'react';
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [loginDetail, setLoginDetail] =   useState({
        username:'',
        password:''
    });

    const handleChange = (event, field) => {
        let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail);
        //validation
        if(loginDetail.username.trim() ==="" || loginDetail.password.trim() ===""){
            toast.error("Username or Password is required !!")
            return;
        }

        //submit the data to server to generate token
        loginUser(loginDetail).then((data) => {
            console.log(data)
            
            //save the data to local storage
            doLogin(data, () => {
                console.log("login detail is saved to localstorage")
                //redirect to user dashboard page
                navigate("/user/dashboard")
            })

            toast.success("User logged in successfully")
        }).catch(error => {
            console.log(error)
            if(error.response.status===400 || error.response.status===404){
                toast.error(error.response.data.message)
            }else{
                toast.error("Something went wrong on server")
            }
            
        })
    }

    //to reset data
    const resetDataHandel=()=>{
        setLoginDetail({
            username:'',
            password:'',
        })
    }    

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{size: 6, offset:3}}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Login Here!!</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleFormSubmit}>
                                    {/* email field */}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input 
                                            type="Email" 
                                            placeholder="Enter Email here" 
                                            id="email"
                                            value={loginDetail.username}
                                            onChange={(e) => handleChange(e, 'username')}
                                            />
                                    </FormGroup>
                                    {/* password field */}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="Enter Password here" 
                                            id="password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                            />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button outline color="light">Log In</Button>
                                        <Button onClick={resetDataHandel}  outline color="light" type="reset" className="ms-2">Rest</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
        
    );
};

export default Login;