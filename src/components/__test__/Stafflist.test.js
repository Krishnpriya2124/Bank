import React from 'react';
import { getByRole, render, screen, waitFor ,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { managerService } from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';
import Stafflist from '../manager/Stafflist';
import { Navigate } from 'react-router-dom';
jest.mock('../apiUrls');
jest.mock('../Interceptor');
 
test('fetches and displays staff data', async () => {
  managerService.stafflist.mockResolvedValue({
    data: [
      { id: 1, usertype: 'staff', email: 'staff1@example.com', username: 'staff1' },
      { id: 2, usertype: 'staff', email: 'staff22@example.com', username: 'staff2' },
    ],
  });

  render(<Router><Stafflist /></Router>);

  await waitFor(() => {
    expect(managerService.stafflist).toHaveBeenCalledTimes(1);
  });
});
test('handles pagination when "Next" button is clicked', async () => {
  const mockData = {
    results: [
      { id: 1, username: 'JohnDoe', usertype: 'Regular', email: 'john@example.com' },
      
 
    ],
    next: 'api/customers?page=2', 
    previous: null, 
  };
  const nextPageData = {
    results: [
      { id: 2, name: 'Alice Smith', usertype: 'Admin', email: 'alice@example.com' },
      
    ],
    next: 'api/customers?page=3', 
    previous: 'api/customers?page=1',
  };
  managerService.stafflist.mockResolvedValueOnce({ data: mockData });
  managerService.stafflist.mockResolvedValueOnce({ data: nextPageData}); 
  render(<Router><Stafflist /></Router>);


  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);


  await waitFor(() => {
    expect(managerService.stafflist).toHaveBeenCalledTimes(1);
   
  });
  
});
test('searches for a staff by name', async () => {
  const mockData = {
    results: [
      { id: 1, username: 'JohnDoe', usertype: 'staff', email: 'john@example.com' },
      { id: 2, username: 'Alice Smith', usertype: 'staff', email: 'alice@example.com' },
 
    ],
    next: 'api/customers?page=2', 
    previous: null, 
  };
  
  managerService.stafflist.mockResolvedValue({ data: mockData });

  render(<Router><Stafflist /></Router>);

  const searchInput = screen.getByPlaceholderText('Search by Name');
  fireEvent.change(searchInput, { target: { value: 'JohnDoe' } });

  

});









  




