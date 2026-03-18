import { useContext, useState } from "react";
import { Footer } from "../components/footer";
import { Nav_Customer } from "../components/nav_customer";
import { Text } from "../context/text";
import axios from "axios";
import { PersonRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function CustomerInformation() {
  const { user ,token,setUser,setToken } = useContext(Text);

  // استخدم useEffect عشان تجيب البيانات من localStorage لو contextUser فاضي
const nav=useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageUrl = user?.image ? `http://127.0.0.1:8000/storage/${user.image}` : null;

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);

    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/user/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Updated successfully!");
        nav("/login");
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert("Error updating profile");
      })
      .finally(() => setLoading(false));
  };
function Logout() {
  axios.post(
    "http://127.0.0.1:8000/api/logout",
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((e) => {
    console.log(e);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
setTimeout(()=>{
  nav("/login");
},1000)
  })
  .catch((e) => {
    console.log(e.response);
  });
}
  return (
    <div>
      <Nav_Customer />
      <div className="bg-light" style={{ height: "80vh", overflowY: "auto" }}>
        <div className="container py-3">
          <h2>Profile</h2>
          <div className="p-3 bg-white rounded-4 gap-3 d-flex flex-column align-items-center">

            {/* الصورة */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="profile"
                className="rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ) : (
              <PersonRounded
                className="bg-secondary rounded-circle"
                style={{ fontSize: "20vw" }}
              />
            )}

            {/* الاسم */}
            <div className="m-2 d-flex flex-column align-items-center w-75">
              <label>Name</label>
              <input
                type="text"
                className="form-control w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* الإيميل */}
            <div className="m-2 d-flex flex-column align-items-center w-75">
              <label>Email</label>
              <input
                type="text"
                className="form-control w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* رفع الصورة */}
            <div className="m-2 d-flex flex-column align-items-center w-75">
              <label>Image</label>
              <input
                type="file"
                className="form-control w-100"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* زر التحديث */}
            <button
              className="btn btn-primary mt-3"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
           <button className="btn btn-danger" onClick={()=>Logout()}>logout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}