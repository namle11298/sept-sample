import React from 'react';
import { render } from '@testing-library/react';
import Availability from "../availability";

/*
    Check if render works
 */
test('Check If page Renders Correctly', () => {
    const user = {
        role: 'Worker'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<Availability/>)
})
