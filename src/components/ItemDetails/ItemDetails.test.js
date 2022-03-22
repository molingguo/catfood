import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ItemDetails from './ItemDetails';

describe('<ItemDetails />', () => {
  test('it should mount', () => {
    render(<ItemDetails />);
    
    const itemDetails = screen.getByTestId('ItemDetails');

    expect(itemDetails).toBeInTheDocument();
  });
});