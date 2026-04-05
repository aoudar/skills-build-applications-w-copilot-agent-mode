import { render, screen } from '@testing-library/react';
import App from './App';

test('renders OctoFit Tracker navigation', () => {
  render(<App />);
  const navBrand = screen.getByText(/OctoFit Tracker/i);
  expect(navBrand).toBeInTheDocument();
});

test('renders Activities navigation link', () => {
  render(<App />);
  const activitiesLink = screen.getByText(/Activities/i);
  expect(activitiesLink).toBeInTheDocument();
});
