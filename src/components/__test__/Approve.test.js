import React from 'react';
import { render, fireEvent, waitFor, getByRole, getByPlaceholderText,screen, findByRole } from '@testing-library/react';
import Approval from '../Staff/Approval';
import { staffService } from '../apiUrls';
import { BrowserRouter as Router } from 'react-router-dom';
import { Await } from 'react-router-dom';

jest.mock('../apiUrls', () => ({
  staffService: {
    pendinglist: jest.fn(),
    approveAccount: jest.fn(),
  },
}));

test('fetches and displays pending account data', async () => {
      staffService.pendinglist.mockResolvedValue({
        data: [
          { account_number: '123', status: 'pending', account_type: 'savings' },
          { account_number: '456', status: 'pending', account_type: 'current' },
        ],
      });
  
      render(<Router><Approval /></Router>);
  
      await waitFor(() => {
        expect(staffService.pendinglist).toHaveBeenCalledTimes(1);
      });
    });
// it.only("account Approved successfull", async () => {
//       const mockData = {
//         results:[
//           {
//           id:1,
//           acc_no:"21312312",
//           acc_type:"savings",
//           acc_balance:100,
//           acc_status:"pending"
//           }
//         ]
//       }
        
    
    
//         staffService.pendinglist.mockResolvedValueOnce({data:mockData});
//         staffService.approveAccount.mockResolvedValueOnce({data:{}});
//         render(<Router><Approval /></Router>);
//         await waitFor(() => {
//           expect(staffService.pendinglist).toHaveBeenCalled(1);
//         });
//         fireEvent.click(getByText("Approve"));
//       });
//       await waitFor(() => {
//         expect(staffService.approveAccount).toHaveBeenCalledWith(1);
//       });


describe('Approval component', () => {
  it('approves an account successfully', async () => {
    const mockId = '123'; 
    staffService.approveAccount.mockResolvedValueOnce({}); 
render(<Router><Approval /></Router>);

    // const approveButton = screen.findByRole('button'); 

    fireEvent.click(getByRole('button'),{name:'Approve'});


    await waitFor(() => {
      expect(staffService.approveAccount).toHaveBeenCalledWith(mockId);
      expect(window.alert).toHaveBeenCalledWith('Account Approved');
    });
  });
});

    
    
       
     
    

    