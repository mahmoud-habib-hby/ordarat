import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Text } from "../context/text";
import { Nav_Customer } from "../components/nav_customer";
import { Footer } from "../components/footer";
import { Wait } from "../components/wait";

export function Products() {
  const { token } = useContext(Text);
  const [products, setProducts] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [Allcategorie, setAllCategorie] = useState(0);
  const [quantity, setQuantity] = useState({});
  const [wait,Setwait]=useState(true)
  const [ms, setMs] = useState("");
  const search = useRef(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.filter((p) => p.status === "active");
        const categories = [...new Set(data.map((p) => p.category))];
        setCategorie(categories);
        localStorage.setItem("productNumber", data.length);
        setProducts(data);
        Setwait(false);
      })
      .catch((error) => console.log(error.response.data));
  }, [token, Allcategorie]);

  function Categery(x) {
    axios
      .get("http://127.0.0.1:8000/api/product", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) => product.category === x
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error.response.data));
  }

  function AddToCart(id) {
    axios
      .post(
        `http://127.0.0.1:8000/api/cart/add_in_cart/${id}`,
        { quantity: quantity[id] || 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setMs(response.data.message); // عرض الرسالة
        setAllCategorie(Allcategorie + 1);
      })
      .catch((error) => setMs(error.response.data.message));
  }

function handleSearch() {
  axios
    .get("http://127.0.0.1:8000/api/customer/search/product", {
      headers: { Authorization: `Bearer ${token}` },
      params: { search: search.current.value },
    })
    .then((response) => {
      const activeProducts = response.data.filter((p) => p.status === "active");
      setProducts(activeProducts);
    })
    .catch((error) => console.log(error.response.data));
}

  // اخفاء الرسالة بعد ثانيتين
  useEffect(() => {
    if (ms) {
      const timer = setTimeout(() => setMs(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [ms]);

  return (
    <div className="bg-light" style={{ height: "100%" }}>
      <Nav_Customer />

      {/* الرسالة الاحترافية */}
      {ms && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3 alert bg-success text-white shadow-lg"
          style={{ zIndex: 9999, minWidth: "300px", textAlign: "center" }}
        >
          {ms}
        </div>
      )}
      <div className="position-relative" style={{height:'80vh',overflowY:'auto'}}>

        <Wait e={wait} />
      <div className="container flex-column-reverse d-flex align-items-center justify-content-between w-100 my-4 px-5">
        <div className="flex-wrap w-auto d-flex gap-5">
          {categorie.map((category, index) =>
            category ? (
              <p
                className="btn btn-outline-primary"
                key={index}
                onClick={() => Categery(category)}
              >
                {category}
              </p>
            ) : null
          )}
          <p
            className="btn btn-primary"
            onClick={() => setAllCategorie(Allcategorie + 1)}
          >
            All Category
          </p>
        </div>
        <div className="input-group mb-3 w-50">
          <input type="text" className="form-control" placeholder="search" ref={search} />
          <div className="input-group-append">
            <span
              className="z-0 input-group-text btn btn-primary rounded-start-0"
              onClick={handleSearch}
            >
              search
            </span>
          </div>
        </div>
      </div>

      <div className="container bg-light">
        <div className="row g-4 mb-3">
          {products.map((e) => (
            <div key={e.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={`http://127.0.0.1:8000/storage/${e.image}`}
                  className="card-img-top rounded-top"
                  alt={e.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6 className="text-primary mb-2">{e.category || "....."}</h6>
                  <h5 className="card-title fw-bold">{e.name}</h5>
                  <p className="card-text text-secondary">{e.description}</p>
                  <p className="fw-bold mb-0">stock: {e.stock}</p>
                  <p className="fw-bold text-primary mb-0">price: ${e.price}</p>

                  <hr className="my-2" />
                  {e.stock!==0?(

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="fs-6 m-0">stock</p>
                    <input
                      type="number"
                      value={quantity[e.id] || 1}
                      onChange={(x) =>
                        setQuantity({ ...quantity, [e.id]: x.target.value })
                      }
                      className="stock w-50 form-control"
                      min="1"
                      max={e.stock}
                    />
                    <button className="mt-2 btn btn-primary" onClick={() => AddToCart(e.id)}>
                      Add To Cart
                    </button>
                  </div>
                  ):<p className="text-danger mt-4 fw-bold text-center">
                  stock empty
                  </p>}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}