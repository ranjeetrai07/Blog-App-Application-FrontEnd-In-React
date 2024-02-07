import { Card, CardBody, CardHeader, Container, FormGroup, Form, Label, Input, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import React, {useState, useEffect} from 'react';
import { signup } from "../services/user-service";
import { toast } from 'react-toastify'

const Signup = () => {

    const [data,setData] = useState({

        name:'',
        email:'',
        password:'',
        about:''
    })

    const [error, setError] = useState({
        error:{},
        isError:false
    })

    // useEffect(() => {
    //   console.log(data);
    // }, [data])

    // handle change
    const handleChange=(event, property)=>{
        //dynamic setting the values
        setData({...data, [property]:event.target.value})
    }

    //to reset data
    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:''
        })
    }

    //submit the form
    const submitForm=(event)=>{
        event.preventDefault()

        // if(error.isError){
        //     toast.error("Form data is invalid, correct all details then submit.")
        //     setError({...error,isError:false})
        //     return
        // }

        console.log(data);
        //data validate

        //call server api for sending data
        signup(data).then((resp) => {
            console.log(resp);
            console.log("success log");
            toast.success("User registered successfully !! user id" + resp.id);
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            })
        }).catch((error)=>{
            console.log(error)
            console.log("Error log")
            //handling error in 
            setError({
                errors:error,
                isError:true
            })
        })

    };

    return (
        <Base>
        <Container>
            <Row className="mt-4">

                {/* { JSON.stringify(data) } */}

                <Col sm={{ size: 6, offset: 3}}>
                <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Fill information to register</h3>
                    </CardHeader>
                    <CardBody>
                        {/* creating form */}
                        <Form onSubmit={submitForm}>
                            {/* Name field */}
                            <FormGroup>
                                <Label for="name">Enter Name</Label>
                                <Input 
                                type="text" 
                                placeholder="Enter Name here" 
                                id="name"
                                onChange={(e)=>handleChange(e, 'name')}
                                value={data.name}
                                invalid = { error.errors?.response?.data?.name ? true : false}
                                />
                                <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>
                            {/* email field */}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input type="Email" 
                                placeholder="Enter Email here" 
                                id="email"
                                onChange={(e)=>handleChange(e, 'email')}
                                value={data.email}
                                invalid = { error.errors?.response?.data?.email ? true : false}
                                />
                                <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>
                            {/* password field */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input type="password" 
                                placeholder="Enter Password here" 
                                id="password"
                                onChange={(e)=>handleChange(e, 'password')}
                                value={data.password}
                                invalid = { error.errors?.response?.data?.password ? true : false}
                                />
                                <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>
                            {/* about field */}
                            <FormGroup>
                                <Label for="about">Enter About</Label>
                                <Input type="textarea" 
                                placeholder="Enter About here" 
                                id="about" 
                                style={{height:"200px"}}
                                onChange={(e)=>handleChange(e, 'about')}
                                value={data.about}
                                invalid = { error.errors?.response?.data?.about ? true : false}
                                />
                                <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>
                            <Container className="text-center">
                                <Button outline color="light">Register</Button>
                                <Button onClick={resetData}  outline color="light" type="reset" className="ms-2">Rest</Button>
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

export default Signup;