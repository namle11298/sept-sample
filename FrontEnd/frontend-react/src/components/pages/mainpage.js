/*
    JS file for Mainpage of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';

// components
import Header from '../header_component/header';
import Footer from '../footer_component/footer';
import MainpageBody from '../body_components/mainpage_body'

class Mainpage extends Component {

    render() {
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