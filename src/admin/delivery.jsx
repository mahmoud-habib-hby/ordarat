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
  const [wait, Setwait] = useState(true);

  const [delivery, Setdelivery] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const id = useRef();

  // ================= GET DATA =================
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/deliveries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        SetData(e.data);
        localStorage.setItem("delivery", e.data.length);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        Setwait(false);
      });
  }, [token]);

  // ================= SEARCH =================
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
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  // ================= ADD DELIVERY =================
  function AddDelivery() {
    const formData = new FormData();

    formData.append("name", delivery.name);
    formData.append("email", delivery.email);
    formData.append("password", delivery.password);
    formData.append("password_confirmation", delivery.password);
    formData.append("phone", delivery.phone);

    if (delivery.image) {
      formData.append("image", delivery.image);
    }

    axios
      .post("http://127.0.0.1:8000/api/delivery", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        // إضافة العنصر الجديد بدون reload
        SetData((prev) => [...prev, e.data.data]);

        // reset form
        Setdelivery({
          name: "",
          phone: "",
          email: "",
          password: "",
          image: null,
        });

        setPreview(null);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <div className="d-flex">
        <Side_admin />

        <div
          className="p-5 w-100 position-relative d-flex flex-column align-items-center"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <Wait e={wait} />

          <h1 className="w-100 bg-primary p-2 rounded-3 text-white text-center">
            All Delivery
          </h1>

          {/* ================= FORM ================= */}
          <div className="p-3 d-flex flex-column w-100 align-items-center">
            <h4 className="text-capitalize text-primary">add delivery</h4>

            <div className="d-flex gap-2 w-100 justify-content-center">
              <div className="w-50">
                <label className="fw-bold mt-2">name</label>
                <input
                  type="text"
                  value={delivery.name}
                  onChange={(e) =>
                    Setdelivery({ ...delivery, name: e.target.value })
                  }
                  className="form-control"
                />
              </div>

              <div className="w-50">
                <label className="fw-bold mt-2">email</label>
                <input
                  type="email"
                  value={delivery.email}
                  onChange={(e) =>
                    Setdelivery({ ...delivery, email: e.target.value })
                  }
                  className="form-control"
                />
              </div>
            </div>

            <div className="d-flex gap-2 w-100 justify-content-center">
              <div className="w-50">
                <label className="fw-bold mt-2">password</label>
                <input
                  type="password"
                  value={delivery.password}
                  onChange={(e) =>
                    Setdelivery({ ...delivery, password: e.target.value })
                  }
                  className="form-control"
                />
              </div>

              <div className="w-50">
                <label className="fw-bold mt-2">phone</label>
                <input
                  type="number"
                  value={delivery.phone}
                  onChange={(e) =>
                    Setdelivery({ ...delivery, phone: e.target.value })
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* ===== IMAGE ===== */}
            <div className="w-50">
              <label className="fw-bold mt-2">image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  Setdelivery({ ...delivery, image: file });
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  width="80"
                  className="mt-2 rounded"
                />
              )}
            </div>

            <button
              onClick={AddDelivery}
              className="btn btn-primary my-3"
            >
              Add
            </button>
          </div>

          <hr className="w-100 bg-black" />

          {/* ================= SEARCH ================= */}
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="input-group mb-3 w-50">
              <input
                type="number"
                className="form-control"
                placeholder="search delivery_id"
                ref={id}
              />
              <span
                className="input-group-text btn btn-primary"
                onClick={handleSearch}
              >
                search
              </span>
            </div>
          </div>

          {/* ================= TABLE ================= */}
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
                    {d.image && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${d.image}`}
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
                    <Link
                      to={`/delivery_details/${d.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}