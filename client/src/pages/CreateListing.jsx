import React from "react";

const CreateListing = () => {
  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center my-7">Post Your add</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="Name"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <textarea
            id="description"
            type="text"
            placeholder="description"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <input
            id="address"
            type="text"
            placeholder="address"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <div className="flex flex-wrap gap-6 ">
            <div className="flex gap-2">
              <input required type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input required type="checkbox" id="parking" className="w-5" />
              <span>parking spot</span>
            </div>
            <div className="flex gap-2">
              <input required type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input required type="checkbox" id="offer" className="w-5" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 ">
            <div className="flex items-center gap-3">
              <input
                required
                className="p-3 w-16  border border-gray-300 rounded-lg"
                type="number"
                minLength="1"
                maxLength="10"
                id="bedrooms"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-3">
              <input
                required
                className="p-3 border w-16  border-gray-300 rounded-lg"
                type="number"
                minLength="1"
                maxLength="10"
                id="bathrooms"
              />
              <p>Baths </p>
            </div>
            <div className="flex gap-3">
              <input
                required
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                minLength="1"
                maxLength="10"
                id="regularPrice"
              />
              <div className="">
                <p>Regular Price</p>
                <span className="text-sm">($/ month)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                required
                className="p-3 border border-gray-300  rounded-lg"
                type="number"
                minLength="1"
                maxLength="10"
                id="discountPrice"
              />
              <div className="">
                <p>Discounted Price</p>
                <span className="text-sm">($/ month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-400 ml-2">
              Fisrt Image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 w-full rounded-lg"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="disabled:bg-opacity-80 uppercase p-3 border border-green-700 rounded hover:shadow-lg">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white hover:opacity-90 rounded-lg ">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
