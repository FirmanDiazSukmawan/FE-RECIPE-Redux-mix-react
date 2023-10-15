import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../../Component/login/login';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errmsg,setErrmsg] = useState("");
  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/users`,{
        username: username,
        email: email,
        phone_number: phone_number,
        password: password,
        confirmPassword: confirmPassword,
      });
       
      toast.success("register berhasil brother")
      setTimeout(() => {
        navigate("/login")
      }, 1500);
      
      
      // console.log(res)
    } catch (err) {
      if (err){
        setErrmsg(err?.response?.data?.message);
        toast.error(errmsg)
      }
    }
  }


    return (
      <>
      <ToastContainer/>
        <section className="container-fluid" id='register'>
  <div className="reg-base row align-items-center position-relative">
    <div className="reg-left col-xs-12 col-sm-3 col-md-4 col-lg-6 ">
      <div className="bapaleft d-flex align-items-center justify-content-center">
        <div className="colorb" />
        <img src={require("../../asset/image/image 15.png")} alt="" className="bg" />
        <div className="icon">
          <img src={require("../../asset/image/barbeque1.png")} alt="" />
        </div>
      </div>
    </div>
    <div className="reg-right col-xs-12 col-sm-9 col-md-8 col-lg-6">
      <div className="regr d-flex flex-column justify-content-center align-items-center h-100">
        {/* <p className='has-text-centered'>{errmsg}</p> */}
        <div className="rlg">
          <div className="lets d-flex flex-column align-items-center">
            <h2 className="letsg text-warning">Let’s Get Started !</h2>
            <p className="create title mt-3 mb-3">
              Create new account to access all features
            </p>
          </div>
          <form onSubmit={handleRegister}>
          <div className="inpute">
            <div className="Name">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control border-warning "
                name="Name"
                placeholder="Name"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="Email addres">
              <label htmlFor="Email addres" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control border-info"
                name="Email addres"
                placeholder="Enter Email addres"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="PhoneNumber">
              <label htmlFor="Phone Number" className="form-label">
                PhoneNumber
              </label>
              <input
                type="tel"
                className="form-control border-info"
                name="PhoneNumber"
                placeholder="08xxxxxxxxxx"
                value={phone_number} onChange={(e) => setphone_number(e.target.value)}
              />
            </div>
            <div className="CreatePassword">
              <label htmlFor="Create New Password" className="form-label">
                Create New Password
              </label>
              <input
                type="password"
                className="form-control border-info"
                name="password"
                placeholder="Create New Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="Newpassword">
              <label htmlFor="New Password" className="form-label">
                password
              </label>
              <input
                type="password"
                className="form-control border-info"
                name="confirmPassword"
                placeholder="New Password"
                value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="formcheck mb-3 mt-3">
            <input type="checkbox" className="form-check-input bg-warning"  />
            <label htmlFor="terms" className="label-form">
            I agree to terms & conditions
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-warning ">
              Register Account
            </button>
          </div>
          <div className="already text-center mt-3">
            Already have account??{" "}
            <Link to="/login" className="login text-decoration-none">
              Log in here
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

export default Register