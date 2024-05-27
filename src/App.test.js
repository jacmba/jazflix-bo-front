import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jazflix logo', async () => {
  render(<App />);
  const logo = await screen.findByAltText('Jazflix logo')
  expect(logo).toBeInTheDocument()
});
