import { useContext, useEffect, useState } from "react";
import { Side_delivery } from "../components/side_delivery";
import { Text } from "../context/text";
import axios from "axios";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import { Wait } from "../components/wait";

export function Work() {
  const { token } = useContext(Text);
  const [data, SetData] = useState([]);
  const [wait, Setwait] = useState(true);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/delivery/work", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        console.log(e);
        SetData(e.data);
        Setwait(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  function Delivered(id) {
    axios
      .get(`http://127.0.0.1:8000/api/delivery/delivered/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function CollectMoney(id) {
    axios
      .get(`http://127.0.0.1:8000/api/delivery/money/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        SetData(e.data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="d-flex flex-column bg-light">
      <div className="d-flex">
        <Side_delivery />
        <div
          className="w-100 position-relative p-3"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
      <Wait e={wait} />
          <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">Order Now</h2>
          <div className="d-flex flex-column gap-3">
            {data.map((order) => (
              <div
                key={order.id}
                className="bg-white p-3 rounded-4 shadow-sm border"
              >
                {/* Order Header */}
                <div className="cart d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <p className="mb-1 fw-bold text-uppercase">
                        Order #: {order.id}
                      </p>
                      <p className="mb-1 fw-bold text-uppercase">
                        Customer ID #: {order.customer_id}
                      </p>
                      <p className="mb-1 fw-bold text-uppercase">
                        Address: {order.address}
                      </p>
                      <p className="mb-1 fw-bold text-uppercase">
                        location: <a href={order.website_url}>location</a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="fw-bold  fs-6 mb-0">
                      Price: {order.total_price}
                    </p>
                    <p className="fw-bold text-danger fs-6 mb-0">
                      Order Status: {order.status}
                      <br />
                    </p>
                    {order.status == "delivered" && (
                      <p className="text-black">
                        "wait customer click recived"
                      </p>
                    )}
                    <p className="fw-bold text-primary fs-6 mb-0">
                      money Status: {order.payment_status}
                    </p>
                  </div>
                </div>

                <hr className="my-2" />
                {/* Order Footer */}
                <div className="cart d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    Time: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <div className="cart gap-1 d-flex">
                    {order.website_url && (
                      <Link
                        to={`/details/${order.id}`}
                        className="btn btn-secondary p-1"
                      >
                        details
                      </Link>
                    )}
                    <button
                      disabled={order.status === "delivered"}
                      className="btn btn-primary p-1"
                      onClick={() => Delivered(order.id)}
                    >
                      Arriveid ?
                    </button>
                    <button
                      disabled={order.payment_status === "collected"}
                      className="btn btn-success p-1"
                      onClick={() => CollectMoney(order.id)}
                    >
                      takedMoney?
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
