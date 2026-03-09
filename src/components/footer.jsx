import { ShoppingBag } from "@mui/icons-material";

export function Footer() {
    return(
        <div className="bg-white h-auto d-flex p-3 gap-3 align-items-center justify-content-center">
        <div className="d-flex  align-items-center ">
            <ShoppingBag className="text-primary"  />
            <h3 className="m-0" >ordarat</h3>
        </div>
        <p className="fw-lighter w-50 m-0">Ordarat is shop make buy product more easy , delivery will take order to customer</p>
        </div>
    );
}