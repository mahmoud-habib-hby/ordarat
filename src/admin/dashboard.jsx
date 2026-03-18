import { Footer } from "../components/footer";
import { Side_admin } from "../components/Saide_admin";
import {
  Moped,
  ProductionQuantityLimitsTwoTone,
  ShoppingBag,
  ShoppingCart,
} from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Text } from "../context/text";
import { Wait } from "../components/wait";

export function Dashboard() {
  const [wait, SetWait] = useState(true);
  const [topDelivery, setTopDelivery] = useState([]);
  const { token } = useContext(Text);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/deliveries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => b.orders_count - a.orders_count)
          .slice(0, 5);
        SetWait(false);
        setTopDelivery(sorted);
      })
      .catch((err) => console.log(err.response));
  }, [token]);

  return (
    <div className="bg-light">
      <div className="d-flex">
        <Side_admin />

        <div
          className="p-5 d-flex flex-column w-100 position-relative"
          style={{ height: "90vh", overflowY: "auto" }}
        >
          <Wait e={wait} />
          <h2 className="bg-primary text-white w-100 text-center rounded-2 p-2">
            Dashboard
          </h2>

          {/* cards */}
          <div className="d-flex flex-wrap gap-4 mt-4 align-items-center justify-content-center">
            <div
              className="bg-success text-white p-4 rounded shadow text-center"
              style={{ width: "220px" }}
            >
              <Moped style={{ fontSize: "40px" }} />
              <p className="mt-2">All Delivery</p>
              <h3>{localStorage.getItem("delivery")}</h3>
            </div>

            <div
              className="bg-primary text-white p-4 rounded shadow text-center"
              style={{ width: "220px" }}
            >
              <ShoppingBag style={{ fontSize: "40px" }} />
              <p className="mt-2">All Product</p>
              <h3>{localStorage.getItem("productNumber")}</h3>
            </div>

            <div
              className="bg-warning text-dark p-4 rounded shadow text-center"
              style={{ width: "220px" }}
            >
              <ShoppingCart style={{ fontSize: "40px" }} />
              <p className="mt-2">Orders</p>
              <h3>{localStorage.getItem("ordars")}</h3>
            </div>

            <div
              className="bg-danger text-white p-4 rounded shadow text-center"
              style={{ width: "220px" }}
            >
              <ProductionQuantityLimitsTwoTone style={{ fontSize: "40px" }} />
              <p className="mt-2">Empty Stock</p>
              <h3>{localStorage.getItem("emptyStock")}</h3>
            </div>
          </div>

          {/* table */}
          <div className="mt-5">
            <h4 className="mb-3">Top 5 Delivery</h4>

            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>

              <tbody>
                {topDelivery.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
