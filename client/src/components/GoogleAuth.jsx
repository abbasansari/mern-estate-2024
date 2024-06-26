import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //we are passing firebase app to let recognize gpogle which app is requesting
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result.user.uid);
      //sending to data to backend api to save the data in database
      const res = await axios.post("/api/v1/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        _id: result.user.uid,
      });
      console.log(res.data);
      dispatch(signInSuccess(res.data));
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log("Google login failed", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="hover:opacity-90 bg-blue-500 p-3 text-white rounded-lg uppercase"
    >
      continue with Google
    </button>
  );
};

export default GoogleAuth;
