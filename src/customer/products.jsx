import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Text } from "../context/text";
import { Nav_Customer } from "../components/nav_customer";
import { Footer } from "../components/footer";

export function Products() {
  const { token } = useContext(Text);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(products.map((item) => item.category))];
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [token]);
  return (
    <div className="bg-light" style={{ height: "100%" }}>
      <Nav_Customer />
      <div className="container d-flex align-items-center justify-content-between w-100 my-4 px-5">
        <div className="d-flex  w-auto d-flex gap-5">
          {categories.map((category, index) => {
            if (category !== null) {
              return (
                <p className="btn btn-outline-primarygit init" key={index}>
                  {category}
                </p>
              );
            }
          })}
        </div>
        <div class="input-group mb-3 w-50">
          <input
            type="text"
            class="form-control"
            placeholder="search"
          />
          <div class="input-group-append">
            <span class="input-group-text btn btn-primary rounded-start-0" >
              search
            </span>
          </div>
        </div>
      </div>
  <div className="container py-4 bg-light">
          <div className="row g-4">
      {products.map((e) => (
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
                <p className="fw-bold mb-0">stock: {e.stock}</p>
                <p className="fw-bold text-primary mb-0">price: ${e.price}</p>
              
              <hr className="my-2" />
              <div className="d-flex justify-content-center align-items-center gap-3">
                <input type="number" className="w-25 text-center form-control" min="1" value="1" max={e.stock}/>
                <button className="btn btn-primary ">Add To Cart</button>
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
