import {
  render,
  screen,
  cleanup
} from '@testing-library/react'
import App from '@/App'

test('should render list contact', () => {
  render(<App/>);
  const renderListContact = screen.getByTestId('list-contact');
  expect(renderListContact).toBeInTheDocument();
})