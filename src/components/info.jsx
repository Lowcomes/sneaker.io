import React from "react";
import AppContext from "../context";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="emptyCart">
      <img width={120} src={image} alt="Cart" />
      <h4>{title}</h4>
      <p>{description}</p>
      <button className="btnOrder" onClick={() => setCartOpened(false)}>
        <p>Вернуться назад</p>
        <img src="/sneaker.io/img/left.svg" alt="arrow" className="cartLeft" />
      </button>
    </div>
  );
};

export default Info;
