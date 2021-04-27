/*
    JS file for header of react website
    Started by: Winston . (S3777969)
    Worked on by: Rodrigo Miguel Rojas (s3784466)
*/
import React, {Component} from 'react';
import axios from 'axios';
import '../../assets/registerpage.css'
import { Redirect } from "react-router-dom";
import parse from 'html-react-parser';



class Registerpage extends Component {

    constructor(props){
        super(props);

        // The fields in the registration form (update when necessary)
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            company: "",
            address: "",
            phone: "",
            role: sessionStorage.getItem('regRole'),
            errors: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){

        //when role is admin, this are the attributes needed
        if(this.state.role === "Admin"){
            axios.post("http://localhost:8080/register/admin", {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                company: this.state.company,
                address: this.state.address,
                phone: this.state.phone,
                role: this.state.role

            }, {
                withCredentials: true
            }).then(response => {
                console.log('registration response', response.data)

                // set code for response 200 here (show as good)
                sessionStorage.removeItem('regRole')
                sessionStorage.setItem('fromRegister', 'true')
                this.setState({redirect: '/registrationComplete'})
            }).catch(error => {
                console.log('registration error', error.data)

                const htmlCode = "<p style='text-align: center; color: red; font-weight: bold'>Registration Failed</p>"

                this.setState({errors: htmlCode})
            });
        }
        //when role is customer, this are the attributes needed
        else if(this.state.role === "Customer"){
            axios.post("http://localhost:8080/register/customer", {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                address: this.state.address,
                phone: this.state.phone,
                role: this.state.role

            }, {
                withCredentials: true
            }).then(response => {
                console.log('registration response', response.data)

                // set code for response 200 here (show as good)
                sessionStorage.removeItem('regRole')
                sessionStorage.setItem('fromRegister', 'true')
                this.setState({redirect: '/registrationComplete'})
            }).catch(error => {
                console.log('registration error', error.data)

                const htmlCode = "<p style='text-align: center; color: red; font-weight: bold'>Registration Failed</p>"

                this.setState({errors: htmlCode})
            });
        }
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
        //Different forms are rendered with different user role
        else if(this.state.role === "Admin"){
            return (
                <div className={"formReg"}>
                    <a className="backReg" href={"/"}><i className="arrowReg leftReg"></i>back</a>
                    <h1 className={"headReg"}> Join Us! </h1>

                    {parse(this.state.errors)}
                    <form onSubmit={this.handleSubmit}>

                        <h2>Role: {this.state.role}</h2>

                        <input type={'text'} name={'firstName'} placeholder={'First Name'} value={this.state.firstName} onChange={this.handleChange} required/>
                        <input type={'text'} name={'lastName'} placeholder={'Last Name'} value={this.state.lastName} onChange={this.handleChange} required/>
                        <input type={'text'} name={'username'} placeholder={'Username'} value={this.state.username} onChange={this.handleChange} required/>
                        <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                        <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={this.state.confirmPassword} onChange={this.handleChange} required/>
                        <input type={'text'} name={'company'} placeholder={'Business Name'} value={this.state.company} onChange={this.handleChange} required/>
                        <input type={'text'} name={'address'} placeholder={'Address'} value={this.state.address} onChange={this.handleChange} required/>
                        <input type={'number'} name={'phone'} placeholder={'Phone Number'} value={this.state.phone} onChange={this.handleChange} required/>
                        <button type={'submit'}> Register </button>

                    </form>
                    <h4 className={"loginReg"}>Don't have an account? <a className="linkReg" href={"/login"}>Login</a></h4>
                </div>
            );
        } else if(this.state.role === "Customer"){
            return (
                <div className={"formReg"}>
                    <a className="backReg" href={"/"}><i className="arrowReg leftReg"></i>back</a>
                    <h1 className={"headReg"}> Join Us! </h1>
                    {parse(this.state.errors)}
                    <form onSubmit={this.handleSubmit}>

                        <h2>Role: {this.state.role}</h2>

                        <input type={'text'} name={'firstName'} placeholder={'First Name'} value={this.state.firstName} onChange={this.handleChange} required/>
                        <input type={'text'} name={'lastName'} placeholder={'Last Name'} value={this.state.lastName} onChange={this.handleChange} required/>
                        <input type={'text'} name={'username'} placeholder={'Username'} value={this.state.username} onChange={this.handleChange} required/>
                        <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                        <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={this.state.confirmPassword} onChange={this.handleChange} required/>
                        <input type={'text'} name={'address'} placeholder={'Address'} value={this.state.address} onChange={this.handleChange} required/>
                        <input type={'number'} name={'phone'} placeholder={'Phone Number'} value={this.state.phone} onChange={this.handleChange} required/>
                        <button type={'submit'}> Register </button>

                    </form>
                    <h4 className={"loginReg"}>Don't have an account? <a className="linkReg" href={"/login"}>Login</a></h4>
                </div>
            );
        } else{
            return <Redirect to={'/registrationType'} />
        }

    }
}

export default Registerpage;

