import { ShoppingBag } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function Side_admin() {
  return (
    <div className="d-flex flex-column bg-white" style={{width:"fit-content",height:"90vh",boxShadow:"0px 0px 5px black"}}> 
      <div className="d-flex gap-1 align-items-center container my-4 mx-4">
        <ShoppingBag className="text-primary fs-1" />
        <h2 className="fw-bolder">Ordarat</h2>
      </div>
      <div className="d-flex flex-column gap-3 container m-3">
      <Link className="text-primary text-decoration-none text-capitalize fs-5 fw-bold" to={"/admin"}>dashbord</Link>
      <Link className="text-primary text-decoration-none text-capitalize fs-5 fw-bold" to={"/product_admin"}>products</Link>
      <Link className="text-primary text-decoration-none text-capitalize fs-5 fw-bold" to={"/AllDelivery"}>deliveries</Link>
      <Link className="text-primary text-decoration-none text-capitalize fs-5 fw-bold" to={"/orders_admin"}>orders</Link>
      </div>
    </div>
  );
}
