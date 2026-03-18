import { useContext, useEffect, useState } from "react";
import { Text } from "../context/text";
import axios from "axios";
import { Side_delivery } from "../components/side_delivery";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import { Wait } from "../components/wait";

export function History() {
  const { token } = useContext(Text);
  const [data, SetData] = useState([]);
      const [wait,Setwait]=useState(true);
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/delivery/past", {
        headers: { Authorization: `Bearer ${token}` },
      })
.then((e) => {
  console.log(e);
  Setwait(false)
  const sorted = e.data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  SetData(sorted);
})
      .catch((e) => {
        console.log(e);
      });
  }, [token]);
  return (
    <div>
      <div className="d-flex gap-1 bg-light m-0 p-0">
        <Side_delivery />
        <div className="w-100 position-relative p-1 py-lg-3"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
        <Wait e={wait} />
          <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">History</h2>
<div className="py-1 py-lg-3">
  <div className="table-responsive">
    <table className="table table-bordered table-hover text-center align-middle">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Location</th>
          <th>Price</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Time</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.customer_id}</td>

              <td>{order.address}</td>

              <td>
                {order.website_url ? (
                  <a href={order.website_url} target="_blank">
                    map
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="fw-bold text-primary">
                ${order.total_price}
              </td>

              <td>
                <span
                  className={`badge ${
                    order.status === "delivered"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status}
                </span>

                {order.status === "delivered" && (
                  <div className="small text-muted">
                    waiting confirm
                  </div>
                )}
              </td>

              <td>
                <span
                  className={`badge ${
                    order.payment_status === "collected"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {order.payment_status}
                </span>
              </td>

              <td>
                {new Date(order.created_at).toLocaleString()}
              </td>

              <td>
                <Link
                  to={`/details/${order.id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-muted">
              No Orders Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
