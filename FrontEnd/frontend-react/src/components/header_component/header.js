/*
    JS file for header of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
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
                                <a href={'/'} onClick={this.logout}>Logout</a>
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
                            <li className={"loginHead"}><a href={"/login"}> Login </a></li>
                            <li><a href={'/registrationType'}> Register </a></li>
                        </ul>

                    </nav>
                </header>
            );
        }
    }

}

export default Header;