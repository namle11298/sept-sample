import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


/*
  As App is just a route js file for each page, there can really be no testing here
  (unless routes can be tested with jest)
 */
test('Check If App Renders Correctly', () => {
  const div = document.createElement("div");
  render(<App></App>,div);
})