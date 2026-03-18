import {
  ShoppingBag,
  Dashboard,
  Inventory,
  LocalShipping,
  ShoppingCart,
  LogoutSharp,
} from "@mui/icons-material";
import axios from "axios";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Text } from "../context/text";

export function Side_admin() {
const nav=useNavigate();
  const {token,setUser,setToken}=useContext(Text);
function Logout() {
  axios.post(
    "http://127.0.0.1:8000/api/logout",
    {}, // جسم الطلب فارغ
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((e) => {
    console.log(e);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
setTimeout(()=>{
  nav("/login");
},1000)
  })
  .catch((e) => {
    console.log(e.response);
  });
}
  return (
    <div
      className="d-flex flex-column bg-white"
      style={{
        width: "fit-content",
        height: "90vh",
        boxShadow: "0px 0px 5px black",
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 p-3">
        <ShoppingBag className="text-primary d-none d-lg-inline" style={{ fontSize: "35px" }} />
        <h4 className="fw-bold d-none d-lg-inline">Ordarat</h4>
      </div>

      {/* Links */}
      <div className="d-flex flex-column gap-4 mt-4 px-3">

        <Link
          className="d-flex align-items-center gap-2 text-primary text-decoration-none fw-bold"
          to="/admin"
        >
          <Dashboard />
          <span className="d-none d-lg-inline">Dashboard</span>
        </Link>

        <Link
          className="d-flex align-items-center gap-2 text-primary text-decoration-none fw-bold"
          to="/product_admin"
        >
          <Inventory />
          <span className="d-none d-lg-inline">Products</span>
        </Link>

        <Link
          className="d-flex align-items-center gap-2 text-primary text-decoration-none fw-bold"
          to="/AllDelivery"
        >
          <LocalShipping />
          <span className="d-none d-lg-inline">Deliveries</span>
        </Link>

        <Link
          className="d-flex align-items-center gap-2 text-primary text-decoration-none fw-bold"
          to="/orders_admin"
        >
          <ShoppingCart />
          <span className="d-none d-lg-inline">Orders</span>
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto p-1">
        <button onClick={()=>Logout()} className="bg-danger text-white w-100 d-flex align-items-center justify-content-center gap-2 border-0">
    <LogoutSharp />
          <span className="d-none d-lg-inline">Log Out</span>
        </button>
      </div>
    </div>
  );
}