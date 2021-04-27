/*
    JS file for header of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/header.css';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    logout =() => {

        this.setState({loggedInStatus: false})
        this.setState({user: null})
        console.log('loggedInStatus', this.state.loggedInStatus)
        console.log('user', this.state.user)
        sessionStorage.clear()
    }
    render() {
        if(this.state.loggedInStatus){
            return (
                <header className={'header'}>

                    {/*Div for Website Logo (insert ref to logo image)*/}
                    <div className={'title'}>
                        AGME BOOKING
                    </div>

                    <nav className={'navbar'}>
                        <ul className={'list'}>
                            <li>
                                <Link to={'/'} onClick={this.logout}>Logout</Link>
                            </li>
                        </ul>

                    </nav>
                </header>
            );
        }
        else{
            return (
                <header className={'header'}>

                    {/*Div for Website Logo (insert ref to logo image)*/}
                    <div className={'title'}>
                        AGME BOOKING
                    </div>

                    <nav className={'navbar'}>
                        <ul className={'list'}>
                            <li className={"loginHead"}><Link to={"/login"}> Login </Link></li>
                            <li><Link to={'/register'}> Register </Link></li>
                        </ul>

                    </nav>
                </header>
            );
        }
    }

}

export default Header;