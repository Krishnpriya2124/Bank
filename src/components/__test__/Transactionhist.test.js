import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import Transactions from '../Customer/Transactions';
import {staffService,generalServices} from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';
import TransactionHistory from '../Staff/transactionhist';
jest.mock('../apiUrls', () => ({
  staffService: {
   
    transactionHistory: jest.fn(),
  },

}));

describe('TransactionHistory Component', () => {

 
  const mockedResponseData = 'mocked CSV data';
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders transaction history data', async () => {
    const mockData = {
      results: [
        {
          id: 1,
          trans_type: 'Deposit',
          amount: 100,
          trans_date:"2-3-2000",
          
        },
        // Add more sample data as needed
      ],
      next_page:'/api/transactions/?page=2',
      previous_page: null,
    };

    staffService.transactionHistory.mockResolvedValue({ data: mockData });
    
    render(
      <Router>
        <TransactionHistory />
      </Router>
    );

    await waitFor(() => {
      expect(screen.findByText('Transaction Type'));
      expect(screen.findByText('Amount'))
      expect(screen.findByText('Balance'))
   
     
    });
  });

  it('handles pagination when "Next" button is clicked', async () => {
    const mockData = {
      results: [
        { id: 1, amount: '100', trans_type: 'deposit', trans_date: '22-09-2020',acc:2 },
        
   
      ],
      next: 'api/customers?page=2', 
      previous: null, 
    };
    const nextPageData = {
      results: [
        { id: 2, amount: '100', trans_type: 'deposit', trans_date: '22-09-2020',acc:2 },
        
      ],
      next: 'api/customers?page=3', 
      previous: 'api/customers?page=1',
    };
    staffService.transactionHistory.mockResolvedValueOnce({ data: mockData });
    staffService.transactionHistory.mockResolvedValueOnce({ data: nextPageData}); 
    render(<Router><TransactionHistory /></Router>);
  
  
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
  
  
    await waitFor(() => {
      expect(staffService.transactionHistory).toHaveBeenCalledTimes(1);
     
    });
  });
  
  
});
it('filters transactions based on a valid Account ID', () => {
  const { getByPlaceholderText, getByText } =render(<Router><TransactionHistory /></Router>);
  const searchInput = getByPlaceholderText('Search by AccountId');


  fireEvent.change(searchInput, { target: { value: '123' } });

  const transactionRows = getByText('Transaction ID').parentElement.parentElement.querySelectorAll('tr');
  expect(transactionRows.length).toBeGreaterThan(0); 
  for (let i = 1; i < transactionRows.length; i++) {
    const row = transactionRows[i];
    expect(row.textContent).toContain('123');
  }
  });
    it('displays all transactions when the search term is empty', () => {
      const { getByPlaceholderText, getByText } =render(<Router><TransactionHistory /></Router>);
   
      const searchInput = getByPlaceholderText('Search by AccountId');
      expect(searchInput.value).toBe(''); 
  
   
      const transactionRows = getByText('Transaction ID').parentElement.parentElement.querySelectorAll('tr');
      expect(transactionRows.length).toBeGreaterThan(0);
    });
    
    