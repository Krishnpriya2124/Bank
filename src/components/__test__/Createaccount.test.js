// Createaccount.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Createaccount from '../Customer/Createaccount';
import { BrowserRouter as Router } from 'react-router-dom';
import { customerService } from "../apiUrls";

jest.mock('../apiUrls', () => ({
  customerService: {
    createaccount: jest.fn(),
  },
}));

test("Account type input should be rendered", () => { 
    render   (
     <Router>
       <Createaccount />
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/account type/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

  
  
   

test("account input should be empty", () => {
    render(<Router>
      <Createaccount />
    </Router>)
    const passwordInputEl = screen.getByPlaceholderText(/account type/i);
    expect(passwordInputEl.value).toBe("");
  });

test("user already have account ", async () => {
    const { getByText } = render(
      <Router>
        <Createaccount />
      </Router>
    );
     
    const mockData = {response:{status:400}}
    customerService.createaccount.mockRejectedValueOnce(mockData);
  
  
    fireEvent.click(getByText("create"));
  
    await waitFor(() => {
      expect(customerService.createaccount).toHaveBeenCalledTimes(1);
    });
  });
  

it('updates input value on change', () => {
    const { getByPlaceholderText } = render( <Router>
      <Createaccount />
    </Router>);
    const inputField = getByPlaceholderText('account type');

    fireEvent.change(inputField, { target: { name: 'acc_type', value: 'Savings' } });

    expect(inputField.value).toBe('Savings');
  });
  
it("create account successfull", async () => {
  const mockData = {
    data: {
      customer: {

        acc_type: "Savings",
       
      },
    },
  };

    const { getByText } = render(
      <Router>
        <Createaccount />
      </Router>
    );
     

    customerService.createaccount.mockResolvedValue(mockData);


    fireEvent.click(getByText("create"));

    await waitFor(() => {
      expect(customerService.createaccount).toHaveBeenCalledTimes(1);
    });
  });


   
 
