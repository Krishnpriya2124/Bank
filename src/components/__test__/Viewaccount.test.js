import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ViewAccount from "../Customer/Viewaccount";
import { customerService } from "../apiUrls";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("../apiUrls", () => ({
  customerService: {
    accountDetails: jest.fn(),
    closeAccount: jest.fn(),
  },
}));

describe("ViewAccount component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("fetches account details on component mount", async () => {
    const mockData = {
      data: {
        customer: {
          id: 1,
          acc_type: "Savings",
          acc_status: "pending",
          acc_balance: 1000,
          user: 1,
        },
      },
    };

    customerService.accountDetails.mockResolvedValue(mockData);

    const { getByText } = render(
      <Router>
        <ViewAccount />
      </Router>
    );

    await waitFor(() => {
      expect(getByText("Savings")).toBeInTheDocument();
      expect(getByText("pending")).toBeInTheDocument();
      expect(getByText("1000")).toBeInTheDocument();
      expect(screen.getAllByText(1)[0]).toBeInTheDocument();
    });
    expect(customerService.accountDetails).toHaveBeenCalledTimes(1);
  });

  it("closes account successfull", async () => {
    const { getByText } = render(
      <Router>
        <ViewAccount />
      </Router>
    );
     
    const mockData = {data:"please withdraw the money"}
    customerService.closeAccount.mockResolvedValue(mockData);


    fireEvent.click(getByText("Close"));

    await waitFor(() => {
      expect(customerService.closeAccount).toHaveBeenCalledTimes(1);
    });
  });
});

it("account already closed ", async () => {
  
  const { getByText } = render(
    <Router>
      <ViewAccount />
    </Router>
  );
   
  const mockData = {response:{status:400}}
  customerService.closeAccount.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Close"));

  await waitFor(() => {
    expect(customerService.closeAccount).toHaveBeenCalledTimes(1);
  });
});

it("Didnt have an account", async () => {
  const { getByText } = render(
    <Router>
      <ViewAccount />
    </Router>
  );
   
  const mockData = {response:{status:404}}
  customerService.closeAccount.mockRejectedValueOnce(mockData);


  fireEvent.click(getByText("Close"));

  await waitFor(() => {
    expect(customerService.closeAccount).toHaveBeenCalledTimes(1);
  });
});

it("closes account successfull", async () => {
  const mockData = {
    data: {
      customer: {
        id: 1,
        acc_type: "Savings",
        acc_status: "approved",
        acc_balance: 0,
        user: 1,
      },
    },
  };

  const { getByText } = render(
    <Router>
      <ViewAccount />
    </Router>
  );
   

  customerService.closeAccount.mockResolvedValue(mockData);


  fireEvent.click(getByText("Close"));

  await waitFor(() => {
    expect(customerService.closeAccount).toHaveBeenCalledTimes(1);
  });
});




