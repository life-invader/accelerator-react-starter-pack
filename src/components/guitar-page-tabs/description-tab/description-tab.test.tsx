import { render, screen } from '@testing-library/react';
import { createMockGuitar } from '../../../utils/common';
import DescriptionTab from './description-tab';

const mockGuitar = createMockGuitar();

describe('Component: DescriptionTab', () => {
  it('should render DescriptionTab component', () => {
    render(
      <DescriptionTab {...mockGuitar} />,
    );

    expect(screen.getByText(mockGuitar.description)).toBeInTheDocument();
  });
});
