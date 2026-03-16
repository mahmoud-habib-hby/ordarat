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
const search=useRef();

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // فلترة الطلبات حسب delivery_id
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
function handleSearch(){
  axios.get("http://127.0.0.1:8000/api/admin/search/order",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
       params: {
        search: search.current.value,
      },
      }).then((e)=>{
      console.log(e);
      setOrders(e.data)
    }).catch((e)=>{
        console.log(e.response);
      })
}


  return (
    <div className="bg-light" style={{ height: "100vh" }}>
        <Wait e={loading}/>
      <div className="d-flex" style={{ height: "90vh" }}>
        <Side_admin />
        <div className="container p-4" style={{ overflowY: "auto" }}>
          <h2 className="mb-4 bg-primary text-white p-2 rounded-2 text-center">
            Orders for Delivery #{id}
          </h2>

          <div className="table-responsive">
                    <div className="w-100 d-flex justify-content-center mt-4">

        <div class="input-group w-50">
          <input
            type="number"
            class="form-control"
            placeholder="search order_id"
            ref={search}
          />
          <div class="input-group-append">
            <span
              class="input-group-text btn btn-primary rounded-start-0"
              onClick={() => handleSearch()}
            >
              search
            </span>
          </div>
        </div>
          </div>
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
                        
                        {order.payment_status=="settled"&&<p className="bg-success text-white bg-opacity-75 text-center p-1" style={{borderLeft:"5px solid  green"}} >{order.payment_status}</p>}
                        {order.payment_status=="collected"&&<p className="alert alert-primary text-center p-1 rounded-2">{order.payment_status}</p>}
                         {order.payment_status=="unpaid"&&<p className="alert alert-danger p-1 text-center">{order.payment_status}</p>}
                        </td>
                    <td>{order.phone ?? "-"}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td><button disabled={order.payment_status=="settled"} className="btn btn-success p-1">collect money</button></td>
                    <td><Link to={`/orderDetails_admin/${order.id}`} className="btn btn-dark">items</Link></td>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}