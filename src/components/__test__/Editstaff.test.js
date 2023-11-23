import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editstaff from '../manager/Editstaff';
import { managerService } from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../apiUrls', () => ({
  managerService: {
    updateStaff: jest.fn(),
  },
}));

describe('Editstaff Component', () => {
  const mockLocationState = {
    id: "1",
    username: 'testUser',
    email: 'test@example.com',
    usertype: 'regular',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders Editstaff component', () => {
    const { getByText, getByLabelText } = render(<Editstaff />, {
      wrapper: Router,
      initialEntries: ['/edit-staff'],
      initialIndex: 0,
    });

    
    expect(getByText('Approve')).toBeInTheDocument();
    expect(getByLabelText('id')).toBeInTheDocument();
    
  });

});