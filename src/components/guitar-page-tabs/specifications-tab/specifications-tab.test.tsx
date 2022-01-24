import { render, screen } from '@testing-library/react';
import { createMockGuitar } from '../../../utils/common';
import SpecificationsTab from './specifications-tab';

const mockGuitar = createMockGuitar();

describe('Component: SpecificationsTab', () => {
  it('should render SpecificationsTab component', () => {
    render(
      <SpecificationsTab {...mockGuitar} />,
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText(mockGuitar.vendorCode)).toBeInTheDocument();
  });
});
