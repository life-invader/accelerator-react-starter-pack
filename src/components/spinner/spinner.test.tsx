import { render, screen } from '@testing-library/react';

import Spinner from './spinner';

describe('Component: Spinner', () => {
  test('renders Spinner component', () => {
    render(<Spinner />);

    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });
});
