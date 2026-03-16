import axios from "axios";
import  { useContext,useEffect,useState } from "react";
import { Error } from "../errors/error";
import { Text } from "../context/text";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function Login() {
    const {setUser,setToken,token,user} = useContext(Text);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const url=useNavigate();
useEffect(()=>{
 localStorage.setItem("token",JSON.stringify(token));   
 localStorage.setItem("user",JSON.stringify(user));
},[token,user])
function login() {
    axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password
    }).then((e) => {
        url(`/${e.data.user.role}`);
        setUser(e.data.user);
        setToken(e.data.token);
    }).catch((e) => {
        setError(e.response.data.message);
    });
}
    return(
        <div className="w-100 h-vh-100 bg-light d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <div className="container w-50 bg-white p-5 rounded d-flex justify-content-center flex-column" style={{boxShadow:"0px 0px  1px black"}}>
            <div className="my-3 d-flex justify-content-center align-items-center ">
                <ShoppingCart className="text-primary" />
                <h4 className="text-uppercase m-0 ">ordarat</h4>
            </div>
            {error && <Error message={error} />}
            <div>
                <label htmlFor="email" className="fw-bold text-primary">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  className="form-control" />
            </div>
            <br />
            <div>
                <label htmlFor="password" className="fw-bold text-primary">Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password"  className="form-control" />
            </div>
            <p >Have An Account? <a href="/register">Register</a></p>
            <button onClick={login} className="btn btn-primary">Log in</button>
        </div>
        </div>
    );
}