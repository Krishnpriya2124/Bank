import { axiosPrivate } from "./Interceptor";

const login = (data) => {
    return axiosPrivate.post('api/login/',data);
  };

const register = (data) => {
    return axiosPrivate.post('api/register/',data);
  };
  const createaccount = (data) => {
    return axiosPrivate.post('account/create/',data);
  };
  const deposit = (data) => {
    return axiosPrivate.post('transaction/deposit/',data);
  };
  const withdraw = (data) => {
    return axiosPrivate.post('transaction/withdraw/',data);
  };
  const pendinglist= () => {
    return axiosPrivate.get(`account/pendinglist/`);
  }
  const approveAccount = (id) => {
    return axiosPrivate.patch('account/approval/', id)
  }
  const customerlist= () => {
    return axiosPrivate.get(`customerlist/`);
  }
  const stafflist= () => {
    return axiosPrivate.get(`stafflist/`);
  }
  const updateStaff= (data) => {
    return axiosPrivate.patch(`updatestaff/`,data);
  }
  const transactionList= () => {
    return axiosPrivate.get(`transaction/transactions/`);
  }
  const updateCustomer= (data) => {
    return axiosPrivate.patch(`updatecustomer/`,data);
  }
  const transactionHistory= () => {
    return axiosPrivate.get(`transaction/transactionsview/`);
  }
  const downloadTransaction= () => {
    return axiosPrivate.get(`transaction/statement/`);
  }
  const closeAccount = () => {
    return axiosPrivate.patch('account/close/')
  }
  const accountDetails = () => {
    return axiosPrivate.get('account/accountdetails/')
  }

  const customerService = {
    login,
    register,
    createaccount,
    deposit,
    withdraw,
    downloadTransaction,
    closeAccount,
    accountDetails,

    
  };
  const staffService ={
    pendinglist,
    approveAccount,
    customerlist,
    updateCustomer,
    transactionHistory,


  }
  const managerService ={
    stafflist,
    updateStaff,

  }
  const generalServices = {
    transactionList,
    
  };


export { customerService,staffService,managerService,generalServices};
  