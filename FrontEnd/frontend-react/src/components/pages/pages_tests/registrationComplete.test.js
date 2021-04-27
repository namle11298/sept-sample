import React from 'react';
import { render } from '@testing-library/react';
import RegistrationComplete from '../registrationComplete';



/*
    Tests to see if registration complete renders correctly with proper authorization
 */
test('Registration Complete Renders Correctly', () => {
    const div = document.createElement('div');

    sessionStorage.setItem('fromRegister', 'true');
    render(<RegistrationComplete/>, div);
})