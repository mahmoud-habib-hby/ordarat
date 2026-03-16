import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Side_admin } from "../components/Saide_admin";
import { Footer } from "../components/footer";
import { Text } from "../context/text";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef();

  const { token } = useContext(Text);

  // جلب الأوردرات
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://127.0.0.1:8000/api/customer/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  // جلب كل الدليفري
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://127.0.0.1:8000/api/admin/deliveries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDeliveries(res.data))
      .catch((err) => console.log(err.response))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSearch = () => {
    const value = searchRef.current.value;
    if (!value) return;
    const result = selectedDelivery
      ? orders.filter(
          (o) => o.id === Number(value) && o.delivery_id === selectedDelivery.id
        )
      : orders.filter((o) => o.id === Number(value));
    setOrders(result);
  };

  if (loading) return <p className="p-4">Loading data...</p>;

  // Chart عام للأوردرات
  const generalChartData = {
    labels: ["assigned", "delivered", "received", "canceled"],
    datasets: [
      {
        label: "Orders Count",
        data: [
          orders.filter((o) => o.status === "assigned").length,
          orders.filter((o) => o.status === "delivered").length,
          orders.filter((o) => o.status === "received").length,
          orders.filter((o) => o.status === "canceled").length,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Orders by Status" },
    },
  };

  // Chart لكل دليفري مختار
  const filteredOrders = selectedDelivery
    ? orders.filter((o) => o.delivery_id === selectedDelivery.id)
    : [];

  const deliveryChartData = selectedDelivery
    ? {
        labels: ["assigned", "delivered", "received", "canceled"],
        datasets: [
          {
            label: "Orders Count",
            data: [
              filteredOrders.filter((o) => o.status === "assigned").length,
              filteredOrders.filter((o) => o.status === "delivered").length,
              filteredOrders.filter((o) => o.status === "received").length,
              filteredOrders.filter((o) => o.status === "canceled").length,
            ],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      }
    : null;

  // أكثر 5 دليفري حسب عدد الأوردرات
  const topDeliveries = deliveries
    .map((d) => {
      const count = orders.filter((o) => o.delivery_id === d.id).length;
      return { ...d, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <div className="d-flex">
        <Side_admin />
        <div className="container p-4" style={{height:"90vh",overflowY:"auto"}}>
          <h2 className="text-center mb-4 bg-primary text-white p-2 rounded">
            Delivery Dashboard
          </h2>

          {/* إحصائيات */}
          <div className="d-flex justify-content-between mb-4">
            <div className="card p-3 text-center flex-fill mx-2">
              <h5>Total Orders</h5>
              <p>{orders.length}</p>
            </div>
            <div className="card p-3 text-center flex-fill mx-2">
              <h5>Total Revenue</h5>
              <p>${orders.reduce((sum, o) => sum + Number(o.total_price), 0)}</p>
            </div>
          </div>

          {/* Chart عام للأوردرات */}
          <div className="mb-4">
            <Bar data={generalChartData} options={chartOptions} />
          </div>

          {/* جدول أكثر 5 دليفري طلبات */}
          <h4>Top 5 Deliveries by Orders</h4>
          <table className="table table-bordered table-striped mb-5">
            <thead className="table-dark">
              <tr>
                <th>Delivery Name</th>
                <th>Email</th>
                <th>Orders Count</th>
              </tr>
            </thead>
            <tbody>
              {topDeliveries.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.count}</td>
                </tr>
              ))}
              {topDeliveries.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No deliveries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* جدول الأوردرات للدليفري مختار */}
          {selectedDelivery && (
            <div className="mt-5">
              <h4>Orders for {selectedDelivery.name}</h4>

              {/* Chart لكل دليفري */}
              <div className="mb-4">
                <Bar data={deliveryChartData} options={chartOptions} />
              </div>

              <div className="input-group mb-3 w-50">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Search Order ID"
                  ref={searchRef}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>

              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Customer ID</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.customer_id}</td>
                      <td>${o.total_price}</td>
                      <td>{o.status}</td>
                      <td>{o.payment_status}</td>
                      <td>{o.phone}</td>
                      <td>{new Date(o.created_at).toLocaleString()}</td>
                      <td>
                        <button
                          disabled={o.payment_status === "collected"}
                          className="btn btn-success btn-sm"
                        >
                          Collect Money
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/orderDetails_admin/${o.id}`}
                          className="btn btn-dark btn-sm"
                        >
                          Items
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}