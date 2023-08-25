import React, { Fragment, useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
    navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password, } = values;
      const  {data}  = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log(data);
      if(!data.status){
        showToast(data.msg)
      }else{
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    
    }
  };
  const showToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    return false;
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (!username || !email || !password || !confirmPassword) {
      return showToast("Fill in the credentials");
    }
    if (password !== confirmPassword) {
      return showToast("Passwords Dont match");
    }
    if (password.length < 8) {
      return showToast("Passwords should be atleast 8 character long.");
    }
    if (username.length < 3) {
      return showToast("Username should more than 3 characters");
    }
    return true;
  };

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className=" bg-registerBg h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-registerForm gap-y-3 rounded-md h-full md:h-fit w-[500px]  flex flex-col items-center px-[5rem] py-12"
      >
        <div className="flex items-center gap-x-2">
          <img src={Logo} alt="Logo" className=" h-[50px]" />
          <h1 className=" text-3xl text-white">SNAPPY</h1>
        </div>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => handleChange(e)}
          className="px-3 py-3 rounded-md w-full border-0.1 border-registerInput focus:border-registerInputFocus outline-none text-sm bg-transparent  text-white"
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleChange(e)}
          className="px-3 py-3 rounded-md w-full border-0.1 border-registerInput focus:border-registerInputFocus outline-none text-sm bg-transparent  text-white"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className="px-3 py-3 rounded-md w-full border-0.1 border-registerInput focus:border-registerInputFocus outline-none text-sm bg-transparent  text-white"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          className="px-3 py-3 rounded-md w-full border-0.1 border-registerInput focus:border-registerInputFocus outline-none text-sm bg-transparent  text-white "
        />
        <button
          type="submit"
          className=" bg-registerButton w-full py-3 font-semibold text-white"
        >
          Create User
        </button>
        <span  className="text-white">
          Already have a account? <Link to="/login" className="text-darkBlue">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
