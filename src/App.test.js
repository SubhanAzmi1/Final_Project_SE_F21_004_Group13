import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Searcher from './components/Searcher';

test('renders login button', () => {
  render(<Login />);
  const saveButton = screen.getByText('Login');
  expect(saveButton).toBeInTheDocument();
});

test('renders logout button', () => {
  render(<Logout />);
  const saveButton = screen.getByText('Logout');
  expect(saveButton).toBeInTheDocument();
});

test('renders welcome signage', () => {
  const userName1 = 'blas';
  const id1 = '01';
  render(<Home userName={userName1} userIdH={id1} />);
  const welcome = screen.getByText('Enter a character or comic name here!');
  expect(welcome).toBeInTheDocument();
});

test('renders button text in seracher', () => {
  render(<Searcher />);
  const searchButton = screen.getByTestId('sw_search_button');
  expect(searchButton).toBeInTheDocument();
});

test('textbox change to empty after button click.', () => {
  render(<Home />);
  const searchButton = screen.getByTestId('sw_search_button');
  const textInput = screen.getByTestId('text_input');
  fireEvent.change(textInput, { target: { value: 'venom' } });
  fireEvent.click(searchButton);

  const textValueAfterButtonPress = screen.getByTestId('text_input');
  expect(textValueAfterButtonPress).toBeEmptyDOMElement();
});
