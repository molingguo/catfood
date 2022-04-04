import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ItemList from './ItemList';

describe('<ItemList />', () => {
  test('it should mount', () => {
    render(<ItemList />);

    const ItemList = screen.getByTestId('ItemList');

    expect(ItemList).toBeInTheDocument();
  });
});