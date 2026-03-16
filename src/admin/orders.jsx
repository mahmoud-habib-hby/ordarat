import { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Side_admin } from "../components/Saide_admin";
import { Text } from "../context/text";
import axios from "axios";
import { Link } from "react-router-dom";
import { Wait } from "../components/wait";

export function Order_admin() {
  const { token } = useContext(Text);
  const [data, Setdata] = useState([]);
    const [wait,Setwait]=useState(true);
  
  
const search=useRef();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Setdata(res.data);
        Setwait(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
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
      Setdata(e.data)
    }).catch((e)=>{
        console.log(e.response);
      })
}
function handelMoney(id){
  axios.get(`http://127.0.0.1:8000/api/admin/money/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }}).then((e)=>{
          console.log(e);
          window.location.reload();
        }).catch((e)=>{
          console.log(e)
        });
}
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <Wait e={wait} />
      <div className="d-flex gap-4">
        <Side_admin />
        <div className="p-3 w-100" style={{ height: "90vh", overflowY: "auto" }}>
          <h1 className="rounded-2 text-white text-center bg-primary w-100">
            Orders
          </h1>
          <div className="w-100 d-flex justify-content-center mt-4">

        <div class="input-group w-50">
          <input
            type="number"
            class="form-control"
            placeholder="search order_id"
            ref={search}
          />
          <div class="input-group-append">
            <button
              class="input-group-text btn btn-primary rounded-start-0"
              onClick={() => handleSearch()}
            >
              search
            </button>
          </div>
        </div>
          </div>
        
          {/* جدول عرض الطلبات */}
          <table className="table table-striped table-bordered mt-3">
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
                <th>action</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((order) => (
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
                    <td><button disabled={order.payment_status=="settled"} className="btn btn-success p-1" onClick={()=>handelMoney(order.id)}>collect money</button></td>
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
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}