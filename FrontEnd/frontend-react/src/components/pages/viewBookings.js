import React, {Component} from 'react';
import axios from 'axios';
import parse from "html-react-parser/index";
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import "../../assets/ViewBookings.css";
import {Redirect} from "react-router-dom";

class ViewBookings extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            currentBookingCode: "",
            pastBookingCode: ""
        }

        const user = JSON.parse(this.state.user);

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        if(user['role'] === 'Worker' || user['role'] === 'Customer'){
            axios.post("http://localhost:8080/getBookings", {

                userId: user['userId']

            },{
                headers: {
                    'Authorization': `Bearer ${proper}`
                }
            }).then(response => {

                console.log('response', response.data)

                let bookingCode = "";
                for(let i = 0; i < response.data['length']; i++){
                    let timeslot = response.data[i]['timeslot'];

                    if(timeslot === '9-10'){
                        timeslot = '9:00am - 10:00am';
                    }else if(timeslot === '10-11'){
                        timeslot = '10:00am - 11:00am'
                    }else if(timeslot === '11-12'){
                        timeslot = '11:00am - 12:00pm'
                    }else if(timeslot === '12-13'){
                        timeslot = '12:00pm - 1:00pm'
                    }else if(timeslot === '13-14'){
                        timeslot = '1:00pm - 2:00pm'
                    }else if(timeslot === '14-15'){
                        timeslot = '2:00pm - 3:00pm'
                    }else if(timeslot === '15-16'){
                        timeslot = '3:00pm - 4:00pm'
                    }else if(timeslot === '16-17'){
                        timeslot = '4:00pm - 5:00pm'
                    }

                    bookingCode += "<tr>";
                    bookingCode += "<td style='padding-right: 50px;'>" + response.data[i]['serviceName'] + "</td>";
                    bookingCode += "<td style='padding-right: 50px;'>" + response.data[i]['stringDate']  + "</td>";
                    bookingCode += "<td>" + timeslot + "</td>";
                    bookingCode += "</tr>";
                }

                this.setState({currentBookingCode: bookingCode});



            }).catch(errors => {

                console.log('errors', errors.data)

            })
        }

        axios.post("http://localhost:8080/getPastBookings", {

            userId: user['userId']

        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response => {

            console.log('response', response.data)

            let bookingCode = "";
            for(let i = 0; i < response.data['length']; i++){
                let timeslot = response.data[i]['timeslot'];

                if(timeslot === '9-10'){
                    timeslot = '9:00am - 10:00am';
                }else if(timeslot === '10-11'){
                    timeslot = '10:00am - 11:00am'
                }else if(timeslot === '11-12'){
                    timeslot = '11:00am - 12:00pm'
                }else if(timeslot === '12-13'){
                    timeslot = '12:00pm - 1:00pm'
                }else if(timeslot === '13-14'){
                    timeslot = '1:00pm - 2:00pm'
                }else if(timeslot === '14-15'){
                    timeslot = '2:00pm - 3:00pm'
                }else if(timeslot === '15-16'){
                    timeslot = '3:00pm - 4:00pm'
                }else if(timeslot === '16-17'){
                    timeslot = '4:00pm - 5:00pm'
                }

                bookingCode += "<tr>";
                bookingCode += "<td>" + response.data[i]['serviceName'] + "</td>";
                bookingCode += "<td>" + response.data[i]['stringDate']  + "</td>";
                bookingCode += "<td>" + timeslot + "</td>";
                bookingCode += "</tr>";
            }

            this.setState({pastBookingCode: bookingCode});



        }).catch(errors => {

            console.log('errors', errors.data)

        })
    }

    render() {
        if(this.state.loggedInStatus) {
            const user = JSON.parse(this.state.user);

            if(user['role'] === 'Admin'){

                return (
                    <div className={'divViewBookings'}>
                        <Header/>
                        <a className="backViewB" href={"/dashboard"}><i className="arrowViewB leftViewB"></i>back</a>
                        <div className="divViewB">

                            <h2>Company Past Bookings:</h2>
                            <table>
                                <tr>
                                    <th className={"tableViewB"}>Service</th>
                                    <th className={"tableViewB"}>Date</th>
                                    <th className={"tableViewB"}>Time</th>
                                </tr>
                                {parse(this.state.pastBookingCode)}
                            </table>

                        </div>
                        <Footer/>
                    </div>
                );

            }else{
                return (
                    <div className={'divViewBookings'}>
                        <Header/>
                        <a className="backViewB" href={"/dashboard"}><i className="arrowViewB leftViewB"></i>back</a>
                        <div className="divViewB">
                            <h2>Your Current Bookings:</h2>
                            <table>
                                <tr>
                                    <th className={"tableViewB"}>Service</th>
                                    <th className={"tableViewB"}>Date</th>
                                    <th className={"tableViewB"}>Time</th>
                                </tr>
                                {parse(this.state.currentBookingCode)}
                            </table>

                            <br/>

                            <h2>Your Past Bookings:</h2>
                            <table>
                                <tr>
                                    <th className={"tableViewB"}>Service</th>
                                    <th className={"tableViewB"}>Date</th>
                                    <th className={"tableViewB"}>Time</th>
                                </tr>
                                {parse(this.state.pastBookingCode)}
                            </table>
                        </div>
                        <Footer/>
                    </div>
                );
            }

        }else{
            return <Redirect to={'/login'} />
        }

    }
}

export default ViewBookings;