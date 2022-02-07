import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { selectCartItems, selectDiscount, selectTotalPrice } from '../../store/cart/selectors';
import CartItem from '../cart-item/cart-item';
import { useSelector } from 'react-redux';
import { formatGuitarPrice } from '../../utils/common';
import React, { useEffect, useState } from 'react';
import { applyPromo } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { DiscountStatus } from '../../constants/cart';

const DISCOUNT_PLUG = 0;
const PERCENT = 100;

function Cart() {
  const dispatch = useAppDispatch();
  const totalPrice = useSelector(selectTotalPrice);
  const cartItems = useSelector(selectCartItems);
  const discount = useSelector(selectDiscount); // Размер скидки в процентах (с сервака приходит)

  const [promo, setPromo] = useState(''); // Промокод из инпута / ввод пользователя
  const [discountMonetary, setDiscountMonetary] = useState(0); // Размер скидки в рублях
  const [isPromoAccepted, setIsPromoAccepted] = useState(false); // Промокод принят
  const [discountError, setDiscountError] = useState(false); // Промокод недействителен

  const applyPromoClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (!promo) {
      return;
    }

    dispatch(applyPromo(promo))
      .then((status) => {
        if (status === DiscountStatus.Success) {
          setIsPromoAccepted(true);
          setDiscountError(false);
        }

        if (status === DiscountStatus.Failure) {
          setIsPromoAccepted(false);
          setDiscountError(true);
        }
      });
  };

  // Эффект считает размер скидки в рублях
  useEffect(() => {
    setDiscountMonetary(totalPrice * discount / PERCENT);
  }, [discount, totalPrice]);

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
                <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" value={promo} onChange={(evt) => setPromo(evt.target.value.replaceAll(' ', ''))} />

                {
                  (isPromoAccepted && !discountError) && <p className="form-input__message form-input__message--success">Промокод принят</p>
                }

                {
                  discountError && <p className="form-input__message form-input__message--error">Неверный промокод</p>
                }

              </div>
              <button className="button button--big coupon__button" onClick={applyPromoClickHandler}>Применить</button>
            </form>

          </div>
          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Всего:</span>
              <span className="cart__total-value">{formatGuitarPrice(totalPrice)} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">Скидка:</span>

              {
                (Boolean(!discount) || Boolean(!totalPrice)) && <span className="cart__total-value">{formatGuitarPrice(DISCOUNT_PLUG)} ₽</span>
              }

              {
                (Boolean(discount) && Boolean(totalPrice)) && <span className="cart__total-value cart__total-value--bonus">- {formatGuitarPrice(discountMonetary)} ₽</span>
              }

            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">К оплате:</span>
              <span className="cart__total-value cart__total-value--payment">{formatGuitarPrice(totalPrice - discountMonetary)} ₽</span>
            </p>
            <button className="button button--red button--big cart__order-button">Оформить заказ</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Cart;
