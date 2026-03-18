import { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Side_admin } from "../components/Saide_admin";
import axios from "axios";
import { Text } from "../context/text";
import { Link } from "react-router-dom";
import { Wait } from "../components/wait";

export function Prodcuts() {
  const { token } = useContext(Text);
  const [data, SetData] = useState([]);
  const [wait,Setwait]=useState(true);
  const [AddProduct, SetAddProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const imge = useRef();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
              const filteredData = e.data.filter(
        (item) => item.stock === 0
      );
     localStorage.setItem("emptyStock",filteredData.length)
          SetData(e.data);
          Setwait(false)
      })
      .catch((e) => {
        console.log(e);
      });
  },[token]);
function handelProduct(){
  const formData = new FormData();
  formData.append("name", AddProduct.name);
  formData.append("stock", AddProduct.stock);
  formData.append("price", AddProduct.price);
  formData.append("description", AddProduct.description);
  formData.append("category", AddProduct.category);
  formData.append("image", imge.current.files[0]);
  axios.post("http://127.0.0.1:8000/api/product",
    formData,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    }
  ).then((e)=>{
    console.log(e);
    window.location.reload();
  }).catch((e)=>{
    console.log(e.response);
  })

}

function handelDelete(id){
    axios.delete(`http://127.0.0.1:8000/api/product/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    }).then((e)=>{
        console.log(e);
        window.location.reload();
    }).catch((e)=>{
        console.log(e)
    })
}

function handelActive(id){
    axios.get(`http://127.0.0.1:8000/api/admin/product/active/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    }).then((e)=>{
        console.log(e);
        window.location.reload();
    }).catch((e)=>{
        console.log(e.response)
    })
}
  return (
    <div style={{ height: "100vh" }} className="bg-light">
      <div className="d-flex">
        <Side_admin />
        <div className="w-100 p-5 position-relative"
        style={{height:"90vh",overflowY:"auto"}}
        >
      <Wait e={wait} />

          <h2 className="bg-primary text-white text-center rounded-3">
            Products
          </h2>
          <div className="d-flex flex-column">
            <div className="mt-3 w-100 d-flex flex-column align-items-center gap-2">
              <h4 className="text-primary">Add Products</h4>
              <div className="product d-flex gap-2 w-75">
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  onChange={(e)=>SetAddProduct({...AddProduct,name:e.target.value})}
                  
                />
                <input
                  type="text"
                  placeholder="category"
                  className="form-control"
                  onChange={(e)=>SetAddProduct({...AddProduct,category:e.target.value})}
                  
                />
              </div>
              <div className="product d-flex gap-2 w-75">
                <input
                  type="text"
                  placeholder="description"
                  className="form-control"
                  onChange={(e)=>SetAddProduct({...AddProduct,description:e.target.value})}
                  
                />
                <input
                  type="number"
                  placeholder="price"
                  className="form-control"
                  onChange={(e)=>SetAddProduct({...AddProduct,price:e.target.value})}
                />
              </div>
              <div className="product w-75 d-flex gap-2">
                <input
                  type="number"
                  placeholder="stock"
                  onChange={(e)=>SetAddProduct({...AddProduct,stock:e.target.value})}
                  
                  className="form-control"
                  style={{height:"fit-content"}}
                />
                  <input
                    type="file"
                    placeholder="imge"
                    className="form-control w-100"
                    ref={imge}
                  />
              </div>
              <button className="btn btn-primary" onClick={()=>handelProduct()}>add</button>
            </div>
            <hr className="bg-black" />
          </div>
<div className="container mt-3">
  <table className="table table-bordered table-striped text-center">
    <thead className="table-dark">
      <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>status</th>
        <th>Stock</th>
        <th>Description</th>
        <th>action</th>
      </tr>
    </thead>

    <tbody>
      {data.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>

          <td>
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              width="50"
              height="50"
              style={{ objectFit: "cover" }}
            />
          </td>

          <td>{product.name}</td>

          <td>{product.category}</td>

          <td>{product.price}</td>
          
          <td>{product.status}</td>

          <td>
          {product.stock==0&& (<span className="badge bg-danger p-2 fs-6">
              {product.stock}
            </span>)}
          {product.stock!==0&& (<span className="badge bg-success p-2 fs-6">
              {product.stock}
            </span>)}
          </td>

          <td style={{maxWidth:"200px"}}>
            {product.description}
          </td>
        <td style={{maxWidth:"200px"}} className="">
            <Link to={`/update/${product.id}`} className="btn btn-success p-1 mx-3">Update</Link>
            {product.status !== "deleted" && (
  <button
    className="btn btn-danger p-1"
    onClick={() => handelDelete(product.id)}
  >
    delete
  </button>
)}
{product.status == "deleted" && (
  <button
    className="btn btn-secondary p-1"
    onClick={() => handelActive(product.id)}
  >
    active
  </button>
)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
