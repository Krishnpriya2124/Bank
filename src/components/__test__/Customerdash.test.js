import React from 'react';
import { render } from '@testing-library/react';
import Customerdash from '../Customer/CustomerDash';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Customerdash component', () => {
  it('renders welcome message', () => {
    const { getByText } = render(<Router><Customerdash /></Router>);

    const welcomeText = getByText('WELCOME!!!!');
    expect(welcomeText).toBeInTheDocument();
  });
});
