import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";
import {Redirect} from "react-router-dom";
import "../../assets/bookingAction.css";

class BookingAction extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            bookingCode: "",
            chosenBooking: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const user = JSON.parse(this.state.user);

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getBookings", {

            userId: user['userId']

        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response => {

            console.log('response', response.data)

            let bookingCode = "<option> - </option>";
            for(let i = 0; i < response.data['length']; i++){
                bookingCode += "<option value=" + response.data[i]['bookingId'] + "," + response.data[i]['stringDate'] + ">" + response.data[i]['serviceName'] + " on " + response.data[i]['stringDate'] + "</option>"

            }

            this.setState({bookingCode: bookingCode});

        }).catch(errors => {

            console.log('errors', errors.data)

        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){

        const user = JSON.parse(this.state.user);
        const bookingId = this.state.chosenBooking.split(',')[0];
        const bookingDate = this.state.chosenBooking.split(',')[1];
        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        if(user['role'] === 'Customer'){

            axios.post("http://localhost:8080/cancelBooking",{

                bookingId: parseInt(bookingId)

            },{
                headers: {
                    'Authorization': `Bearer ${proper}`
                }
            }).then(response => {
                console.log('cancel response', response.data);

                alert("Booking Cancelled")
                this.setState({redirect: "/dashboard"})

            }).catch(error => {
                console.log('cancel error', error.data);

                alert("Error while cancelling booking has occurred")

            })

        }else if(user['role'] === 'Worker'){

            const d = new Date();
            const todayMonth = d.getMonth()
            const todayDate = d.getFullYear() + "-" + (todayMonth+1) + "-" + d.getDate();
            const token = sessionStorage.getItem('token')
            const proper = token.substr(1, token.length - 2)

            if(todayDate >= bookingDate){

                axios.post("http://localhost:8080/finishBooking", {

                    bookingId: parseInt(this.state.chosenBooking)

                },{
                    headers: {
                        'Authorization': `Bearer ${proper}`
                    }
                }).then(response => {

                    console.log('finish response', response.data);
                    alert("Booking has been marked as finished")
                    this.setState({redirect: '/dashboard'})

                }).catch(errors => {

                    console.log('finish error', errors.data);

                })

            }else{

                alert("Booking has not happened yet")

            }
        }




        event.preventDefault()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        const user = JSON.parse(this.state.user);

        if(user['role'] === 'Customer'){
            return (
                <div>
                    <form className={'formBookingA'} onSubmit={this.handleSubmit}>
                        <a className="backBookingA" href={"/dashboard"}><i className="arrowBookingA leftBookingA"></i>back</a>
                        <h2> Cancel a booking: </h2>
                        <select className={'dropdownBookingA'} name={'chosenBooking'} onChange={this.handleChange}>
                            {parse(this.state.bookingCode)}
                        </select>
                        <br/>
                        <button type={'submit'}> Select </button>

                        <p className={'errorBookingA'}>Note: You may only cancel a booking before 48 hours of its booked date.</p>
                    </form>
                </div>
            );
        }else if(user['role'] === 'Worker'){
            return (
                <div>
                    <form className={'formBookingA'} onSubmit={this.handleSubmit}>
                        <a className="backBookingA" href={"/dashboard"}><i className="arrowBookingA leftBookingA"></i>back</a>
                        <h2> Mark a booking as done: </h2>
                        <select className={'dropdownBookingA'} name={'chosenBooking'} onChange={this.handleChange}>
                            {parse(this.state.bookingCode)}
                        </select>
                        <br/>
                        <button type={'submit'}> Select </button>
                    </form>
                </div>
            );
        }else{
            return <Redirect to={"/dashboard"}/>
        }


    }
}

export default BookingAction;