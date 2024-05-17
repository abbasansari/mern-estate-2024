import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-8 border-b-3 md:border-r-2">
        <form className="flex flex-col gap-10">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-3 items-center  flex-wrap">
            <label className="font-semibold">Type</label>
            <div className="flex gap-3 ">
              <input type="checkbox" id="all" className="w-5" />
              <span> For Sale & Rent</span>
            </div>
            <div className="flex gap-3 ">
              <input type="checkbox" id="rent" className="w-5" />
              <span> Rent</span>
            </div>
            <div className="flex gap-3 ">
              <input type="checkbox" id="sale" className="w-5" />
              <span> Sale </span>
            </div>
            <div className="flex gap-3 ">
              <input type="checkbox" id="offer" className="w-5" />
              <span> Offer</span>
            </div>
          </div>
          <div className="flex gap-3 items-center  flex-wrap">
            <label className="font-semibold">Amenities</label>
            <div className="flex gap-3 ">
              <input type="checkbox" id="parking" className="w-5" />
              <span> Parking</span>
            </div>
            <div className="flex gap-3 ">
              <input type="checkbox" id="furnished" className="w-5" />
              <span> Furnished</span>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <label className="font-semibold">Sort by:</label>
            <select
              className="p-3 border rounded-lg "
              name="sort_order"
              id="sort_order"
            >
              <option value="">Price Low - High </option>
              <option value="">Price High - Low </option>
              <option value="">Recent</option>
              <option value=""> Oldest </option>
            </select>
          </div>
          <button
            className="bg-slate-700 p-3 text-white 
          rounded-lg hover:opacity-85"
          >
            Search
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl border-b-2 p-3 text-slate-700">
          Search Results
        </h1>
      </div>
    </div>
  );
};

export default Search;
