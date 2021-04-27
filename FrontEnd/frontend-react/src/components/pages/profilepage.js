import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import '../../assets/profilepage.css';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";

class Profilepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        const user = JSON.parse(this.state.user)
        if(this.state.loggedInStatus) {
            return (
                <div>
                    <Header/>
                    {/*profile for specified user*/}
                    <div className={'divProfile'}>
                        <a className="backProfile" href={"/dashboard"}><i className="arrowProfile leftProfile"></i>back</a>
                        <h1 className={'headerProfile'}>Profile Page</h1>
                        <div className={'textProfile'}>

                            <h4>Role: {user['role']}</h4>
                            <h4>Username: {user['username']}</h4>
                            <h4>Name: {user['firstName']} {user['lastName']}</h4>
                            <h4>Address: {user['address']}</h4>
                            <h4>Phone: {user['phone']}</h4>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }else{
            return <Redirect to={'/login'}/>
        }


    }
}

export default Profilepage;