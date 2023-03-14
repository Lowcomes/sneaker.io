import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link to="/sneaker.io">
        <div className="headerRight">
          <img width={40} height={40} src="/sneaker.io/img/logo.png" alt="" />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerLeft">
        <li className="d-flex" onClick={props.openCart}>
          <img width={18} height={18} src="/sneaker.io/img/Group.svg" alt="" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/sneaker.io/favorites">
            <img
              width={18}
              height={18}
              src="/sneaker.io/img/favorite.svg"
              alt=""
            />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/sneaker.io/img/user.svg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
