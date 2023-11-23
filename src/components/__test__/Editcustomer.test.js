import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import {BrowserRouter as Router,useLocation} from 'react-router-dom';

import EditCustomer from '../Staff/Edistcustomer';
import { staffService } from '../apiUrls';



jest.mock('../apiUrls', () => ({
  staffService: {
    updateCustomer: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

test('EditCustomer component renders with form fields', async () => {
  const mockLocationState = {

    username: 'testUser',
    email: 'test@example.com',
    usertype: 'regular',
  };

  // Mock useLocation to return the mockLocationState
  useLocation.mockReturnValue({ state: mockLocationState });

  render(
    <Router>
      <EditCustomer />
    </Router>
  );

  // ... existing test assertions and interactions

  await waitFor(() => {
    expect(staffService.updateCustomer).toHaveBeenCalledWith(
     {
        username: 'updateduser',
        email: 'updated@example.com',
        usertype: 'admin',
      }
    );
  });
  
});




  