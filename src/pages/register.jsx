import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Error } from "../errors/error";
import { Text } from "../context/text";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { setUser, setToken, token, user } = useContext(Text);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  }, [token, user]);

  function register() {
    axios
      .post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        // بعد التسجيل يتم حفظ بيانات المستخدم والـ Token
        setUser(res.data.user);
        setToken(res.data.token);

        // توجيه المستخدم حسب الدور
        navigate(`/${res.data.user.role}`);
      })
      .catch((err) => {
        // عرض رسالة الخطأ
        if (err.response && err.response.data) {
          setError(err.response.data.message || "حدث خطأ أثناء التسجيل");
        }
      });
  }

  return (
    <div
      className="w-100 h-vh-100 bg-light d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="container w-50 bg-white p-5 rounded d-flex justify-content-center flex-column"
        style={{ boxShadow: "0px 0px 1px black" }}
      >
        <div className="my-3 d-flex justify-content-center align-items-center">
          <h4 className="text-uppercase m-0">Register</h4>
        </div>

        {error && <Error message={error} />}

        <div>
          <label className="fw-bold text-success">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="fw-bold text-success">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="fw-bold text-success">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="fw-bold text-success">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <button onClick={register} className="btn btn-success">
          Register
        </button>
      </div>
    </div>
  );
}