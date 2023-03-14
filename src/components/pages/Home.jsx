import Card from "../Card";

function Home({
  items,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  AddToCart,
  onAddFavorite,
}) {
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
      <div className="sneakers">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.id}
              item={item}
              onPlus={(obj) => AddToCart(obj)}
              onFavorite={(obj) => onAddFavorite(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
