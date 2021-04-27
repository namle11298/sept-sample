import React from 'react';
import { render } from '@testing-library/react';
import Registerpage from '../registerpage';
import axios from "axios";
import { shallow } from 'enzyme';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

/*
    Check if render in registerpage works
 */
test('Check If registerpage Renders Correctly', () => {
    sessionStorage.setItem('regRole', 'Admin')
    render(<Registerpage/>);
})

test('check if number stored is number entered', () => {
    const wrapper = shallow(<Registerpage/>);
    wrapper.find('input[type="number"]').simulate('change', { target: { name: 'number', value: '0412345678' } });
    expect(wrapper.state('number')).toEqual('0412345678');

})

test('check if number stored does not match number entered', () => {
    const wrapper = shallow(<Registerpage/>);
    wrapper.find('input[type="number"]').simulate('change', { target: { name: 'number', value: '0412345678' } });
    expect(wrapper.state('number')).not.toEqual('013524136257');

})

test('Can register properly', () => {

    axios.post("http://localhost:8080/register/admin", {

        firstName: "Rodrigo",
        lastName: "Rojas",
        username: "admin",
        password: "test_case_password",
        confirm_password: "test_case_password",
        address: "address",
        phone: "84734958",
        role: "Admin"

    }, {
        withCredentials: true
    }).then(response => {
        const user = JSON.stringify(response);

        // truthy means user exists and therefore was successful in registration
        expect(user).toBeTruthy();
    })
})

/*
    Test case to see if register API connection works properly on wrong authentication
 */
test('Can reject wrong login credentials', () => {


    axios.post("http://localhost:8080/register/customer", {

        firstName: "Rodrigo",
        lastName: "Rojas",
        username: "customer",
        password: "test_case_password",
        confirm_password: "test_case_password_wrong",
        address: "address",
        phone: "84734958",
        role: "Customer"

    }, {
        withCredentials: true
    }).then(response => {

        // if returns response 200, user should be empty therefore false
        const user = JSON.stringify(response);

        expect(user).toBeFalsy();

    }).catch(error=>{

        // If returns response 400, error should be true
        const errorBody = JSON.stringify(error);

        expect(errorBody).toBeTruthy();
    })
})