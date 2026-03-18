import { useContext } from "react";
import { Text } from "../context/text";
import { ShoppingBag, LibraryAdd, List, PersonOffRounded, PersonOutline, Work, ShoppingCart, WorkHistory } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Side_delivery() {
  const { user ,token,setUser,setToken} = useContext(Text);
  const nav=useNavigate();
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
      className="d-flex flex-column justify-content-between align-items-center bg-white p-3"
      style={{ minHeight: "90vh", width: "fit-content", position: "relative",boxShadow:"0px 0px 1px black" }}
    >
      <div className="d-none d-lg-flex align-items-center gap-2 mb-4">
        <ShoppingBag className="text-primary fs-3" />
        <h3 className="m-0">Orders</h3>
      </div>

      <div className="d-flex flex-column align-items-start w-100 gap-3 flex-grow-1">
        {user && (
        <div>

          <p className="fw-bolder mb-3 d-none d-lg-block" style={{fontSize:"1.5vw"}}> {user.name}</p>
                        <img
                          src={`http://127.0.0.1:8000/storage/${user.image}`}
                          width="40"
                          height="40"
                          className="rounded-circle"
                          />
                          </div>
        )}

        <Link
        to={"/Now"}
          className="p-2 rounded-1 text-primary fw-bold w-100 text-decoration-none"
        >
          <Work/>
          <p className="d-none d-lg-inline">

          Order Now
          </p>
        </Link>
        <Link to={"/delivery"} className="fw-bold p-2 w-100 rounded-1 text-decoration-none"> <ShoppingCart/>   <p className="d-none d-lg-inline">All Orders</p></Link>
        <Link to={"/history"} className="fw-bold p-2 w-100 rounded-1 text-decoration-none"><WorkHistory/>   <p className="d-none d-lg-inline">History</p> </Link>
      </div>
      <button onClick={()=>Logout()} className="btn btn-danger p-1 mt-3"style={{fontSize:"1.5vw",width:"fit-content"}}>Log Out</button>
    </div>
  );
}