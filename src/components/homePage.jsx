import React, { Component } from 'react';
import Header from './header';
import Todos from './todosFrag';
import AddTodo from "./addTodoFrag";
import LogIn from './authentication/logInPage'
import axios from 'axios';

class HomePage extends Component {
    state = {
        todos : [
        ],
        user: undefined,
        addFlag: false,
        errorMessage: undefined
    }
    render() { 
        return (
        <React.Fragment>
            {this.state.user !== undefined?<React.Fragment>
                <Header todosListSize={this.state.todos.length} user={this.state.user} logoutEvent={this.logoutEvent}/>
                <div className="row m-3">
                    <div className="col-md-6">
                        <Todos todoList={this.state.todos} addFlagEvent={this.addFlagChangeEvent} deleteTodoEvent={this.deleteTodoEvent} updateTodoEvent={this.updateTodoStatusEvent} error={this.state.errorMessage}/>
                    </div>
                    {this.state.addFlag === true? <div className="col-md-6">
                        <AddTodo addedTodo={this.addedTodoEvent} user= {this.state.user}/>
                    </div> : ''}
                    
                </div> 
            </React.Fragment> : <LogIn loginEvent={this.loginEvent}></LogIn>}
        </React.Fragment>
        );
    }

    componentDidMount = () => {
       // let user = {userId: 12345, userName: 'Sudarshan'}
        //localStorage.setItem("user", JSON.stringify(user));
       
           
    }

    componentWillUnmount = () => {
        console.log("Will unmount");
    }

    loginEvent = (userObj) =>  {
        console.log(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        this.setState({user: JSON.parse(localStorage.getItem("user"))}, () => {
            this.getAllTodos();
        });
    }

    logoutEvent = (userObj) =>  {
        console.log(userObj);
        localStorage.removeItem("user");
        this.setState({user: undefined});
    }

    getAllTodos = () => {
        console.log(this.state.user)
        axios.get("http://localhost:8080/v1/todo/all/"+this.state.user.userId)
            .then(res => this.setState({todos: res.data.todos}))
            .catch(err => {
                this.handleError(err)
            } );
    }   

    deleteTodoEvent = (todo) => {
        axios.delete("http://localhost:8080/v1/todo/delete/"+todo.todo_id, {headers: {
            user_id: this.state.user.userId
        }})
            .then(res => {
                this.getAllTodos();
            })
            .catch(err => this.handleError(err));
    }

    addedTodoEvent = () => {
        // call get all todo api
        console.log("Add event called")
        this.getAllTodos();
        this.setState({addFlag : !this.state.addFlag})
    }

    addFlagChangeEvent = () => {
        this.setState({addFlag : !this.state.addFlag});
    }

    updateTodoStatusEvent = (todoD, status) => {
        console.log("call update todo with perticular todo id", todoD.todo_id, status);
        axios.put("http://localhost:8080/v1/todo/update/"+todoD.todo_id, {status: status}, {headers: {user_id: this.state.user.userId}})
            .then(res => {
                let tempState = [...this.state.todos];
                let index = tempState.findIndex(todo => todo.todo_id === todoD.todo_id);
                tempState[index] = res.data
                this.setState({todos: tempState});
            })
            .catch(err => this.handleError(err));
    }

    handleError = (error) => {
        if (error.response) {
            console.log("Response error")
            if (error.response.status === 400) {
                let subErrors = "";
                error.response.data.sub_errors.forEach(element => {
                    console.log(element.field);
                    subErrors =subErrors + element.field + " : " + element.message + "\n";
                });
                this.setState({errorMessage: subErrors})
            } else if (error.response.status === 500) {
                this.setState({errorMessage: error.response.data.message});
            } else if (error.response.status === 401) {
                this.setState({errorMessage: error.response.data.message});
            }
        } else if (error.request) {
            this.setState({errorMessage: "Something went wrong while connecting to url"});
        } else {
            console.log("Error");
            console.log(error.message);
            this.setState({errorMessage: "Something went wrong while connecting to url"});
        }
    }
}
 
export default HomePage;