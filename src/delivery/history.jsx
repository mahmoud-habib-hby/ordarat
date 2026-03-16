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
        <Wait e={wait} />
      <div className="d-flex gap-1 bg-light">
        <Side_delivery />
        <div className="container p-4"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <h2 className="mb-4 bg-primary text-white p-1 rounded-2 text-center">History</h2>
          <div className="d-flex flex-wrap w-100 gap-2 container py-3">
          {data.map((order) => (
            <div
              key={order.id}
              className="bg-white p-3 rounded-4 shadow-sm border flex-grow-1"
            >
              <div className="d-flex align-items-center gap-3 justify-content-between mb-2">
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
                    <p className="p-0 m-0 text-black">wait customer click recived</p>
                  )}
                  <p className="fw-bold text-primary fs-6 mb-0">
                    money Status: {order.payment_status}
                  </p>
                </div>
              </div>

              <hr className="my-2" />
              {/* Order Footer */}
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  Time: {new Date(order.created_at).toLocaleString()}
                </p>
                <div className="gap-1 d-flex">
                  {order.website_url && (
                    <Link
                      to={`/details/${order.id}`}
                      className="btn btn-secondary p-1"
                    >
                      details
                    </Link>
                  )}
                  {/* <button disabled={order.status==="delivered"} className="btn btn-primary p-1" onClick={()=>Delivered(order.id)}>Arriveid ?</button>
                    <button disabled={order.payment_status==="collected"} className="btn btn-success p-1" onClick={()=>CollectMoney(order.id)}>takedMoney?</button> */}
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
