import React from "react";
import AppContext from "../../context";
import Card from "../Card";

function Home({
  items,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  AddToCart,
  onAddFavorite,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => AddToCart(obj)}
        onFavorite={(obj) => onAddFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="content-top">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="/sneaker.io/img/Search.svg" alt="Search" />
          {searchValue && (
            <img
              className="searchClear"
              src="/sneaker.io/img/Clear.svg"
              alt="Clear"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
