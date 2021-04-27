import React from 'react';
import { render } from '@testing-library/react';
import Profilepage from "../profilepage";

/*
    Check if render works
 */
test('Check If profile renders Correctly Admin', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Profilepage/>)
})

/*
    Check if render works
 */
test('Check If profile renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Profilepage/>)
})

/*
    Check if render works
 */
test('Check If profile renders Correctly Worker', () => {
    const user = {
        role: 'Worker'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Profilepage/>)
})

test('Check If profile renders Correctly Worker', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Profilepage/>)
})

test('Check If profile renders Correctly Worker', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Profilepage/>)
})