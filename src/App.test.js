import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import Home from './components/Home';
import Searcher from './components/Searcher';

test('renders login buttons', () => {
  render(<App />);
  const addButton = screen.getByText('Login');
  expect(addButton).toBeInTheDocument();
  const saveButton = screen.getByText('Logout');
  expect(saveButton).toBeInTheDocument();
});

test('renders welcome signage', () => {
  render(<Home />);
  const welcome = screen.getByText('Marvel Explorer');
  expect(welcome).toBeInTheDocument();
});

test('renders welcome signage', () => {
  render(<Searcher />);
  const searchButton = screen.getByText('Starts-with search');
  expect(searchButton).toBeInTheDocument();
});

test('add artist', () => {
  render(<App />);
  const addButton = screen.getByText('Add Artist');
  const textInput = screen.getByTestId('text_input');
  fireEvent.change(textInput, { target: { value: 'Pinegrove' } });
  fireEvent.click(addButton);

  const artistEntry = screen.getByText('Pinegrove');
  const deleteButton = screen.getByText('Delete');
  expect(artistEntry).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test('delete artist', () => {
  render(<App />);
  const addButton = screen.getByText('Add Artist');
  const textInput = screen.getByTestId('text_input');
  fireEvent.change(textInput, { target: { value: 'Pinegrove' } });
  fireEvent.click(addButton);

  const artistEntry = screen.getByText('Pinegrove');
  const deleteButton = screen.getByText('Delete');
  expect(artistEntry).toBeInTheDocument();

  fireEvent.click(deleteButton);
  expect(artistEntry).not.toBeInTheDocument();
});
