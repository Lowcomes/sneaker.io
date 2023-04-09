import React from "react";
import AppContext from "../context";

export const useCarts = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totlaPrice = cartItems.reduce((sum, obj) => +obj.price + +sum, 0);

  return { cartItems, setCartItems, totlaPrice };
};
