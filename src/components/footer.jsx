import { ShoppingBag } from "@mui/icons-material";

export function Footer() {
    return(
        <div  className="bottom-0 position-relative w-100 bg-white d-flex p-2 gap-3 align-items-center justify-content-center" style={{height:"10vh",boxShadow:"0px 0px 2px black"}}>
        <div className="d-flex  align-items-center ">
            <ShoppingBag className="text-primary"  />
            <h3 className="m-0" >ordarat</h3>
        </div>
        <p className="fw-lighter w-50 m-0">Ordarat is shop make buy product more easy , delivery will take order to customer</p>
        </div>
    );
}