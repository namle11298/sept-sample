/*
    JS file for Mainpage of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

// components
import Header from '../header_component/header';
import Footer from '../footer_component/footer';
import MainpageBody from '../body_components/mainpage_body'

class Mainpage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        if(this.state.loggedInStatus){
            return <Redirect to={'/dashboard'} />
        }
        return (
            <div className={'mainPageBody'}>
                <Header/>
                <MainpageBody/>
                <Footer/>
            </div>
        );
    }
}

export default Mainpage;