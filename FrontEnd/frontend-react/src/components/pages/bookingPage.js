import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";
import {Redirect} from "react-router-dom";
import "../../assets/bookingPage.css";
class BookingPage extends Component {

    constructor(props){
        super(props);

        //states needed for this class
        this.state = {
            validation: sessionStorage.getItem('fromServiceDetails'),
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            adminId: sessionStorage.getItem('adminId'),
            chosenWorker: "",
            redirect: null,
            timeslot: "9-10",
            date: null,
            workerCode: "",
            errors: ""
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }


    handleSubmit(event){

        const workerArray = this.state.chosenWorker.split(",");
        const workerId = workerArray[0];
        const workerName = workerArray[1] + " " + workerArray[2];

        const date = new Date();

        const chosenDate = this.state.date.split('-');

        if(date.getDate() <= parseInt(chosenDate[2]) && date.getMonth()+1 === parseInt(chosenDate[1]) && date.getFullYear() === parseInt(chosenDate[0]) && workerName !== 'undefined undefined'){

            sessionStorage.setItem('workerId', workerId);
            sessionStorage.setItem('workerName', workerName);
            sessionStorage.setItem('date', this.state.date);
            sessionStorage.setItem('timeslot', this.state.timeslot);
            sessionStorage.removeItem('fromServiceDetails');
            sessionStorage.setItem('fromBookingPage', 'True');

            this.setState({redirect: "/confirmBooking"});

        }else if(workerName === 'undefined undefined') {

            this.setState({errors: "Error: Please choose a worker"});

        }else{

            this.setState({errors: "Error: Date must be within this month and not in the past."})

        }

        event.preventDefault();
    }

    handleDateChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getWorkerOnDate", {

            adminId: parseInt(this.state.adminId),
            date: event.target.value

        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response => {
            console.log('worker exists', response.data);

            let htmlCode = "<option> - </option>";

            for(let i = 0; i < response.data['length']; i++){
                const worker = response.data[i];
                htmlCode += "<option value=" + worker['userId'] + "," + worker['firstName'] + "," + worker['lastName'] + ">" +  worker['firstName'] + " " + worker['lastName'] + "</option>;";
            }

            this.setState({workerCode: htmlCode});

        }).catch(error => {
            console.log('worker error', error.data)

        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        const user = JSON.parse(this.state.user);

        if(this.state.loggedInStatus && this.state.validation && user['role'] === 'Customer'){
            return (
                <div>
                    <form className={'formBookingP'} onSubmit={this.handleSubmit}>
                        <h2> Book a Service! </h2>
                        {parse(this.state.errors)}
                        <h3>Select a Date:</h3>
                        <input className={'dropdownBookingP '} type={"date"} name={"date"} onChange={this.handleDateChange} required/>
                        <br/>
                        <h3>Select a Time:</h3>
                        <select className={'dropdownBookingP'} name={"timeslot"} onChange={this.handleChange} required>
                            <option value={"9-10"}>9:00am - 10:00am</option>
                            <option value={"10-11"}>10:00am - 11:00am</option>
                            <option value={"11-12"}>11:00am - 12:00pm</option>
                            <option value={"12-13"}>12:00pm - 1:00pm</option>
                            <option value={"13-14"}>1:00pm - 2:00pm</option>
                            <option value={"14-15"}>2:00pm - 3:00pm</option>
                            <option value={"15-16"}>3:00pm - 4:00pm</option>
                            <option value={"16-17"}>4:00pm - 5:00pm</option>
                        </select>
                        <br/>

                        <p className={'textBookingP'}>Please select a date to see workers. If there are no workers shown then</p>
                        <p className={'textBookingP'}> there are no workers available on your chosen date.</p>
                        <h3>Select A Worker:</h3>
                        <select className={'dropdownBookingP'}  name={'chosenWorker'} onChange={this.handleChange} required>
                            {parse(this.state.workerCode)}
                        </select>
                        <br/>

                        <button type={'submit'}> Book </button>
                    </form>
                </div>
            );
        }else{
            return <Redirect to={'/login'}/>
        }
    }
}

export default BookingPage;
