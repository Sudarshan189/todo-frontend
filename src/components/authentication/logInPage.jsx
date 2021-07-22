import React, { Component } from 'react';
import {Button, Form  } from "react-bootstrap";


class LogIn extends Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <Form onSubmit={this.loginForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Id</Form.Label>
                    <Form.Control type="number" placeholder="Enter unser id"  onChange={this.onUserNameUpdate} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={this.onPasswordUpdate} />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }

    onUserNameUpdate = (event) => {
        this.setState({username: event.target.value});
    }

    onPasswordUpdate = (event) => {
        this.setState({password: event.target.value});
    }

    loginForm = (event) => {
        event.preventDefault();
        this.props.loginEvent({userName: "Sudarshan", userId: 12345});
    }
}

export default LogIn;