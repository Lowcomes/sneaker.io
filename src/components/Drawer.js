function Drawer({ closeCart, onRemove, items = [] }) {
  return (
    <div className="overlay">
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
                <p className="drawerValue">21 498 руб. </p>
              </li>
              <li>
                <p className="drawerText">Налог 5%: </p>
                <div></div>
                <p className="drawerValue">1074 руб. </p>
              </li>
            </ul>
            <button className="btnOrder">
              <p>Оформить заказ</p>
              <img
                src="/sneaker.io/img/arrow.svg"
                alt="arrow"
                className="cartRight"
              />
            </button>
          </div>
        ) : (
          <div className="emptyCart">
            <img
              width={120}
              height={120}
              src="/sneaker.io/img/Cart.png"
              alt="Cart"
            />
            <h4>Корзина пустая</h4>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button className="btnOrder">
              <p onClick={closeCart}>Вернуться назад</p>
              <img
                src="/sneaker.io/img/left.svg"
                alt="arrow"
                className="cartLeft"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
