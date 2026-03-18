import { PersonRounded, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Text } from "../context/text";



export function Nav_Customer() {
    const {user}=useContext(Text);
    
    return(
    <div className="bg-white" style={{height:"10vh"}}>
        <nav className="d-flex align-items-center justify-content-between container py-2">
        <div className="d-flex align-items-center">
            <ShoppingBag className="text-primary" />
            <h3 className="m-0">ordarat</h3>
            <Link to={"/customer-information"}>
            {user.image?<img
            className="mx-3 rounded-circle"
            style={{width:"30px"}}
            src={`http://127.0.0.1:8000/storage/${user.image}`}
            />:<PersonRounded className="mx-2 bg-dark text-light rounded-circle p-1 fs-3" />}
            
            </Link>
        </div>
        <div className="d-flex gap-4 align-items-center">
            <Link to={"/customer"} className="text-decoration-none fw-bold" >
                product
            </Link>
            <Link to={"/orders"} className="text-decoration-none fw-bold">
                orders 
            </Link>
            <Link to={"/cart"} className="text-decoration-none" >
            <ShoppingCart className="text-primary" /> 
            </Link>
        </div>
        </nav>
    </div>
    );
}