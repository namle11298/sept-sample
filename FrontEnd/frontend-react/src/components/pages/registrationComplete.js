import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import "../../assets/registrationComplete.css"
import {Redirect} from "react-router-dom";

class RegistrationComplete extends Component {
    constructor(props){
        super(props);

        this.state = {
            registered: sessionStorage.getItem('fromRegister'),
            fromWorker: sessionStorage.getItem('addedWorker')

        }
    }

    render() {
        if(this.state.registered){
            return (
                <div>
                    <Header/>

                    <h1 className={'congrats'}>Congratulations! You have successfully registered.</h1>
                    <h3 className={'congrats'}>Please login to use your new account!</h3>

                    {/*Clear session storage so you can only access this page after registering*/}
                    {sessionStorage.removeItem('fromRegister')}
                    <Footer/>

                </div>
            );
        }else if(this.state.fromWorker){
            return (
                <div>
                    <Header/>

                    <h1 className={'congrats'}>Congratulations! You have successfully registered a worker.</h1>
                    <h3 className={'congrats'}><a href={'/dashboard'}>Click here to return to the dashboard.</a></h3>

                    {/*Clear session storage so you can only access this page after registering*/}
                    {sessionStorage.removeItem('addedWorker')}
                    <Footer/>

                </div>
            );
        }else{
            return <Redirect to={'/login'} />
        }
    }
}

export default RegistrationComplete;