import { useParams } from "react-router-dom";
import { Footer } from "../components/footer";
import { Side_admin } from "../components/Saide_admin";
import { useContext, useEffect, useState } from "react";
import { Text } from "../context/text";
import axios from "axios";
import { Wait } from "../components/wait";

export function OrderDetails_admin() {
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
    <div className="bg-light" style={{ height: "100vh" }}>
      <Wait e={loading}/>
      <div className="d-flex" style={{ height: "90vh" }}>
        <Side_admin />
        <div className="p-4 w-100" style={{ overflowY: "auto" }}>
          <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">
            Order Details #{orderInfo.order_id}
          </h2>
          <p><strong>Created At:</strong> {new Date(orderInfo.created_at).toLocaleString()}</p>

          <hr />

          <h4 className="mb-3">Products:</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
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
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
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
            </table>
          </div>

          <div className="mt-3 p-3 rounded-3 shadow-sm d-flex justify-content-between align-items-center" style={{ backgroundColor: "#e9f7ef" }}>
            <p className="mb-0 fw-bold">Grand Total</p>
            <p className="mb-0 fw-bold text-success">
              ${orderData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}