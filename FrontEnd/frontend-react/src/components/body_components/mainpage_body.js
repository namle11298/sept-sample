/*
    JS file for mainpage_body of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import '../../assets/body.css';

class MainpageBody extends Component {
    render() {
        return (
            <div className={'bodyText'}>
                <h1>Welcome to AGME Booking!</h1>
                <h3>

                    We are a service that helps businesses run better.
                    <br />
                    Simply register as a customer, or an admin and see what you are able to do below:
                    <br />
                    <br />
                    Admin:
                    Simply register with us and start managing your business with our website tailored towards making
                    your life easier. Some things you can do include:
                    <ul className={'listBody'}>
                        <li>Registering your workers!</li>
                        <li>Setting their shifts!</li>
                        <li>Setting the services you provide!</li>
                        <li>Make amazing profits!!</li>
                    </ul>
                    <br />
                    Customer:
                    Registering as a customer gives you the privilege to book the services that the business on our
                    website provide. Some things you can do include:

                    <ul className={'listBody'}>
                        <li>Checking out some great services!</li>
                        <li>Checking which workers are available for your services!</li>
                        <li>Book services at your leisure!</li>
                        <li>Become satisfied with our services!!</li>
                    </ul>
                </h3>
            </div>
        );
    }
}

export default MainpageBody;