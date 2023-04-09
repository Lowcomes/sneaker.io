import React from "react";
import axios from "axios";
import Card from "../Card";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          "https://642487869e0a30d92b1e0ed1.mockapi.io/Order"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      })();
    } catch (error) {
      alert("Ошибка при запросе заказа");
    }
  }, []);
  return (
    <div className="content">
      <div className="content-top">
        <h1>Мои Заказы</h1>
      </div>
      <div className="sneakers">
        {(isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card key={index} {...item} loading={isLoading} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
