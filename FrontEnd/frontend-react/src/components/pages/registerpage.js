/*
    JS file for header of react website
    Started by: Winston . (S3777969)
    Worked on by: Rodrigo Miguel Rojas (s3784466)
*/
import React, {Component} from 'react';
import axios from 'axios';
import '../../assets/registerpage.css'
import { Redirect } from "react-router-dom";



class Registerpage extends Component {

    constructor(props){
        super(props);

        // The fields in the registration form (update when necessary)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Admin",
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
                console.log('registration response', response.data)

                // set code for response 200 here (show as good)
                sessionStorage.setItem('fromRegister', 'true')
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
        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className={"formReg"}>
                <a className="backReg" href={"/"}><i className="arrowReg leftReg"></i>back</a>
                <h1 className={"headReg"}> Join Us! </h1>
                <form onSubmit={this.handleSubmit}>
                    <label className ={"labelReg"}  htmlFor="role">Account Type:</label>
                    <select className ="dropdown"  name={'role'} onChange = {(event) => this.handleChange(event)} >
                        <option value ={"Admin"}>Admin</option>
                        <option value ={"User"}>User</option>
                    </select>
                    <input type={'text'} name={'firstName'} placeholder={'First Name'} value={this.state.firstName} onChange={this.handleChange} required/>
                    <input type={'text'} name={'lastName'} placeholder={'Last Name'} value={this.state.lastName} onChange={this.handleChange} required/>
                    <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email} onChange={this.handleChange} required/>
                    <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                    <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={this.state.confirmPassword} onChange={this.handleChange} required/>

                    <button type={'submit'}> Register </button>

                </form>
                <h4 className={"loginReg"}>Don't have an account? <a className="linkReg" href={"/login"}>Login</a></h4>
            </div>
        );
    }
}

export default Registerpage;

