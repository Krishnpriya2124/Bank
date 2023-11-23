import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { staffService } from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';
import Customerlist from '../Staff/Customerlist';
import { axiosPrivate } from '../Interceptor';

jest.mock('../apiUrls');
jest.mock('../Interceptor');
 
describe('Customerlist Component', () => {

it('fetches and displays customer data', async () => {
  staffService.pendinglist.mockResolvedValue({
    data: [
      { id: 1, usertype: 'customer', email: 'customer1@example.com', username: 'user1' },
      { id: 2, usertype: 'customer', email: 'customer2@example.com', username: 'user2' },
    ],
  });

  render(<Router><Customerlist /></Router>);

  await waitFor(() => {
    expect(staffService.customerlist).toHaveBeenCalledTimes(1);
  });
});

test('searches for a customer by name', async () => {
  const mockData = {
    results: [
      { id: 1, username: 'JohnDoe', usertype: 'Regular', email: 'john@example.com' },
      { id: 2, username: 'Alice Smith', usertype: 'Admin', email: 'alice@example.com' },
 
    ],
    next: 'api/customers?page=2', 
    previous: null, 
  };
  
  staffService.customerlist.mockResolvedValue({ data: mockData });

  render(<Router><Customerlist /></Router>);

  const searchInput = screen.getByPlaceholderText('Search by Name');
  fireEvent.change(searchInput, { target: { value: 'JohnDoe' } });

  

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
  staffService.customerlist.mockResolvedValueOnce({ data: mockData });
  staffService.customerlist.mockResolvedValueOnce({ data: nextPageData}); 
  render(<Router><Customerlist /></Router>);


  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);


  await waitFor(() => {
    expect(staffService.customerlist).toHaveBeenCalledTimes(1);
   
  });
});

});