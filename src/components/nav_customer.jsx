import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";



export function Nav_Customer() {
    return(
    <div className="bg-white">
        <nav className="d-flex align-items-center justify-content-between container py-2">
        <div className="d-flex align-items-center">
            <ShoppingBag className="text-primary" />
            <h3 className="m-0">ordarat</h3>
        </div>
        <div className="d-flex gap-4 align-items-center">
            <Link to={"/customer"} className="text-decoration-none text-white btn btn-primary" >
                product
            </Link>
            <Link to={"/orders"} className="text-decoration-none text-dark">
                orders 
            </Link>
            <Link to={"/cart"} className="text-decoration-none" >
            <ShoppingCart className="text-success" />
            </Link>
        </div>
        </nav>
    </div>
    );
}