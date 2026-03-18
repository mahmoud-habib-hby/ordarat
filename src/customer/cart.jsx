import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Text } from "../context/text";
import { Nav_Customer } from "../components/nav_customer";
import { Footer } from "../components/footer";
import { Error } from "../errors/error";
import { Wait } from "../components/wait";

export function Cart() {
  const { token } = useContext(Text);
  const [items, setItems] = useState([]);
  const [error, setError] = useState([]);
  const [wait,Setwait]=useState(true);
  const [buyData, setBuyData] = useState({
    id: 0,
    location: "",
    location_url: "",
    phone: "",
  });
  const total = useRef(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/customer/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        Setwait(false);
      console.log(e)
        setBuyData({ ...buyData, id: e.data?.id });
        setItems(e.data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);
  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/cart/remove_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        window.location.reload();
        console.log(e.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }
function handleBuy() {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  axios
    .post(
      `http://127.0.0.1:8000/api/cart/buy_order/${buyData.id}`,
      {
        address: buyData.location,
        website_url: buyData.location_url,
        phone: buyData.phone,
        total_price: totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((e) => {
      console.log(e);
      window.location.reload();
    })
    .catch((e) => {
      console.log(e.response?.data);
      setError(e.response?.data?.errors || []);
    });
}
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Nav_Customer />
      <div className="position-relative" style={{height:"80vh",overflowY:"auto"}}>
      <Wait e={wait} />
      <div className="container py-3">
        <h2 className="py-3">Your Shopping Cart</h2>
        <div className="cart d-flex justify-content-between w-100 gap-2">
          <div className="d-flex flex-column gap-2">
            {items && items.length> 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between w-100 bg-white rounded-2 p-3"
                  style={{ boxShadow: "0px 0px 1px black" }}
                >
                  <div className="d-flex w-25 justify-content-between ">
                    <img
                      style={{ width: "60%", objectFit: "cover" }}
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
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-danger border-0 bg-transparent text-uppercase fw-bold"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary">Your cart is empty</p>
            )}
          </div>
          <div
            style={{ height: "fit-content", boxShadow: "0px 0px 1px black" }}
            className="bg-white  p-2 rounded-2 justify-content-around d-flex flex-column"
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bolder m-0 fs-5 text-uppercase">total</p>
              <input
                ref={total}
                disabled
                className="text-primary w-50 bg-transparent border-0 p-0 m-0 fw-bolder fs-4"
                value={`${items?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`}
              />
            </div>
            <hr />
            <div className="d-flex flex-column align-items-start gap-1">
              <label htmlFor="" className="text-secondary">
                Location
              </label>
              <input
                type="text"
                className="form-control mb-1"
                onChange={(e) =>
                  setBuyData({ ...buyData, location: e.target.value })
                }
              />
              <label htmlFor="location_url" className="text-secondary">
                Location URL
              </label>
              <input
                type="text"
                className="form-control mb-1"
                onChange={(e) =>
                  setBuyData({ ...buyData, location_url: e.target.value })
                }
              />
              <label htmlFor="phone" className="text-secondary">
                Phone
              </label>
              <input
                type="text"
                className="form-control mb-1"
                onChange={(e) =>
                  setBuyData({ ...buyData, phone: e.target.value })
                }
              />
              <button
                className="btn btn-primary w-100"
                onClick={() => handleBuy()}
              >
                Buy
              </button>
              {error && (
                <div className="d-flex gap-1 flex-column w-100">
                  {Object.values(error)
                    .flat()
                    .map((err) => (
                      <Error message={err} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
}
