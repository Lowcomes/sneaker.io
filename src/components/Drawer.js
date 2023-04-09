import axios from "axios";
import React from "react";
import { useCarts } from "../hooks/useCarts";
import Info from "./info";

function Drawer({ closeCart, onRemove, items = [] }) {
  const { cartItems, setCartItems, totlaPrice } = useCarts();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderID, setOrderID] = React.useState(null);
  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        "https://642487869e0a30d92b1e0ed1.mockapi.io/Order",
        { items: cartItems }
      );

      setOrderID(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://63fe597a370fe830d9d2d176.mockapi.io/cart/` + item.id
        );
      }
    } catch (error) {
      alert("Не удалось создать заказ :(");
    }
  };

  return (
    <div className="overlay">
      <div className="wrapperLeft" onClick={closeCart}></div>
      <div className="drawer">
        <h3>
          Корзина
          <img
            className="removeBtn"
            src="/sneaker.io/img/RemoveA.svg"
            alt="Remove"
            onClick={closeCart}
          />
        </h3>
        {items.length !== 0 ? (
          <div className="buyCartItem">
            <div className="item">
              {items.map((obj) => (
                <div className="cartItem" key={obj.id}>
                  <img width={70} height={70} src={obj.img} alt="sneakers" />
                  <div className="cardInfo">
                    <p className="cardName">{obj.title}</p>
                    <p className="value">{obj.price} руб.</p>
                  </div>
                  <img
                    className="removeBtn"
                    src="/sneaker.io/img/RemoveA.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <ul>
              <li>
                <p className="drawerText">Итого: </p>
                <div></div>
                <p className="drawerValue">{totlaPrice} руб. </p>
              </li>
              <li>
                <p className="drawerText">Налог 5%: </p>
                <div></div>
                <p className="drawerValue">
                  {Math.trunc(totlaPrice * 0.05)} руб.{" "}
                </p>
              </li>
            </ul>
            <button className="btnOrder" onClick={onClickOrder}>
              <p>Оформить заказ</p>
              <img
                src="/sneaker.io/img/arrow.svg"
                alt="arrow"
                className="cartRight"
              />
            </button>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен! " : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderID} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "/sneaker.io/img/Order.jpg"
                : "/sneaker.io/img/Cart.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
