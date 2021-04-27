import React, {Component} from 'react';
import axios from "axios";
import "../../assets/serviceDetails.css";
import {Redirect} from "react-router-dom";

class ServiceDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            validation: sessionStorage.getItem('fromCompanyAndServices'),
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            service: sessionStorage.getItem('service'),
            adminId: sessionStorage.getItem('adminId'),
            company: sessionStorage.getItem('company'),
            description: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getDescription", {

            adminId: parseInt(this.state.adminId),
            service: this.state.service

        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response => {
            this.setState({description: response.data});

        }).catch(error =>{

        })

    }

    handleSubmit(event){

        if(event.target.value === "Yes"){
            sessionStorage.removeItem('fromCompanyAndServices');
            sessionStorage.setItem('fromServiceDetails', 'True');
            sessionStorage.setItem('desc', this.state.description);
            this.setState({redirect: "/bookingPage"})
        }
        else{
            this.setState({redirect: "/dashboard"})
        }

        event.preventDefault();
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        const user = JSON.parse(this.state.user);
        if(this.state.loggedInStatus && this.state.validation && user['role'] === 'Customer'){
            return (
                <div className={'formViewServ'}>
                    <form className={'textViewServ'}>
                        <h2>You have chosen:</h2>
                        <h4>Company Name: <br/>{this.state.company}</h4>
                        <h4>Service Name: <br/>{this.state.service}</h4>
                        <h4>Service Description: <br/>{this.state.description}</h4>

                        <br/>
                        <h4 className={'booking'}>Do you want to create a booking?</h4>
                        <button type={'submit'} onClick={this.handleSubmit} value={'Yes'}>Yes</button>
                        <button type={'submit'} onClick={this.handleSubmit} value={'No'}>No</button>
                    </form>

                </div>
            );
        }else{
            return <Redirect to={'/login'}/>
        }
    }
}

export default ServiceDetails;