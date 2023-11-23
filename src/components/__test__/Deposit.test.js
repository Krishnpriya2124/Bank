import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Deposit from "../Customer/Deposit";
import { BrowserRouter as Router } from "react-router-dom";
import { customerService } from "../apiUrls";
import userEvent from '@testing-library/user-event';





  
  jest.mock('../apiUrls', () => ({
    customerService: {
      deposit: jest.fn(),
    },
  }));
  
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));
  
  describe('deposit Component', () => {
    it('submits the deposite form with valid input', async () => {
      customerService.deposit.mockResolvedValue({
        status: 'success',
      });
  
      const { getByLabelText, getByRole } = render(
        <Router>
          <Deposit />
        </Router>
      );
  
      fireEvent.change(getByLabelText(/Amount/i), { target: { value: '100' } });
  
      fireEvent.click(getByRole('button'));
  
      await waitFor(() => {});
  
      expect(customerService.deposit).toHaveBeenCalledWith({
        amount: '100',
      });
  
      
  
    })
  })


test("Amount input should be rendered", () => { 
  render   (
   <Router>
     < Deposit/>
   </Router>
 );
  const usernameInputEl = screen.getByPlaceholderText(/Amount/i);
  expect(usernameInputEl).toBeInTheDocument();
});

it("account Doesnot exist ", async () => {
  const { getByText } = render(
    <Router>
      <Deposit />
    </Router>
  );
   
  const mockData = {response:{status:403}}
  customerService.deposit.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Deposit"));

  await waitFor(() => {
    expect(customerService.deposit).toHaveBeenCalledTimes(1);
  });
});

it("inactive account ", async () => {
  
  const { getByText } = render(
    <Router>
      <Deposit />
    </Router>
  );
   
  const mockData = {response:{status:400}}
  customerService.deposit.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Deposit"));

  await waitFor(() => {
    expect(customerService.deposit).toHaveBeenCalledTimes(1);
  });
});





  
  
  
  