
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header with title', () => {
  render(<Header title="My Title" />);
  const titleElement = screen.getByText(/My Title/i);
  expect(titleElement).toBeInTheDocument();
});
