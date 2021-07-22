import axios from "axios";
import React, { Component } from "react";

class AddTodo extends Component {
    state = { 
        shortDesc : '',
        description: '',
        planStartDate: '',
        planEndDate: '',
        errorMessage: null
     }
    render() { 
        return ( 
            <React.Fragment>
                <h1 className="display-6">Add Todo</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 input-group-sm">
                        <label htmlFor="exampleInputEmail1" className="form-label">Short Description</label>
                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleShortDescChange} />
                    </div>
                    <div className="mb-3 input-group-sm">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleDescChange}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3 input-group-sm">
                                <label htmlFor="exampleInputEmail1" className="form-label">Plan Start Date</label>
                                <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handlePlanStartChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 input-group-sm">
                                <label htmlFor="exampleInputEmail1" className="form-label">Plan End Date</label>
                                <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handlePlanEndChange} />
                            </div>
                        </div>
                    </div>
                    {this.state.errorMessage!==null? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {this.state.errorMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>: ''}
                    <button type="submit" className="btn btn-primary btn-sm">Add Todo</button>
                </form>
            </React.Fragment>
         );
    }

    componentWillUnmount = () => {
        console.log("Componented will unmount now");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("call post call to add todo");
        let todo = {short_desc: this.state.shortDesc, description: this.state.description, plan_start_date: this.state.planStartDate, plan_end_date: this.state.planEndDate};
        axios.post("http://localhost:8080/v1/todo/add", todo, {headers: {
            user_id: this.props.user.userId
        }}).then(res => {
            this.props.addedTodo();
        }).catch(err => {
            this.handleError(err);
        });
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

    handleShortDescChange = (event) => {
        this.setState({shortDesc: event.target.value});
    }

    handleDescChange = (event) => {
        this.setState({description: event.target.value});
    }

    handlePlanStartChange = (event) => {
        this.setState({planStartDate: event.target.value});
    }

    handlePlanEndChange = (event) => {
        this.setState({planEndDate: event.target.value});
    }

}

 
export default AddTodo;