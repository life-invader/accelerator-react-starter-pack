import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MAX_ITEM_AMOUNT, MIN_ITEM_AMOUNT } from '../../constants/cart';
import { GuitarInfo } from '../../constants/guitars';
import { changeItemAmount, decreaseItemAmount, increaseItemAmount, removeFromCart } from '../../store/cart/actions';
import { ICartItem } from '../../store/cart/cart-reducer';
import { formatGuitarPrice } from '../../utils/common';
import ModalDeleteItem from '../modal-delete-item/modal-delete-item';

enum ChangeAmountType {
  Increment = 'inc',
  Decrement = 'dec',
}

type CaryItemType = {
  cartItem: ICartItem,
}

function CartItem({ cartItem }: CaryItemType) {
  const dispatch = useDispatch();

  const { itemAmount, item } = cartItem; // Количество товара в корзине и сам товар
  const { name, price, vendorCode, stringCount, previewImg, id, type } = item; // Инфа товара для отображения

  const [isModalDeleteItemOpened, setIsModalDeleteItemOpened] = useState(false);
  const [amount, setAmount] = useState(itemAmount);

  const removeItemFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const removeItemButtonClickHandler = () => {
    setIsModalDeleteItemOpened(true);
  };

  const changeItemAmountButtonClickHandler = (evt: React.BaseSyntheticEvent) => {
    if (evt.currentTarget.dataset.change === ChangeAmountType.Decrement) {
      if (amount === 1) {
        setIsModalDeleteItemOpened(true);
        return;
      }

      dispatch(decreaseItemAmount(id));
    }

    if (evt.currentTarget.dataset.change === ChangeAmountType.Increment) {
      dispatch(increaseItemAmount(id));
    }
  };

  const changeItemAmountBlurHandler = () => {
    if (amount < MIN_ITEM_AMOUNT) {
      setAmount(MIN_ITEM_AMOUNT);
    }

    if (amount > MAX_ITEM_AMOUNT) {
      setAmount(MAX_ITEM_AMOUNT);
    }

    dispatch(changeItemAmount({ newAmount: amount, id }));
  };

  const itemAmountChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(evt.target.value);
    setAmount(newAmount);
  };

  useEffect(() => {
    setAmount(itemAmount);
  }, [cartItem, itemAmount]);


  return (
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={removeItemButtonClickHandler}>
          <span className="button-cross__icon"></span>
          <span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image">
          <img src={`/${previewImg}`} width="55" height="130" alt="ЭлектроГитара Честер bass" />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{name}</p>
          <p className="product-info__info">Артикул: {vendorCode}</p>
          <p className="product-info__info">{GuitarInfo[type].nameForOne}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{formatGuitarPrice(price)} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" data-change={ChangeAmountType.Decrement} onClick={changeItemAmountButtonClickHandler}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input className="quantity__input" type="number" placeholder={itemAmount.toString()} value={amount} id="2-count" name="2-count" min={MIN_ITEM_AMOUNT} max={MAX_ITEM_AMOUNT} onChange={itemAmountChangeHandler} onBlur={changeItemAmountBlurHandler} />
          <button className="quantity__button" aria-label="Увеличить количество" data-change={ChangeAmountType.Increment} onClick={changeItemAmountButtonClickHandler}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{formatGuitarPrice(price * itemAmount)} ₽</div>
      </div>

      {
        isModalDeleteItemOpened &&
        <ModalDeleteItem cartItem={item} onModalOpen={setIsModalDeleteItemOpened} onRemoveItem={removeItemFromCart} />
      }

    </>
  );
}

export default CartItem;
