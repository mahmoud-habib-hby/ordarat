import { ShoppingBag, ShoppingCart } from "@mui/icons-material";



export function Nav_Customer() {
    return(
    <div className="bg-white">
        <nav className="d-flex align-items-center justify-content-between container py-2">
        <div className="d-flex align-items-center">
            <ShoppingBag className="text-primary" />
            <h3 className="m-0">ordarat</h3>
        </div>
        <div className="d-flex gap-4 align-items-center">
            <a href="" className="text-decoration-none text-white btn btn-primary" >
                product
            </a>
            <a href="" className="text-decoration-none text-dark">
                orders
            </a>
            <ShoppingCart className="text-success" />
        </div>
        </nav>
    </div>
    );
}