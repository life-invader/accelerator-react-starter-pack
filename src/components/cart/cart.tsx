import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { selectCartItems, selectTotalPrice } from '../../store/cart/selectors';
import CartItem from '../cart-item/cart-item';
import { useSelector } from 'react-redux';

function Cart() {
  const totalPrice = useSelector(selectTotalPrice);
  const cartItems = useSelector(selectCartItems);

  const DISCOUNT = 3000;

  return (
    <>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.getMainRoute()}>Главная</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.getCatalogRoute(true)}>Каталог</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.getPlugRoute()}>Корзина</Link>
        </li>
      </ul>

      <div className="cart">

        {
          cartItems &&
          cartItems.map((cartItem, index) => <CartItem key={`${cartItem.item.id + index}`} cartItem={cartItem} />)
        }

        <div className="cart__footer">
          <div className="cart__coupon coupon">
            <h2 className="title title--little coupon__title">Промокод на скидку</h2>
            <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
            <form className="coupon__form" id="coupon-form" method="post" action="/">
              <div className="form-input coupon__input">
                <label className="visually-hidden">Промокод</label>
                <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                <p className="form-input__message form-input__message--success">Промокод принят</p>
              </div>
              <button className="button button--big coupon__button">Применить</button>
            </form>
          </div>
          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Всего:</span>
              <span className="cart__total-value">{totalPrice} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">Скидка:</span>
              <span className="cart__total-value cart__total-value--bonus">- {DISCOUNT} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">К оплате:</span>
              <span className="cart__total-value cart__total-value--payment">{totalPrice - DISCOUNT} ₽</span>
            </p>
            <button className="button button--red button--big cart__order-button">Оформить заказ</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Cart;
