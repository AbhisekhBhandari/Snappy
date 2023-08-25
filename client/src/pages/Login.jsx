import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data);
      if (!data.status) {
        showToast(data.msg);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.fetchUser));
        navigate("/");
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
    const { username, password } = values;
    if (!username || !password) {
      return showToast("Fill in the credentials");
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
          min="3"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className="px-3 py-3 rounded-md w-full border-0.1 border-registerInput focus:border-registerInputFocus outline-none text-sm bg-transparent  text-white"
        />

        <button
          type="submit"
          className=" bg-registerButton w-full py-3 font-semibold text-white"
        >
         Login
        </button>
        <span className="text-white">
          Dont have a account?{" "}
          <Link to="/register" className=" text-darkBlue">
            Register
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
