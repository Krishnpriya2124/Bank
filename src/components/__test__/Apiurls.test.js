import { customerService,staffService,managerService,generalServices } from "../apiUrls";
import { axiosPrivate } from "../Interceptor";
  
  
jest.mock('../Interceptor');
  
  describe('Service functions', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    it('should call axiosPrivate.post for login', () => {
      const data = { username: 'user', password: 'pass' };
      customerService.login(data);
      expect(axiosPrivate.post).toHaveBeenCalledWith('api/login/', data);
    });

    it('should call axiosPrivate.post for signup', () => {
        const data = { username: 'user', password: 'pass',usertype:'customer',first_name:'anu',last_name:'k',email:'anu@gmail.com' };
        customerService.register(data);
        expect(axiosPrivate.post).toHaveBeenCalledWith('api/register/', data);
      });

      it('should call axiosPrivate.get for stafflist', () => {
      
        managerService.stafflist();
        expect(axiosPrivate.get).toHaveBeenCalledWith('stafflist/');
      });

      it('should call axiosPrivate.get for customerlist', () => {
      
        staffService.customerlist();
        expect(axiosPrivate.get).toHaveBeenCalledWith('customerlist/');
      });


      it('should call axiosPrivate.get for pendinglist', () => {
      
        staffService.pendinglist();
        expect(axiosPrivate.get).toHaveBeenCalledWith('account/pendinglist/');
      });

      it('should call axiosPrivate.get for transactionlist', () => {
      
        generalServices.transactionList();
        expect(axiosPrivate.get).toHaveBeenCalledWith('transaction/transactions/');
      });


      it('should call axiosPrivate.path for closeaccount', () => {
      
        customerService.closeAccount();
        expect(axiosPrivate.patch).toHaveBeenCalledWith('account/close/');
      });

    });

    
    
    
  
  
  
  