import { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Text } from "../context/text";
import { Side_admin } from "../components/Saide_admin";
import { Footer } from "../components/footer";
import { Wait } from "../components/wait";

export function Delivery_details() {
  const { token } = useContext(Text);
  const { id } = useParams(); // delivery id
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useRef();

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filtered = res.data.filter(
          (order) => order.delivery_id === Number(id)
        );
        setOrders(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token, id]);

  function handleSearch() {
    axios
      .get("http://127.0.0.1:8000/api/admin/search/order", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: search.current.value },
      })
      .then((e) => {
        setOrders(e.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <Wait e={loading} />
      <div className="d-flex" style={{ height: "90vh" }}>
        <Side_admin />
        <div className="p-4 w-100" style={{ overflowY: "auto" }}>
          <h2 className="mb-4 bg-primary text-white p-2 rounded-2 text-center">
            Orders for Delivery #{id}
          </h2>

          <div className="w-100 d-flex justify-content-center mt-4">
            <div className="input-group w-50">
              <input
                type="number"
                className="form-control"
                placeholder="search order_id"
                ref={search}
              />
              <button
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Delivery ID</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Collect</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer_id}</td>
                      <td>{order.delivery_id ?? "-"}</td>
                      <td>{order.total_price}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.payment_status === "settled" && (
                          <p
                            className="bg-success text-white bg-opacity-75 text-center p-1"
                            style={{ borderLeft: "5px solid green" }}
                          >
                            {order.payment_status}
                          </p>
                        )}
                        {order.payment_status === "collected" && (
                          <p className="alert alert-primary text-center p-1 rounded-2">
                            {order.payment_status}
                          </p>
                        )}
                        {order.payment_status === "unpaid" && (
                          <p className="alert alert-danger p-1 text-center">
                            {order.payment_status}
                          </p>
                        )}
                      </td>
                      <td>{order.phone ?? "-"}</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                      <td>
                        <button
                          disabled={order.payment_status === "settled"}
                          className="btn btn-success p-1"
                        >
                          Collect Money
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/orderDetails_admin/${order.id}`}
                          className="btn btn-dark"
                        >
                          Items
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}