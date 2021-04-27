import React from 'react';
import { render } from '@testing-library/react';
import Mainpage from '../mainpage';

/*
    Check if render in mainpage works
 */
test('Check If mainpage Renders Correctly', () => {
    const div = document.createElement("div");
    render(<Mainpage></Mainpage>,div);
})
