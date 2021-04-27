import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import parse from 'html-react-parser';
import '../../assets/chooseAvailableWorker.css'

class ChooseAvailableWorker extends Component {
    constructor(props){
        super(props);

        //states needed for this class
        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            chosenWorker: "",
            userId: "",
            username: "",
            redirect: null,
            code: ""
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const adminUser = JSON.parse(this.state.user)
        const adminId = adminUser['userId']

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getworker/" + adminId, {},
            {
                headers: {
                    'Authorization': `Bearer ${proper}`
                }

        }).then(response => {
            const userCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = "<option> - </option>"
            for(let i = 0; i < userCount; i++){
                let usernameAndId = response.data[i]['username'] + "," + response.data[i]['userId']
                htmlCode += "<option value='" + usernameAndId + "'>" + usernameAndId + "</option>"
            }
            this.setState({code: htmlCode})

        })

    }

    handleChange(event){
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log('user', this.state.chosenWorker)
    }
    handleSubmit(event) {

        console.log('hi', this.state.chosenWorker)
        const workerArray = this.state.chosenWorker.split(",")
        const workerUsername = workerArray[0]
        const workerId = workerArray[1]

        //set session storage items to store worker information
        if (workerId) {
            sessionStorage.setItem('fromCompanyAndServices', 'True');
            sessionStorage.setItem('workerUserId', workerId)
            sessionStorage.setItem('workerUserName', workerUsername)
            this.setState({redirect: '/shiftAllocation'})
        }

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        } else {
            if(this.state.loggedInStatus){
                const user = JSON.parse(this.state.user)
                if(user['role'] === 'Admin'){
                    return (

                        <div>
                            {/*Form to choose worker to set shifts*/}
                            <form className={'formCAW'} onSubmit={this.handleSubmit}>
                                <h1>Select a Worker:</h1>
                                <select className={'dropdownCAW'} name={'chosenWorker'} onChange={this.handleChange}>
                                    {parse(this.state.code)}
                                </select>
                                <button type='submit'>Next</button>
                            </form>
                        </div>

                    );
                }else{
                    return <Redirect to={'/dashboard'}/>
                }
            }else{
                return <Redirect to={'/login'}/>
            }
        }
    }
}

export default ChooseAvailableWorker;