import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api } from '../../api/api';
import ModalComment from './modal-comment';
import { createMockGuitar } from '../../utils/common';
import userEvent from '@testing-library/user-event';
import { RootState } from '../../store/root-reducer';

const mockStore = configureMockStore<RootState>([thunk.withExtraArgument(api)]);
const store = mockStore();
store.dispatch = jest.fn();

const handleModalClose = jest.fn();
const mockGuitar = createMockGuitar();


describe('Component: ModalComment', () => {
  it('should render ModalComment component', () => {
    render(
      <Provider store={store}>
        <ModalComment onModalClose={handleModalClose} guitarName={mockGuitar.name} guitarId={mockGuitar.id} />
      </Provider>,
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('Ваша Оценка')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('input-name'), 'user-name');
    expect(screen.getByDisplayValue('user-name')).toBeInTheDocument();
  });
});
