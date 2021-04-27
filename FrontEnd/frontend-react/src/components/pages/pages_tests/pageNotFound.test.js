import React from 'react';
import { render } from '@testing-library/react';
import PageNotFound from '../pageNotFound';

/*
    Tests to see if PageNotFound renders properly
 */
test('Page Renders Correctly', () => {
    const div = document.createElement('div');
    render(<PageNotFound/>, div)
})