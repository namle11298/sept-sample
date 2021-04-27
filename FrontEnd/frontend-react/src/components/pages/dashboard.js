import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";

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
        if(this.state.loggedInStatus){
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <Header/>
                        <h1>Admin Dashboard</h1>
                        <h3>Worker Options:</h3>
                        <form action={'/workerRegistration'}>
                            <button type={'submit'}>Add a Worker</button>
                        </form>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'User'){
                return (
                    <div>
                        <Header/>
                        <h1>User</h1>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'Worker'){
                return (
                    <div>
                        <Header/>
                        <h1>Worker</h1>
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
