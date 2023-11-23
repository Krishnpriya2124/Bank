import React from 'react';
import { render } from '@testing-library/react';
import Staffdash from '../Staff/StaffDash';
import { BrowserRouter as Router } from 'react-router-dom';
describe('Staffdash component', () => {
  it('renders welcome message and StaffNavBar', () => {
    const { getByText, getByRole } = render(<Router><Staffdash /></Router>);

    const welcomeText = getByText('WELCOME!!!!');
    expect(welcomeText).toBeInTheDocument();

    const staffNavBar = getByRole('navigation'); 
    expect(staffNavBar).toBeInTheDocument();
  });
});
