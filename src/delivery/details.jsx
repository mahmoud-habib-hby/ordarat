import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "../context/text";
import axios from "axios";
import { Side_delivery } from "../components/side_delivery";

export function Details() {
  const { id } = useParams();
  const { token } = useContext(Text);

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://127.0.0.1:8000/api/delivery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrderData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) return <p className="p-4">Loading order details...</p>;
  if (!orderData || orderData.length === 0)
    return <p className="p-4">No products found for this order.</p>;

  const orderInfo = orderData[0];

  return (
    <div className="d-flex">
      <Side_delivery />
      <div className="p-4 w-75">
        <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">
          Order Details (#{orderInfo.order_id})
        </h2>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(orderInfo.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Total Products:</strong> {orderData.length}
        </p>
        <hr />

        <h4 className="mb-3">Products:</h4>

        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.product.image && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                        alt={item.product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="5" className="text-end">
                  Grand Total
                </th>
                <th className="text-success">
                  $
                  {orderData
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}