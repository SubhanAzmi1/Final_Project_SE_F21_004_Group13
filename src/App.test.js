<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders buttons', () => {
  render(<App />);
  const addButton = screen.getByText('Add Artist');
  expect(addButton).toBeInTheDocument();
  const saveButton = screen.getByText('Save');
  expect(saveButton).toBeInTheDocument();
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
=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
>>>>>>> d5e8b864cbfc89d4a8195b07cbe6caee1fa1090a
});
