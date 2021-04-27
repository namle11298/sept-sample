/*
    JS file for loginpage of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import '../../assets/loginpage.css'
import axios from "axios";
import {Redirect} from "react-router-dom";
import parse from 'html-react-parser';

// components


class Loginpage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            username: "",
            password: "",
            errors: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

        // post registration information to API
        axios.post("http://localhost:8080/login", {

                username: this.state.username,
                password: this.state.password

            },
            {
                withCredentials: true // lets browser store cookie for logged in purposes
            }).then(response => {
            console.log('login response', response)

            // set code for response 200 here (show as good)
            sessionStorage.setItem('user', JSON.stringify(response.data))
            sessionStorage.setItem('token' , JSON.stringify(response.data['jwt']))
            sessionStorage.setItem('loggedInStatus', 'true')
            this.setState({redirect: '/dashboard'})

        }).catch(error => {
            //check if there is an error when logging in, if there is an error
            //parse htmlCode to show that login has failed
            console.log('login error', error)

            const htmlCode = "<p style='text-align: center; color: red; font-weight: bold'>Login Failed</p>"

            this.setState({errors: htmlCode})
        });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        if(this.state.loggedInStatus){
            return <Redirect to={'/dashboard'} />
        }
        return (
            <div className="loginLog">
                {/*form to get input for login*/}
                <div className="formLog">
                    <a className="backLog" href={"/"}><i className="arrowLog leftLog"></i>back</a>
                    <h2 className="headLog">Welcome!</h2>

                    {parse(this.state.errors)}
                    <form onSubmit={this.handleSubmit}>
                        <input type={'text'} name={'username'} placeholder={'Username'} value={this.state.username}
                               onChange={this.handleChange} required/>
                        <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password}
                               onChange={this.handleChange} required/>

                        <button type={'submit'}> Login</button>
                    </form>
                    <h4 className="registerLog">Don't have an account? <a className="linkLog" href={"/register"}> Register</a></h4>
                </div>

            </div>
        );
    }
}

export default Loginpage;