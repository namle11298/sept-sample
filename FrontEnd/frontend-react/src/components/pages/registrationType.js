import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import '../../assets/registrationType.css'

class RegistrationType extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            role: "Admin"
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
        sessionStorage.setItem('regRole', this.state.role);
        this.setState({redirect: '/register'});
    }


    //display a form for user to choose which user role they are registering for
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        } else if (this.state.loggedInStatus){
            return <Redirect to={'/dashboard'}/>
        }else{
            return (
                <div className={'formRegType'}>
                    <h1>Account Type:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <select className={'dropdownRegType'} name={'role'} onChange={this.handleChange}>
                            <option value={'Admin'}>Admin</option>
                            <option value={'Customer'}>Customer</option>
                        </select>

                        <button type={'submit'}> Next </button>
                    </form>
                </div>
            );
        }
    }
}

export default RegistrationType;