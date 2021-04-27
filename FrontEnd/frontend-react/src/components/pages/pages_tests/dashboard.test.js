import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from "../dashboard";

/*
    Check if render works
 */
test('Check If page Renders Correctly Admin', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Dashboard/>)
})

/*
    Check if render works
 */
test('Check If page Renders Correctly for Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Dashboard/>)
})

/*
    Check if render works
 */
test('Check If page Renders Correctly Worker', () => {
    const user = {
        role: 'Worker'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Dashboard/>)
})