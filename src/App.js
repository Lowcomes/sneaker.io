import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import cardItemsData from "./components/Data";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    setItems(cardItemsData);
    axios
      .get(`https://63fe597a370fe830d9d2d176.mockapi.io/cart/`)
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get(`https://63fe597a370fe830d9d2d176.mockapi.io/favorite/`)
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onRemoveItem = (id) => {
    axios.delete(`https://63fe597a370fe830d9d2d176.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToCart = async (obj) => {
    try {
      console.log(cartItems);
      if (cartItems.find((item) => +item.id === +obj.id)) {
        setCartItems((prev) => prev.filter((item) => +item.id !== +obj.id));
        axios.delete(
          `https://63fe597a370fe830d9d2d176.mockapi.io/cart/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63fe597a370fe830d9d2d176.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в покупки");
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        console.log(
          setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
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

  return (
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
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              AddToCart={onAddToCart}
              onAddFavorite={onAddFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddFavorite={onAddFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
