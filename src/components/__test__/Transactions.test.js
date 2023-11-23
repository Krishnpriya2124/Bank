import React from 'react';
import { render,waitFor, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Transactions from '../Customer/Transactions';
import { customerService ,generalServices} from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';
import { axiosPrivate } from '../Interceptor';
import "@testing-library/jest-dom";


jest.mock('../Interceptor', () => ({
  __esModule: true,
  default: jest.fn(),
}));







jest.mock('../apiUrls', () => ({
  customerService: {
   
    downloadTransaction: jest.fn(),
  },
  generalServices:{
    transactionList:jest.fn()
  }
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

    generalServices.transactionList.mockResolvedValue({ data: mockData });
    
    render(
      <Router>
        <Transactions />
      </Router>
    );

    await waitFor(() => {
      expect(screen.findByText('Transaction Type'));
      expect(screen.findByText('Amount'))
      expect(screen.findByText('Balance'))
   
     
    });
  });
  

  it('handles download correctly', async () => {
    // Mock the asynchronous call to customerService.downloadHistory
    customerService.downloadTransaction.mockResolvedValue({
      status: 200,
      data: mockedResponseData,
    });
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const createObjectURLMock = jest.fn(() => 'mockedURL');
    const originalCreateObjectURL = window.URL.createObjectURL;
    window.URL.createObjectURL = createObjectURLMock;

    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    render(<Router><Transactions /></Router>);

  
    userEvent.click(screen.getByRole('button', { name: 'Download' }));  
    await waitFor(() => {
      expect(customerService.downloadTransaction).toHaveBeenCalledTimes(1);
    });
  
    expect(appendChildSpy).toHaveBeenCalled();
    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    // Restore the original createObjectURL
    window.URL.createObjectURL = originalCreateObjectURL;
    
  });
  
  
});