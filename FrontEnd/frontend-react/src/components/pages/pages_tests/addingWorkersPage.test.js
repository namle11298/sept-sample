import React from 'react';
import { render } from '@testing-library/react';
import AddingWorkersPage from "../addingWorkersPage";
import axios from "axios";
import { shallow } from 'enzyme';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Registerpage from "../registerpage";
configure({ adapter: new Adapter() });

/*
    Check if render in registerpage works
 */
test('Check If page Renders Correctly', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<AddingWorkersPage/>);
})

test('check if name stored is name entered', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))

    const wrapper = shallow(<AddingWorkersPage/>);
    wrapper.find('input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'Winston' } });
    expect(wrapper.state('firstName')).toEqual('Winston');

})

test('check if name stored is not name entered', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))

    const wrapper = shallow(<AddingWorkersPage/>);
    wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Winston'}});
    expect(wrapper.state('firstName')).not.toEqual('Rodrigo');
})

test('Can register worker properly', () => {
    axios.post("http://localhost:8080/register/worker", {

        firstName: "Rodrigo",
        lastName: "Rojas",
        username: "worker",
        password: "test_case_password",
        confirm_password: "test_case_password",
        address: "address",
        phone: "84734958",
        role: "Worker",
        adminId: 1

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
test('Can reject wrong credentials', () => {


    axios.post("http://localhost:8080/register/worker", {

        firstName: "Rodrigo",
        lastName: "Rojas",
        username: "worker",
        password: "test_case_password",
        confirm_password: "test_case_password_wrong",
        address: "address",
        phone: "84734958",
        role: "Worker",
        adminId: 1

    }, {
        withCredentials: true
    }).then(response => {

        // if returns response 200, user should be empty therefore false
        const user = JSON.stringify(response);

        expect(user).toBeFalsy();

    }).catch(error => {

        // If returns response 400, error should be true
        const errorBody = JSON.stringify(error);

        expect(errorBody).toBeTruthy();
    })
})



