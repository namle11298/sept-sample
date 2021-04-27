import React from 'react';
import { render } from '@testing-library/react';
import RegistrationType from "../registrationType";

/*
    Check if render works
 */
test('Check If page Renders Correctly', () => {
    render(<RegistrationType/>)
})
