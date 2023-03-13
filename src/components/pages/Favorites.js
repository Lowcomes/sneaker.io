import Card from "../Card";

function Favorites({ items, onAddFavorite }) {
  return (
    <div className="content">
      <div className="content-top">
        <h1>Мои Закладки</h1>
      </div>
      <div className="sneakers">
        {items.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
