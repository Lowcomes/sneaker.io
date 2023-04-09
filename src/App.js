import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import AppContext from "./context";
import Orders from "./components/pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponce = await axios.get(
          `https://63fe597a370fe830d9d2d176.mockapi.io/cart/`
        );
        const favoriteResponce = await axios.get(
          `https://63fe597a370fe830d9d2d176.mockapi.io/favorite/`
        );
        const cartItemsResponce = await axios.get(
          `https://642487869e0a30d92b1e0ed1.mockapi.io/items/`
        );

        setIsLoading(false);
        setCartItems(cartResponce.data);
        setFavorites(favoriteResponce.data);
        setItems(cartItemsResponce.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://63fe597a370fe830d9d2d176.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => +item.id !== +id));
    } catch (error) {
      alert("ошибка при удалении ");
    }
  };

  const onAddToCart = async (obj) => {
    try {
      const findItems = cartItems.find((item) => +item.parantId === +obj.id);
      if (findItems) {
        setCartItems((prev) =>
          prev.filter((item) => +item.parantId !== +obj.id)
        );
        axios.delete(
          `https://63fe597a370fe830d9d2d176.mockapi.io/cart/${findItems.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://63fe597a370fe830d9d2d176.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parantId === data.parantId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не удалось добавить в покупки");
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => +favObj.id === +obj.id)) {
        setFavorites((prev) => prev.filter((item) => +item.id !== +obj.id));
        axios.delete(
          `https://63fe597a370fe830d9d2d176.mockapi.io/favorite/${obj.id}`
        );
      } else {
        console.log(obj);
        const { data } = await axios.post(
          "https://63fe597a370fe830d9d2d176.mockapi.io/favorite",
          obj
        );
        console.log(data);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в Избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => +obj.parantId === +id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper">
        {cartOpened && (
          <Drawer
            items={cartItems}
            closeCart={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header openCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/sneaker.io"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                AddToCart={onAddToCart}
                onAddFavorite={onAddFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/sneaker.io/favorites" element={<Favorites />} />
          <Route path="/sneaker.io/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
