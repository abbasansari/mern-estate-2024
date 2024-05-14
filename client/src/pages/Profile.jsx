import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const profileRef = useRef(null);

  //to store profile pic in state
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  //handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/v1/user/update/${currentUser.id}`,
        formData
      );
      dispatch(updateUserSuccess(res.data.newUser));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.data.message));
    }
  };

  //handleDeleteUser
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/v1/user/delete/${currentUser.id}`);
      if (res.data.success === false) {
        dispatch(deleteUserFailure(res.data.message));
        return;
      }
      dispatch(deleteUserSuccess(res.data));
      <Navigate to={"/login"} />;
    } catch (error) {
      dispatch(deleteUserFailure(error.data.message));
    }
  };

  //handleSignOutUser
  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get("/api/v1/auth/sign-out");
      if (res.data.success === false) {
        dispatch(signOutUserFailure(res.data.message));
        return;
      }
      dispatch(signOutUserSuccess(res.data.message));
    } catch (error) {
      dispatch(signOutUserFailure(error.data.message));
    }
  };

  //handleListingClick
  const handleListingClick = async () => {
    try {
      const res = await axios.get(`/api/v1/user/listing/${currentUser.id}`);
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      toast.success("All adds are below");
      setListings(res.data);
      console.log("All Listings", res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching Your Adds");
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={profileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => profileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile-pic"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>{" "}
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-600 uppercase text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-600 p-3 text-white rounded-lg text-center uppercase hover:opacity-95"
        >
          Post an add
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer "
        >
          Delete account
        </span>

        <span
          onClick={handleSignOutUser}
          className="text-red-600 cursor-pointer "
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "Profile updated!"}
      </p>
      <button
        onClick={handleListingClick}
        className="text-green-600 font-semibold w-full"
      >
        My Adds
      </button>
      <div className="flex flex-col gap-6 mt-4">
        <h1 className="font-semibold text-2xl text-center">Your Adds</h1>{" "}
        {listings?.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center
          border p-4 gap-4 justify-between"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain "
                  src={listing.imageUrls[0]}
                  alt="lisitin-covers"
                />
              </Link>
              <Link
                className="text-slate-600 font-semibold 
              flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col">
                <button className="text-red-700 ">Delete</button>
                <button className="text-green-700 ">Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p>No adds to display</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

//Firebase storage rules

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
