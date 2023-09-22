import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../asset/css/style.css"
import {login, url} from "../../Component/login/login"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [cek,setcek] = useState(false);

  const handleChange = async (e) => {
    setcek(e.target.checked)
  }




    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${url}/users/login`,{
          email: email,
          password: password,
        });
        // localStorage.setItem("data",JSON.stringify(res.data.data));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("email",res.data.data.email);
        localStorage.setItem("userId",res.data.data.users_id);
        console.log(res)
        toast.success("Login succces bro")
        
        setTimeout(() => {
            navigate("/")
        }, 1500);
        
        
         
        console.log(res)
      } catch (err) {
        if (err){
         
          toast.error(err.response.data.message)
        }
      }
    }


// const Login = () => {
//     const [data,setData] = useState({
//       email: "",
//       password: ""
//     });
  
//     const [msg,setMsg] = useState("")
//     const navigate = useNavigate();
  
//     const handleChange = (e) => {
//       const value = e.target.value;
//       setData({
//         ...data,
//         [ e.target.name] : value
//       });
//     };
  
//     function handleLogin (e) {
//       e.preventDefault();
//       const userData = {
//         email:data.email,
//         password:data.password
//       }
      
//       login(userData,(res)=> {
//         if (res.status===200) {
//             navigate("/")
//         }
//         else {
//             setMsg(res.data.message)
//         }
//       });
//     }
   

    return (
        <>
        <ToastContainer/>
        <section className="container-fluid" id='login'>
            <div className="login-base row align-items-center position-relative">
                <div className="login-left d-none  d-lg-grid col-lg-6 ">
                    <div className="bapaleft d-lg-flex d-none align-items-center justify-content-center">
                        <div className="colorb" />
                        <img src={require("../../asset/image/image 15.png")} alt="" className="bg" />
                        <div className="icon">
                            <img src={require("../../asset/image/barbeque1.png")} alt="" />
                        </div>
                    </div>
                </div>
                <div className="login-right col-12  col-lg-6">
                    <div
                        className="loginr d-flex flex-column justify-content-center align-items-center"
                        style={{ height: "100%", width: "100%" }}
                    >
                        <div className="rlg">
                         {/* <p className="text-center">{errmsg}</p> */}
                            <div className="welcome d-flex flex-column align-items-center">
                                <div className="welcome text-warning">Welcome</div>
                                <div className="title mt-3 mb-3">
                                    Log in into your exiting account
                                </div>
                            </div>
                            <form >
                            
                            <div className="inpute">
                            
                                <div className="email">
                                    <label htmlFor="email" className="form-label">
                                        E-mail
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        name="email"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="password mt-3">
                                    <label htmlFor="password" className="form-label">
                                        password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control  "
                                        name="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) =>setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="formcheck mb-3 mt-3">
                                <input type="checkbox" className="form-check-input  " onChange={handleChange} />
                                <label htmlFor="terms" className="label-form"style={{ marginLeft:"0.5vw"}}>
                                    I agree to terms & conditions
                                </label>
                            </div>
                            <div className="d-grid">
                                {!cek?(      <button type="submit" className="btn btn-secondary " disabled={!cek}>
                                    Log in
                                </button>):( <button type="submit" className="btn btn-warning " onClick={handleLogin}>
                                    Log in
                                </button>) }
                           
                               
                            </div>
                            <div className="forgot text-end mb-3">
                                <Link href="#" className="forgotp text-decoration-none">
                                    Forgot password
                                </Link>
                            </div>
                            <div className="noacc text-center">
                                Dont have a account?{" "}
                                <Link to="/register" className="signup">
                                    sign up
                                </Link>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login;