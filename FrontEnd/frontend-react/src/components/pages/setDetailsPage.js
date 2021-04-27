import React, {Component} from 'react';
import axios from "axios";
import '../../assets/setDetailsPage.css';
import {Redirect} from "react-router-dom";

class SetDetailsPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            detail: "",
            email: "",
            phone: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        this.setState({redirect: '/dashboard'});

        const user = JSON.parse(this.state.user)

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/setContactInfo",{
            userId: user['userId'],
            phone: this.state.phone.toString(),
            email: this.state.email,
            detail: this.state.detail
        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        })

        alert("Company details successfully submitted")

        this.setState({redirect: "/dashboard"})

        event.preventDefault();
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        if(this.state.loggedInStatus){
            const user = JSON.parse(this.state.user);

            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <form className={'formSet'} onSubmit={this.handleSubmit}>
                            <a className="backSet" href={"/dashboard"}><i className="arrowSet leftSet"></i>back</a>
                            <h2>Enter Company Details:</h2>
                            <br/>
                            <input type={'text'} name={'detail'} placeholder={'Details'} value={this.state.detail} onChange={this.handleChange} required/>
                            <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email} onChange={this.handleChange} required/>
                            <input type={'number'} name={'phone'} placeholder={'Phone'} value={this.state.phone} onChange={this.handleChange} required/>
                            <button type={'submit'}> Submit </button>
                        </form>
                    </div>
                );
            }else{
                return <Redirect to={'/dashboard'}/>
            }
        }else{
            return <Redirect to={'/login'}/>
        }
    }
}

export default SetDetailsPage;
