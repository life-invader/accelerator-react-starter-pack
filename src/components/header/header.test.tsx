import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { State } from '../../store/type';
import Header from './header';

const mockStore = configureMockStore<State>();
const store = mockStore({
  guitars: {
    cart: 0,
    similarGuitars: [],
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
