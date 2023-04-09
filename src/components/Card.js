import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../context";

function Card({
  id,
  img,
  title,
  price,
  parantId,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parantId: id, img, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const clickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={200}
          viewBox="0 0 210 200"
          backgroundColor="#9badb5"
          foregroundColor="#d5c8c8"
        >
          <rect x="0" y="0" rx="10" ry="10" width="148" height="112" />
          <rect x="0" y="120" rx="3" ry="3" width="148" height="15" />
          <rect x="0" y="139" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="165" rx="8" ry="8" width="80" height="33" />
          <rect x="115" y="165" rx="8" ry="8" width="33" height="33" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite">
            {onFavorite && (
              <img
                src={
                  isFavorite
                    ? "/sneaker.io/img/like.svg"
                    : "/sneaker.io/img/unlike.svg"
                }
                alt="unlike"
                onClick={clickFavorite}
              />
            )}
          </div>
          <img width={133} height={112} src={img} alt="" />
          <p className="cardName">{title}</p>
          <div className="cradBottom">
            <div>
              <p className="price">Цена:</p>
              <span className="value">{price} руб.</span>
            </div>
            {onPlus && (
              <img
                src={
                  isItemAdded(id)
                    ? "/sneaker.io/img/btn-checked.svg"
                    : "/sneaker.io/img/btn-plus.svg"
                }
                alt="plus"
                className="btn"
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
