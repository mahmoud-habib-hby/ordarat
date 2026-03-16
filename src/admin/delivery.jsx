import { useContext, useEffect, useRef, useState } from "react";
import { Side_admin } from "../components/Saide_admin";
import { Text } from "../context/text";
import axios from "axios";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { Wait } from "../components/wait";

export function All_delivery() {
  const { token } = useContext(Text);
  const [data, SetData] = useState([]);
  const [wait,Setwait]=useState(true);
  const [delivery,Setdelivery]=useState({
    name:"",
    phone:"",
    email:'',
    password:''
  }
  )
const id=useRef();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/deliveries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        SetData(e.data);
        localStorage.setItem("delivery",e.data.length);
        Setwait(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);
function handleSearch() {
  axios
    .get("http://127.0.0.1:8000/api/admin/search/delivery", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: id.current.value,
      },
    })
    .then((response) => {
      SetData(response.data);
      // window.location.reload();
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function AddDelivery(){
  axios.post("http://127.0.0.1:8000/api/delivery",{
    name:delivery.name,
    email:delivery.email,
    password:delivery.password,
    phone:delivery.phone,
    password_confirmation:delivery.password
  }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((e)=>{
        console.log(e);
        window.location.reload();
      }).catch((e)=>{
        console.log(e.response)
      })
}
  return (
    <div className="bg-light" style={{height:"100vh"}}>
      <Wait e={wait}/>
      <div className="d-flex gap-3" >
        <Side_admin />

        <div className="container pt-3 d-flex flex-column align-items-center"style={{maxHeight:"90vh",overflowY:"scroll"}}>
          <h1 className="w-100 bg-primary p-1 rounded-3 text-white text-center">
            All Delivery
          </h1>

          {/* form */}
          <div className="p-3 d-flex flex-column mt-3 w-100 align-items-center">
            <h4 className="text-capitalize text-primary">add delivery</h4>

            <div className="d-flex gap-2 w-100 justify-content-center">
              <div className="w-50">
                <label className="fw-bold mt-2">name</label>
                <input type="text" value={delivery.name} onChange={(e)=>Setdelivery({...delivery, name:e.target.value})} className="form-control" />
              </div>

              <div className="w-50">
                <label className="fw-bold mt-2">email</label>
                <input type="email" value={delivery.email} onChange={(e)=>Setdelivery({...delivery, email:e.target.value})} className="form-control" />
              </div>
            </div>

            <div className="d-flex gap-2 w-100 justify-content-center">
              <div className="w-50">
                <label className="fw-bold mt-2">password</label>
                <input type="password" value={delivery.password} onChange={(e)=>Setdelivery({...delivery, password:e.target.value})} className="form-control" />
              </div>

              <div className="w-50">
                <label className="fw-bold mt-2">phone</label>
                <input type="number" value={delivery.phone} onChange={(e)=>Setdelivery({...delivery, phone:e.target.value})} className="form-control" />
              </div>
            </div>

            <button type="submit" onClick={()=>AddDelivery()} className="btn btn-primary my-3">
              Add
            </button>
          </div>

          <hr className="w-100 bg-black" />

          {/* table */}
          <div className="w-100">
          <div className="d-flex align-items-center justify-content-center">

        <div class="input-group mb-3 w-50">
          <input
            type="number"
            class="form-control"
            placeholder="search delivery_id"
            ref={id}
          />
          <div class="input-group-append">
            <span
              class="input-group-text btn btn-primary rounded-start-0"
              onClick={() => handleSearch()}
            >
              search
            </span>
          </div>
        </div>
          </div>
            
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {data.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>

                    <td>
                      {d.photo && (
                        <img
                          src={`http://127.0.0.1:8000/storage/${d.photo}`}
                          width="40"
                          height="40"
                          className="rounded-circle"
                        />
                      )}
                    </td>

                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>

                    <td>
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <Link to={`/delivery_details/${d.id}`} className="btn btn-sm btn-primary">
                        details
                      </Link>
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