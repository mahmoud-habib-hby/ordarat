import { Moped } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Side_delivery } from "../components/side_delivery";
import { Footer } from "../components/footer";
import { Text } from "../context/text";
import { Link } from "react-router-dom";
import { Wait } from "../components/wait";

export function Home_delivery() {
  const { token } = useContext(Text);
  const [data, setData] = useState([]);
    const [wait,Setwait]=useState(true);
  
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/delivery", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data)
        Setwait(false);  
      })
      .catch((err) => console.error(err));
  }, [token]);
function handelOrder(id){
  axios.get(`http://127.0.0.1:8000/api/delivery/add/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(()=>{
        Setwait(false);
        window.location.reload();
      }).catch((e)=>{
        console.log(e)
      })
}
  return (
    <div className="d-flex flex-column">
      <Wait e={wait} />
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Side_delivery />

        {/* Main Content */}
        <div
          className="flex-grow-1 p-4"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">All Orders</h2>

          <div className="d-flex flex-column gap-3">
            {data.length === 0 && (
              <p className="text-center text-muted">No orders available.</p>
            )}

            {data.map((order) => (
              <div
                key={order.id}
                className="bg-white p-3 rounded-4 shadow-sm border"
              >
                {/* Order Header */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <Moped className="text-white rounded-circle fs-1 bg-primary p-2" />
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
                  <p className="fw-bold text-primary fs-5 mb-0">
                    Price: {order.total_price}
                  </p>
                </div>

                <hr className="my-2" />

                {/* Order Footer */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    Time: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <div>
                    {order.website_url && (
                      <Link
                        to={`/details/${order.id}`}
                        className="btn btn-success p-1 mx-3"
                      >
                        View details
                      </Link>
                    )}
                    <button className="btn btn-primary" onClick={()=>handelOrder(order.id)}>Take Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
