import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [sidebarhData, setSidebarhData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  //handleCHange
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarhData({ ...sidebarhData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarhData({ ...sidebarhData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarhData({
        ...sidebarhData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarhData({ ...sidebarhData, sort, order });
    }
    // const { id, type, checked, value } = e.target;
    // setSidebarhData((prevData) => ({
    //   ...prevData,
    //   [id]: type === "checkbox" ? checked : value,
    // }));
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarhData.searchTerm);
    urlParams.set("type", sidebarhData.type);
    urlParams.set("parking", sidebarhData.parking);
    urlParams.set("furnished", sidebarhData.furnished);
    urlParams.set("offer", sidebarhData.offer);
    urlParams.set("sort", sidebarhData.sort);
    urlParams.set("order", sidebarhData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-8 border-b-3 md:border-r-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebarhData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3 items-center  flex-wrap">
            <label className="font-semibold">Type</label>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.type === "all"}
              />
              <span> For Sale & Rent</span>
            </div>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.type === "rent"}
              />
              <span> Rent</span>
            </div>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.type === "sale"}
              />
              <span> Sale </span>
            </div>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.offer}
              />
              <span> Offer</span>
            </div>
          </div>
          <div className="flex gap-3 items-center  flex-wrap">
            <label className="font-semibold">Amenities</label>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.parking}
              />
              <span> Parking</span>
            </div>
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarhData.furnished}
              />
              <span> Furnished</span>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <label className="font-semibold">Sort by:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="p-3 border rounded-lg "
              name="sort_order"
              id="sort_order"
            >
              <option value="regularPrice_desc">Price Low - High </option>
              <option value="regularPrice_asc">Price High - Low </option>
              <option value="created_at_desc">Recent</option>
              <option value="created_at_asc"> Oldest </option>
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
