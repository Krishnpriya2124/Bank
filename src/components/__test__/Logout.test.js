import React from 'react';
import { render } from '@testing-library/react';
import Logout from '../Logout';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Logout component', () => {
  let assignMock;

  beforeEach(() => {
    assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('clears local storage and redirects to "/"', () => {
    const clearSpy = jest.spyOn(window.localStorage, 'clear');

    render(<Router><Logout /></Router>);


  });
});
