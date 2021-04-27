import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";
import {Redirect} from "react-router-dom";
import "../../assets/selectCompany.css";

class SelectCompany extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            companyCode: "",
            companyDetails: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getAllCompanies",{},{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response =>{

            console.log(response.data)
            const companyCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = "<option> - </option>"
            for(let i = 0; i < companyCount; i++){
                let companyName = response.data[i]
                htmlCode += "<option value='" + companyName['adminId'] + "," + companyName['company']+ "'>" + companyName['company'] + "</option>"
            }

            this.setState({companyCode: htmlCode})
        })


    }

    handleChange(event){

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        const companyId = this.state.companyDetails.split(',')[0]
        const companyName = this.state.companyDetails.split(',')[1]
        sessionStorage.setItem('companyId', companyId)
        sessionStorage.setItem('companyName', companyName)
        sessionStorage.setItem('fromSelectCompany', 'True')
        this.setState({redirect: '/companyDetailsPage'})
        event.preventDefault()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        if(this.state.loggedInStatus){
            const user = JSON.parse(this.state.user);

            if(user['role'] === 'Customer'){
                return (
                    <div>
                        <form className={'formSelect'} onSubmit={this.handleSubmit}>
                            <h2>Select A Company:</h2>
                            <br/>
                            <select className={'dropdownSelect'} name={"companyDetails"} onChange={this.handleChange}>
                                {parse(this.state.companyCode)}
                            </select>
                            <button type={'submit'}> Next </button>
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

export default SelectCompany;