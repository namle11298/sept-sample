import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import '../../assets/addingWorkersPage.css'

class AddingWorkersPage extends Component {
    constructor(){
        super()

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Worker",
            errors: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){

        // post registration information to API
        axios.post("http://localhost:8080/register", {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                role: this.state.role

            },
            {
                withCredentials: true // lets browser store cookie for logged in purposes
            }).then(response => {
            console.log('adding worker response', response.data)

            // set code for response 200 here (show as good)
            sessionStorage.setItem('addedWorker', 'true')
            this.setState({redirect: '/registrationComplete'})

        }).catch(error => {
            console.log('registration error', error)

            // set code for error response here (show as bad, display error messages)
        });

        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if(this.state.loggedInStatus){
            const user = JSON.parse(this.state.user)
            if(user['role'] === 'Admin'){
                if (this.state.redirect){
                    return <Redirect to={this.state.redirect} />
                }
                return (
                    <div className={"formWorker"}>
                        <a className="backWorker" href={"/dashboard"}><i className="arrowWorker leftWorker"></i>back</a>
                        <h1 className={"headWorker"}> Add A Worker</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input type={'text'} name={'firstName'} placeholder={'First Name'} value={this.state.firstName} onChange={this.handleChange} required/>
                            <input type={'text'} name={'lastName'} placeholder={'Last Name'} value={this.state.lastName} onChange={this.handleChange} required/>
                            <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email} onChange={this.handleChange} required/>
                            <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                            <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={this.state.confirmPassword} onChange={this.handleChange} required/>

                            <button type={'submit'}> Register Worker </button>

                        </form>
                    </div>
                )
            }else{
                return <Redirect to={'/login'} />
            }
        }else {
            return <Redirect to={'/login'} />
        }
    }
}

export default AddingWorkersPage;