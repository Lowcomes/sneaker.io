import React from "react";

function Card({ item, onPlus, onFavorite, favorited = false }) {
  const [isAded, setIsAded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus(item);
    setIsAded(!isAded);
  };
  const clickFavorite = () => {
    onFavorite(item);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="favorite">
        <img
          src={
            isFavorite
              ? "/sneaker.io/img/like.svg"
              : "/sneaker.io/img/unlike.svg"
          }
          alt="unlike"
          onClick={clickFavorite}
        />
      </div>
      <img width={133} height={112} src={item.img} alt="" />
      <p className="cardName">{item.title}</p>
      <div className="cradBottom">
        <div>
          <p className="price">Цена:</p>
          <span className="value">{item.price} руб.</span>
        </div>
        <img
          src={
            isAded
              ? "/sneaker.io/img/btn-checked.svg"
              : "/sneaker.io/img/btn-plus.svg"
          }
          alt="plus"
          className="btn"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
}

export default Card;
