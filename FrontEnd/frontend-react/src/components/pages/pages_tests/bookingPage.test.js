import React from 'react';
import { render } from '@testing-library/react';
import BookingPage from "../bookingPage";

/*
    Check if render works
 */
test('Check If page Renders Correctly', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    sessionStorage.setItem('fromServiceDetails', 'True')
    render(<BookingPage/>)
})