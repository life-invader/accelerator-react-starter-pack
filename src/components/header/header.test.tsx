import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../../store/root-reducer';
import Header from './header';

const mockStore = configureMockStore<RootState>();
const store = mockStore({
  guitars: {
    similarGuitars: [],
  },
  cart: {
    cartAmount: 0,
  },
});

describe('Component: Header', () => {
  it('renders Header component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });

  it('should changes active link after clicking on it', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const navLinks = screen.getAllByTestId('main-nav-links');
    navLinks.forEach((link) => {
      userEvent.click(link);
      expect(link).toHaveClass('link--current');
    });
  });
});
