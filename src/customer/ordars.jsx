import { useContext, useEffect, useState } from "react";
import { Nav_Customer } from "../components/nav_customer";
import axios from "axios";
import { Text } from "../context/text";
import { CheckCircleOutline, Moped } from "@mui/icons-material";
import { Footer } from "../components/footer";
import { Wait } from "../components/wait";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(Text);
  const [wait,Setwait]=useState(true);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/customer/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
.then((e) => {
  console.log(e);
  Setwait(false);
  const sorted = e.data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  setOrders(sorted);
})
      .catch((e) => {
        console.log(e);
      });
  }, [token]);
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Wait e={wait} />
      <Nav_Customer />
      <div className="container">
        <h1>Orders</h1>
        <div className="d-flex flex-column gap-2 align-items-center w-100">
          {orders.map((e) => {
            return (
              <div
                key={e.id}
                className=" d-flex gap-3 justify-content-between w-100 container bg-white rounded-4 p-3"
              >
                <div className="w-100 d-flex flex-column align-items-start">
                  <h3>order :#{e.id}</h3>

                  {e.status == "pending" && (
                    <>
                      <p>{e.status}</p>

                      <div className="d-flex align-items-center p-2 gap-2">
                        <CheckCircleOutline />
                        <p className="m-0">wait to delivry</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div className="d-flex align-items-center p-2 gap-2 ">
                        <Moped />
                        <p className="m-0">delivried</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div className="d-flex align-items-center p-2 gap-2 ">
                        <CheckCircleOutline />
                        <p className="m-0">you take an order</p>
                      </div>
                    </>
                  )}
                  {e.status == "assigned" && (
                    <>
                      <p>{e.status}</p>
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-success rounded-0"
                        style={{
                          borderLeft: "4px green solid",
                          width: "fit-content",
                        }}
                      >
                        <CheckCircleOutline className="text-white bg-success rounded-circle" />
                        <p className="m-0">wait to delivry</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div className="d-flex align-items-center p-2 gap-2 ">
                        <Moped />
                        <p className="m-0">delivried</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div className="d-flex align-items-center p-2 gap-2 ">
                        <CheckCircleOutline />
                        <p className="m-0">you take an order</p>
                      </div>
                    </>
                  )}
                  {e.status == "delivered" && (
                    <>
                      <p>{e.status}</p>
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-success rounded-0"
                        style={{
                          borderLeft: "4px green solid",
                          width: "fit-content",
                        }}
                      >
                        <CheckCircleOutline className="text-white bg-success rounded-circle" />
                        <p className="m-0">wait to delivry</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-primary rounded-0"
                        style={{
                          borderLeft: "4px blue solid",
                          width: "fit-content",
                        }}
                      >
                        <Moped className="text-white bg-primary rounded-circle" />
                        <p className="m-0">delivried</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-3 opacity-75"
                      />
                      <div className="d-flex align-items-center p-2 gap-2 ">
                        <CheckCircleOutline />
                        <p className="m-0">you take an order</p>
                      </div>
                      <button className="btn btn-primary my-3">
                        order was taked
                      </button>
                    </>
                  )}
                  {e.status == "received" && (
                    <>
                      <p>{e.status}</p>
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-success rounded-0"
                        style={{
                          borderLeft: "4px green solid",
                          width: "fit-content",
                        }}
                      >
                        <CheckCircleOutline className="text-white bg-success rounded-circle" />
                        <p className="m-0">wait to delivry</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-4 opacity-75"
                      />
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-primary rounded-0"
                        style={{
                          borderLeft: "4px blue solid",
                          width: "fit-content",
                        }}
                      >
                        <Moped className="text-white bg-primary rounded-circle" />
                        <p className="m-0">delivried</p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          background: "blue",
                        }}
                        className="mx-4 opacity-75"
                      />
                      <div
                        className="d-flex align-items-center m-1 p-1 gap-2 alert alert-danger rounded-0 "
                        style={{
                          borderLeft: "4px red solid",
                          width: "fit-content",
                        }}
                      >
                        <CheckCircleOutline className="text-white bg-danger rounded-circle" />
                        <p className="m-0">you take an order</p>
                      </div>
                    </>
                  )}
                  {e.status == "canceled" && (
                    <div className="d-flex justify-content-center align-items-center h-75  alert alert-danger">
                      <p className="btn btn-danger"> {e.status}</p>
                    </div>
                  )}
                  {e.status !== "canceled" && (
                    <button className="btn-danger btn my-3">cancel</button>
                  )}
                </div>
                <div className="w-100">
                  <div
                    className="bg-primary bg-opacity-75 p-3 rounded-4 text-white m-1 d-flex align-items-center flex-column"
                    style={{ height: "fit-content" }}
                  >
                    <div>
                      <p className="fw-bolder text-center">
                        total : {e.total_price}
                      </p>
                      <p className="fw-bold text-center">phone : {e.phone}</p>
                      <p className="fw-bold text-center">
                        address : {e.address}
                      </p>
                      <p className="fw-bold text-center">
                        deliver id : {e.delivery_id || "wait "}
                      </p>
                      <p className="text-center">
                        time :{" "}
                        {new Date(e.created_at).toISOString().slice(2, 10)}
                      </p>
                    </div>
                  </div>
                  <div>
                    {e.items && e.items.length > 0 ? (
                      e.items.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between w-100 bg-white rounded-2 p-3 bg my-2"
                          style={{ boxShadow: "0px 0px 1px black" }}
                        >
                          <div className="d-flex w-25 justify-content-between gap-2 ">
                            <img
                              style={{ width: "90%", objectFit: "cover" }}
                              src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                              alt=""
                            />
                            <div className="d-flex flex-column gap-2">
                              <h4 className="m-0">{item.product.name}</h4>
                              <p className="text-secondary m-0 fw-light">
                                {item.product.description}
                              </p>
                              <p className="m-0">Quantity:{item.quantity}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column justify-content-between">
                            <p className="m-0 fw-bolder">
                              ${(item?.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary">Your cart is empty</p>
                    )}
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
