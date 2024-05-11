import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {currentUser.email} Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile-pic"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          className="p-3 border rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
        />
        <button className="bg-slate-600 uppercase text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer ">Delete account</span>

        <span className="text-red-600 cursor-pointer ">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
