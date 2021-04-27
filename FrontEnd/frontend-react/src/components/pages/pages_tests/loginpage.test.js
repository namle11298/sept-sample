import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Loginpage from "../loginpage";
configure({ adapter: new Adapter() });
import axios from 'axios';

test('Check If login page Renders Correctly', () => {
    render(<Loginpage/>);
})

test('check if username stored is username entered', () => {
    const wrapper = shallow(<Loginpage/>);
    wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'admin' } });
    expect(wrapper.state('username')).toEqual('admin');

})

test('check if password stored is email entered', () => {
    const wrapper = shallow(<Loginpage/>);
    wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '12345678' } });
    expect(wrapper.state('password')).toEqual('12345678');

})

test('check if username stored is not username entered, test will fail', () => {
    const wrapper = shallow(<Loginpage/>);
    wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'customer' } });
    expect(wrapper.state('username')).not.toEqual('admin')

})

test('check if password stored is not password entered, test will fail', () => {
    const wrapper = shallow(<Loginpage/>);
    wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '12345678' } });
    expect(wrapper.state('password')).not.toEqual('4983754');

})

test('Can login properly', () => {
    axios.post("http://localhost:8080/login", {

        username: "admin",
        password: "test_case_password"

    }, {
        withCredentials: true
    }).then(response => {
        const user = JSON.stringify(response);

        // truthy means user exists and therefore was successful login
        expect(user).toBeTruthy();
    })
})

/*
    Test case to see if login API connection works properly on wrong authentication
 */
test('Can reject wrong login credentials', () => {

    axios.post("http://localhost:8080/login", {

        username: "admin",
        password: "test_case_password_wrong"

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