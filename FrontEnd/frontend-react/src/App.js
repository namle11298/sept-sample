import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

// pages
import Mainpage from './components/pages/mainpage';
import PageNotFound from './components/pages/pageNotFound';
import Loginpage from './components/pages/loginpage';
import Registerpage from './components/pages/registerpage';
import Dashboard from './components/pages/dashboard';
import RegistrationComplete from "./components/pages/registrationComplete";
import AddingWorkers from "./components/pages/addingWorkersPage";
import RegistrationType from "./components/pages/registrationType";
import ShiftAllocation from "./components/pages/shiftAllocation";
import Availability from "./components/pages/availability";
import ChooseAvailableWorker from "./components/pages/chooseAvailableWorker";
import Profilepage from "./components/pages/profilepage";
import ViewShifts from "./components/pages/viewShifts";
import ViewWorkers from "./components/pages/viewWorkers";
import CreateService from "./components/pages/createService";
import CompanyAndServices from "./components/pages/companyAndServices";
import ServiceDetails from "./components/pages/serviceDetails";
import BookingPage from "./components/pages/bookingPage";
import ConfirmBooking from "./components/pages/confirmBooking";
import ViewBookings from "./components/pages/viewBookings";
import BookingAction from "./components/pages/bookingAction";
import setDetailsPage from "./components/pages/setDetailsPage";
import selectCompany from "./components/pages/selectCompany";
import companyDetailsPage from "./components/pages/companyDetailsPage";



class App extends Component {
    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path={'/'} component={Mainpage}/>
                    <Route exact path={'/login'} component={Loginpage}/>
                    <Route exact path={'/register'} component={Registerpage}/>
                    <Route exact path={'/dashboard'} component={Dashboard}/>
                    <Route exact path={'/registrationComplete'} component={RegistrationComplete}/>
                    <Route exact path={'/workerRegistration'} component={AddingWorkers}/>
                    <Route exact path={'/registrationType'} component={RegistrationType}/>
                    <Route exact path={'/shiftAllocation'} component={ShiftAllocation}/>
                    <Route exact path={'/availability'} component={Availability}/>
                    <Route exact path={'/chooseAvailableWorker'} component={ChooseAvailableWorker}/>
                    <Route exact path={'/profile'} component={Profilepage}/>
                    <Route exact path={'/viewShifts'} component={ViewShifts}/>
                    <Route exact path={'/viewWorkers'} component={ViewWorkers}/>
                    <Route exact path={'/createService'} component={CreateService}/>
                    <Route exact path={'/companyAndServices'} component={CompanyAndServices}/>
                    <Route exact path={'/serviceDetails'} component={ServiceDetails}/>
                    <Route exact path={'/bookingPage'} component={BookingPage}/>
                    <Route exact path={'/confirmBooking'} component={ConfirmBooking}/>
                    <Route exact path={'/viewBookings'} component={ViewBookings}/>
                    <Route exact path={'/bookingAction'} component={BookingAction}/>
                    <Route exact path={'/setDetailsPage'} component={setDetailsPage}/>
                    <Route exact path={'/selectCompany'} component={selectCompany}/>
                    <Route exact path={'/companyDetailsPage'} component={companyDetailsPage}/>

                    {/*KEEP AT THE END*/}
                    <Route path={'/404'} component={PageNotFound}/>
                    <Redirect to={'/404'}/>
                </Switch>
            </Router>

        );
    }
}

export default App;
