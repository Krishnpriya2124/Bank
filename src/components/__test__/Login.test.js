import { fireEvent, render, screen, waitFor,getByText } from "@testing-library/react";
import Login from "../authentication/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { customerService } from "../apiUrls";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
jest.mock("../apiUrls", () => ({
  customerService: {
    login: jest.fn(),
  },
}));




describe('Login Component', () => {


test("username input should be  with onchange", () => {
    render
    (
      <Router>
        <Login />
      </Router>
    );
   
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const testValue="anu@gmail.com";
    fireEvent.change(usernameInputEl,{target:{value:testValue}});

    expect(usernameInputEl.value).toBe(testValue);
  });


 test("username input should be rendered", () => { 
   render   (
    <Router>
      <Login />
    </Router>
  );
   const usernameInputEl = screen.getByPlaceholderText(/username/i);
   expect(usernameInputEl).toBeInTheDocument();
 });


 test("password input should be rendered", () => {
  render( <Router>
    <Login />
  </Router>);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Router>
    <Login />
  </Router>);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});


test("username input should be empty", () => {
  render(<Router>
    <Login />
  </Router>);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Router>
    <Login />
  </Router>)
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});


test('submits the login form with valid input', async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'anu@gmail.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'anup@123' } });

 
  fireEvent.click(screen.getByRole('button'));


  customerService.login.mockResolvedValue({
    data: {
      access: 'yourAccessToken',
      refresh: 'yourRefreshToken',
      
    },
  });

  await waitFor(() => {

    expect(customerService.login).toHaveBeenCalledTimes(1);

 
    expect(customerService.login).toHaveBeenCalledWith({ username: 'anu@gmail.com', password: 'anup@123' });

  
  });
 
});









test('handles unsuccessful login', async () => {
  render(<Router><Login /></Router>);

  const emailInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  

  fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  customerService.login.mockRejectedValueOnce({
    response: {
      data: {
        error: 'Invalid credentials',
      },
    },
  });

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => { expect(customerService.login).toHaveBeenCalledWith({
    username: 'test@gmail.com',
    password: 'password123',
  });
  const storedToken = localStorage.getItem('token');
  expect(storedToken).toBeFalsy();
});
});


test('toggles password visibility on checkbox click', () => {
  const { getByText } =   render(<Router><Login /></Router>);;
  const passwordInput = document.getElementById('password');
  
  

  expect(passwordInput.type).toBe('password');

  fireEvent.click(getByText('Show Password'));
  expect(passwordInput.type).toBe('password');

  fireEvent.click(getByText('Show Password'));
  expect(passwordInput.type).toBe('password');
});




it('logs in successfully as a customer', async () => {
    const mockLoginResponse = {
      data: {
        access: 'accessTokenMock',
        refresh: 'refreshTokenMock',
        userid: '123',
      },
    };
    customerService.login.mockResolvedValueOnce(mockLoginResponse);

    const { getByPlaceholderText, getByText } = render(<Router><Login /></Router>);


    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

   
    userEvent.click(screen.getByRole('button'));
   
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/customerdash'));
  });
});


