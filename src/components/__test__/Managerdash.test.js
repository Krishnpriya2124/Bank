import React from 'react';
import { render } from '@testing-library/react';
import MangerDash from '../manager/ManagerDash';
import { BrowserRouter as Router } from 'react-router-dom';
describe('ManagerDash component', () => {
  it('renders welcome message and ManagerNavBar', () => {
    const { getByText, getByRole } = render(<Router><MangerDash /></Router>);

    const welcomeText = getByText('WELCOME!!!!');
    expect(welcomeText).toBeInTheDocument();

    const managerNavBar = getByRole('navigation');
    expect(managerNavBar).toBeInTheDocument();
  });
});
