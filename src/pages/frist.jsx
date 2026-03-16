import { ShoppingCart, ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
export function Frist() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/index")
      .then((e) => {
        setData(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
<div className="bg-light">
<div className="bg-white">

  <nav className="bg-white container  py-2 d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <ShoppingBag className="text-primary" />
      <h1 className="text-uppercase fw-bold mb-0 ms-2">Ordarat</h1>
    </div>
    <div className="d-flex gap-2">
    <Link to={"/login"} >
      <a href="/login" className="btn btn-primary">
        login
      </a>
    </Link>
    <Link to={"/register"} >
      <a href="/register" className="btn btn-link btn-sm text-dark">
        register
      </a>
    </Link>
    </div>
  </nav>
</div>
  
  <div className="container py-4">
    <div className="row g-4">
      {data.map((e) => (
        <div key={e.id} className="col-4 col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <img
              src={`http://127.0.0.1:8000/storage/${e.image}`}
              className="card-img-top rounded-top"
              alt={e.name}
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h6 className="text-primary mb-2">{e.category || "....."}</h6>
              <h5 className="card-title fw-bold">{e.name}</h5>
              <p className="card-text text-secondary">{e.description}</p>
              <hr className="my-2" />
              <div className="d-flex justify-content-center align-items-center">
                <p className="fw-bold text-primary mb-0">${e.price}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  <Footer />
</div>
  );
}
