import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signup from "../authentication/SignUp";
import { BrowserRouter as Router } from "react-router-dom";
import { customerService } from "../apiUrls";
import { act } from "@testing-library/react";

jest.mock("../apiUrls", () => ({
  customerService: {
    register: jest.fn(),
  },
}));

test("username input should be rendered", () => { 
    render   (
     <Router>
       < Signup/>
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
  });
 
 
  test("password input should be rendered", () => {
   render( <Router>
     <Signup />
   </Router>);
   const passwordInputEl = screen.getByPlaceholderText(/password/i);
   expect(passwordInputEl).toBeInTheDocument();
 });


 test("email input should be rendered", () => { 
    render   (
     <Router>
       <Signup />
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/email/i);
    expect(usernameInputEl).toBeInTheDocument();
  });


  test("firstname input should be rendered", () => { 
    render   (
     <Router>
       <Signup />
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/first_name/i);
    expect(usernameInputEl).toBeInTheDocument();
  });


  test("lastname input should be rendered", () => { 
    render   (
     <Router>
       <Signup />
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/last_name/i);
    expect(usernameInputEl).toBeInTheDocument();
  });


  test("usertype input should be rendered", () => { 
    render   (
     <Router>
       <Signup />
     </Router>
   );
    const usernameInputEl = screen.getByPlaceholderText(/user Type/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

 
 test("button should be rendered", () => {
   render(<Router>
     <Signup />
   </Router>);
   const buttonEl = screen.getByRole("button");
   expect(buttonEl).toBeInTheDocument();
 });


test('submits the registration form with valid input', async () => {

   
    const { getByLabelText, getByTestId } = render(<Router><Signup /></Router>);

    
    fireEvent.change(screen.getByPlaceholderText(/first_name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last_name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password@123' } });
    fireEvent.change(screen.getByPlaceholderText(/User Type/i), { target: { value: 'customer' } });

    fireEvent.click(screen.getByRole('button'));
   
   
    
  });

  it('renders registration form and handles registration failure', async () => {
   
    customerService.register.mockRejectedValueOnce(new Error('Username already Exist'));

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/first_name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last_name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password@123' } });
    fireEvent.change(screen.getByPlaceholderText(/User Type/i), { target: { value: 'customer' } });
 

    //Submit the form   
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
  });
    
    
  


  