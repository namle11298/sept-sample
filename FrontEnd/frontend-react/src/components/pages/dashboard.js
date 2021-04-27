import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";
import '../../assets/dashboard.css'

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        const user = JSON.parse(this.state.user)
        //if role is admin, show admin dashboard
        if(this.state.loggedInStatus){
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <Header/>
                        <div className={'bodyDash'}>
                            <h1>Welcome back {user['firstName']}!</h1>

                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'} type={'submit'}>View Profile Page</button>
                            </form>

                            <form className={'formDash'} action={'/setDetailsPage'}>
                                <button className={'buttonDash'} type={'submit'}>Set Company Details</button>
                            </form>

                            <h3>Administration Options:</h3>
                            <form className={'formDash'} action={'/workerRegistration'}>
                                <button className={'buttonDash'}  type={'submit'}>Add a Worker</button>
                            </form>
                            <form className={'formDash'} action={'/chooseAvailableWorker'}>
                                <button className={'buttonDash'} type={'submit'}>Allocate Worker Shifts</button>
                            </form>
                            <form className={'formDash'} action={'/viewWorkers'}>
                                <button className={'buttonDash'} type={'submit'}>View All Workers</button>
                            </form>
                            <form className={'formDash'} action={'/createService'}>
                                <button className={'buttonDash'}  type={'submit'}>Create a Service</button>
                            </form>
                            <form className={'formDash'} action={'/viewBookings'}>
                                <button className={'buttonDash'}  type={'submit'}>View Past Bookings</button>
                            </form>

                        </div>
                        <Footer/>
                    </div>
                )
            }
            //if role is customer, show customer dashboard
            else if(user['role'] === 'Customer'){
                return (
                    <div>
                        <Header/>
                        <div className={'bodyDash'}>
                            <h1>Welcome back {user['firstName']}!</h1>
                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'} type={'submit'}>View Profile Page</button>
                            </form>
                            <form className={'formDash'} action={'/selectCompany'}>
                                <button className={'buttonDash'} type={'submit'}>Contact A Company</button>
                            </form>

                            <h3>Customer Options:</h3>
                            <form className={'formDash'} action={'/companyAndServices'}>
                                <button className={'buttonDash'}  type={'submit'}> Book Services</button>
                            </form>
                            <form className={'formDash'} action={'/viewBookings'}>
                                <button className={'buttonDash'}  type={'submit'}>View Existing Bookings</button>
                            </form>
                            <form className={'formDash'} action={'/bookingAction'}>
                                <button className={'buttonDash'}  type={'submit'}>Cancel Existing Booking</button>
                            </form>
                        </div>
                        <Footer/>
                    </div>
                )
            }
            //if role is worker, show worker dashboard
            else if(user['role'] === 'Worker'){
                return (
                    <div>
                        <Header/>
                        <div className={'bodyDash'}>
                            <h1>Welcome back {user['firstName']}!</h1>

                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'}  type={'submit'}>View Profile Page</button>
                            </form>

                            <h3>Worker Options:</h3>
                            <form className={'formDash'} action={'/availability'}>
                                <button className={'buttonDash'}  type={'submit'}>Set Availability</button>
                            </form>
                            <form className={'formDash'} action={'/viewShifts'}>
                                <button className={'buttonDash'}  type={'submit'}>View Assigned Shifts</button>
                            </form>
                            <form className={'formDash'} action={'/viewBookings'}>
                                <button className={'buttonDash'}  type={'submit'}>View Existing Bookings</button>
                            </form>
                            <form className={'formDash'} action={'/bookingAction'}>
                                <button className={'buttonDash'}  type={'submit'}>Mark Finished Bookings</button>
                            </form>

                        </div>
                        <Footer/>
                    </div>
                )
            }
            else{
                return <Redirect to={'/login'} />
            }
        }
        else{
            return <Redirect to={'/login'} />
        }

    }
}

export default Dashboard;
