import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-b-4 border-blue-500 rounded-full w-6 h-6 color animate-spin"></div>
    </div>
  );
};

export default Loader;
