import React from "react";
import AppContext from "../../context";
import Card from "../Card";

function Favorites() {
  const { favorites, onAddFavorite } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="content-top">
        <h1>Мои Закладки</h1>
      </div>
      <div className="sneakers">
        {favorites.map((item, index) => (
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
