import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';

describe('Header', () => {
  test('renders PokeDex title', () => {
    render(<Header />);
    const title = screen.getByText('PokeDex v.2.1');
    expect(title).toBeInTheDocument();
  });

  test('renders two pokeball images', () => {
    render(<Header />);
    const images = screen.getAllByAltText('pokeball image');
    expect(images).toHaveLength(2);
  });

  test('has the correct background color', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveStyle('background-color: rgb(215 69 38 / var(--tw-bg-opacity)');
  });

  test('the pokeball images have the correct source', () => {
    render(<Header />);
    const images = screen.getAllByAltText('pokeball image');
    expect(images[0]).toHaveAttribute('src', '/assets/pokeball.png');
    expect(images[1]).toHaveAttribute('src', '/assets/pokeball.png');
  });
});