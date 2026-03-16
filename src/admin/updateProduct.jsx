import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Text } from "../context/text";
import { useNavigate, useParams } from "react-router-dom";
import { Wait } from "../components/wait";

export function UpdateProduct() {
  const { token } = useContext(Text);
  const { id } = useParams();
    const [wait,Setwait]=useState(true);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const image = useRef();
  const nav = useNavigate();
  // جلب بيانات المنتج
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Setwait(false)
        setProduct({
          name: res.data.name || "",
          description: res.data.description || "",
          category: res.data.category || "",
          price: res.data.price || "",
          stock: res.data.stock || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  function handleUpdate() {
    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("name", product.name ?? "");
    formData.append("description", product.description ?? "");
    formData.append("category", product.category ?? "");
    formData.append("price", product.price ?? "");
    formData.append("stock", product.stock ?? "");

    if (image.current.files.length > 0) {
      formData.append("image", image.current.files[0]);
    }

    axios
      .post(`http://127.0.0.1:8000/api/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        nav("/product_admin");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="d-flex flex-column">
      <Wait e={wait} />
      <div className="mt-3 w-100 d-flex flex-column align-items-center gap-2">
        <h4 className="text-white w-50 text-center p-2 rounded-2 bg-primary">Update Product</h4>

        <div className="d-flex my-1 w-50 flex-column">
          <label htmlFor="">name</label>
          <input
            type="text"
            className="form-control"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="d-flex my-1 w-50 flex-column">
          <label htmlFor="">category</label>

          <input
            type="text"
            className="form-control"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
        </div>

        <div className="d-flex my-1 w-50 flex-column">
          <label htmlFor="">description</label>

          <input
            type="text"
            className="form-control"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div className="d-flex my-1 w-50 flex-column">
          <label htmlFor="">price</label>

          <input
            type="number"
            className="form-control"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="d-flex my-1 w-50 flex-column">
          <label htmlFor="">stock</label>

          <input
            type="number"
            className="form-control"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </div>
        <div className="d-flex my-1 w-50 flex-column">
        <label htmlFor="">image</label>
          <input type="file" className="form-control" ref={image} />
        </div>

        <button className="btn btn-primary" onClick={handleUpdate}>
          Update Product
        </button>
      </div>

      <hr className="bg-black" />
    </div>
  );
}
