import { useContext } from "react";
import { Text } from "../context/text";
import { ShoppingBag, LibraryAdd, List, PersonOffRounded, PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function Side_delivery() {
  const { user } = useContext(Text);

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center bg-white p-4"
      style={{ minHeight: "90vh", width: "250px", position: "relative",boxShadow:"0px 0px 1px black" }}
    >
      <div className="d-flex align-items-center gap-2 mb-4">
        <ShoppingBag className="text-primary fs-3" />
        <h3 className="m-0">Orders</h3>
      </div>

      <div className="d-flex flex-column align-items-start w-100 gap-3 flex-grow-1">
        {user && (
          <p className="fw-bolder mb-3"> <PersonOutline className="rounded-circle" style={{border:"1px solid black"}}/> {user.name}</p>
        )}

        <Link
        to={"/Now"}
          className="p-2 rounded-1 text-primary fw-bold w-100 text-decoration-none"
        >
          Order Now
        </Link>
        <Link to={"/delivery"} className="fw-bold p-2 w-100 rounded-1 text-decoration-none">All Orders</Link>
        <Link to={"/history"} className="fw-bold p-2 w-100 rounded-1 text-decoration-none">History</Link>
      </div>
      <button className="btn btn-danger w-100 mt-3">Log Out</button>
    </div>
  );
}