import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import "../../assets/confirmBooking.css";

class ConfirmBooking extends Component {
    constructor(props){
        super(props);

        //states needed for this class
        this.state = {
            validation: sessionStorage.getItem('fromBookingPage'),
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            adminId: sessionStorage.getItem('adminId'),
            company: sessionStorage.getItem('company'),
            service: sessionStorage.getItem('service'),
            description: sessionStorage.getItem('desc'),
            workerId: sessionStorage.getItem('workerId'),
            workerName: sessionStorage.getItem('workerName'),
            date: sessionStorage.getItem('date'),
            timeslot: sessionStorage.getItem('timeslot'),
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){

        sessionStorage.removeItem('adminId');
        sessionStorage.removeItem('company');
        sessionStorage.removeItem('service');
        sessionStorage.removeItem('desc');
        sessionStorage.removeItem('workerId');
        sessionStorage.removeItem('workerName');
        sessionStorage.removeItem('date');
        sessionStorage.removeItem('timeslot');
        sessionStorage.removeItem('fromBookingPage')


        if(event.target.value === 'Confirm'){

            const user = JSON.parse(this.state.user);

            const token = sessionStorage.getItem('token')
            const proper = token.substr(1, token.length - 2)

            axios.post("http://localhost:8080/createBooking", {

                workerId: parseInt(this.state.workerId),
                customerId: parseInt(user['userId']),
                timeslot: this.state.timeslot,
                date: this.state.date,
                serviceName: this.state.service

            },{
                headers: {
                    'Authorization': `Bearer ${proper}`
                }
            }).then(response => {
                console.log('successful booking', response.data);


                alert('Booking Successful!')

            }).catch(errors => {
                console.log('booking error', errors.data);

                alert('Error: Worker may already be booked or date is more than a week away.')

            })

            this.setState({redirect: '/dashboard'})

        }else{

            alert('Booking cancelled...')
            this.setState({redirect: '/dashboard'})

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
                <div>
                    <form className={'formConfirmB'}>
                        <h2>Please confirm your booking with {this.state.company}</h2>
                        <h3>Service: {this.state.service}</h3>
                        <h3>Service Description: {this.state.description}</h3>
                        <h3>Date: {this.state.date}</h3>
                        <h3>Time: {this.state.timeslot}</h3>
                        <h3>Worker: {this.state.workerName}</h3>

                        <br/>
                        <br/>
                        <button type={'submit'} value={'Confirm'} onClick={this.handleSubmit}> Confirm </button>
                        <button type={'submit'} value={'Cancel'} onClick={this.handleSubmit}> Cancel </button>
                    </form>
                </div>
            );

        }else{
            return <Redirect to={'/login'}/>
        }

    }
}

export default ConfirmBooking;