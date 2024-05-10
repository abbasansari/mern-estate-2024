import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  //handleSubmit improved
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/v1/auth/sign-in", formData);

      if (!res.data.success) {
        dispatch(signInFailure(res.data.error));
        toast.error(res.data.error);
      } else {
        dispatch(signInSuccess(res.data));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  //handleSubmit
  // // const handleSubmit = async (e) => {
  // //   e.preventDefault();
  // //   // console.log(formData.username);
  // //   try {
  // //     setIsLoading(true);
  // //     const res = await axios.post("/api/v1/auth/sign-up", formData);
  // //     if (res.data.success === false) {
  // //       setError(res.data.error);
  // //       setIsLoading(false);
  // //       toast.error(error);
  // //       return;
  // //     } else {
  // //       setIsLoading(false);
  // //       setError(null);
  // //       toast.success(res.data.message);
  // //     }
  // //   } catch (error) {
  // //     setIsLoading(false);

  // //     toast.error(error.response.data.message);
  // //     console.log(error);
  // //   }
  // };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 mt-4">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Register here </span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
