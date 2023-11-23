import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Withdraw from "../Customer/Withdraw";
import { BrowserRouter as Router } from "react-router-dom";
import { customerService } from "../apiUrls";
import userEvent from '@testing-library/user-event';





  
  jest.mock('../apiUrls', () => ({
    customerService: {
        withdraw: jest.fn(),
    },
  }));
  
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));
  
  describe('withdraw Component', () => {
    it('submits the deposite form with valid input', async () => {
      customerService.withdraw.mockResolvedValue({
        status: 'success',
      });
  
      const { getByLabelText, getByRole } = render(
        <Router>
          <Withdraw />
        </Router>
      );
  
      fireEvent.change(getByLabelText(/Amount/i), { target: { value: '100' } });
  
      fireEvent.click(getByRole('button'));
  
      await waitFor(() => {});
  
      expect(customerService.withdraw).toHaveBeenCalledWith({
        amount: '100',
      });
  
      
  
    })
  })


test("Amount input should be rendered", () => { 
  render   (
   <Router>
     < Withdraw/>
   </Router>
 );
  const usernameInputEl = screen.getByPlaceholderText(/Amount/i);
  expect(usernameInputEl).toBeInTheDocument();
});

it("account Doesnot exist ", async () => {
  const { getByText } = render(
    <Router>
      <Withdraw />
    </Router>
  );
   
  const mockData = {response:{status:403}}
  customerService.withdraw.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Withdraw"));

  await waitFor(() => {
    expect(customerService.withdraw).toHaveBeenCalledTimes(1);
  });
});

it("inactive account ", async () => {
  const { getByText } = render(
    <Router>
      <Withdraw />
    </Router>
  );
   
  const mockData = {response:{status:400}}
  customerService.withdraw.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Withdraw"));

  await waitFor(() => {
    expect(customerService.withdraw).toHaveBeenCalledTimes(1);
  });
});

  it("insuffient balance ", async () => {
    const { getByText } = render(
      <Router>
        <Withdraw />
      </Router>
    );
     
    const mockData = {response:{status:404}}
    customerService.withdraw.mockRejectedValueOnce(mockData);
  
  
    fireEvent.click(getByText("Withdraw"));
  
    await waitFor(() => {
      expect(customerService.withdraw).toHaveBeenCalledTimes(1);
    });
  });







  
  






  
  