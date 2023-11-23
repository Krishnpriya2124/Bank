import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../App';




describe('App Routing', () => {
  it('renders Home component when path is /', () => {
    render(
      <Router initialEntries={['/']}>
        <App />
      </Router>
    );

  
    // expect(screen.getByText(/Welcome to the Home Page/i)).toBeInTheDocument();
    
  });

  it('renders Login component when path is /login', () => {
    render(
      <Router initialEntries={['/login']}>
        <App />
      </Router>
    );

    
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    
    
  });

  
});
