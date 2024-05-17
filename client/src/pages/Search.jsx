import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

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

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings);
  //handleCHange
  const handleChange = (e) => {
    // Handle changes for type selection
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      // Update the type in state based on the selected option
      setSidebarhData({ ...sidebarhData, type: e.target.id });
    }

    // Handle changes for search term input
    if (e.target.id === "searchTerm") {
      // Update the search term in state
      setSidebarhData({ ...sidebarhData, searchTerm: e.target.value });
    }

    // Handle changes for checkbox inputs (parking, furnished, offer)
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      // Update the corresponding checkbox value in state
      setSidebarhData({
        ...sidebarhData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    // Handle changes for sorting dropdown
    if (e.target.id === "sort_order") {
      // Split the value of the selected option to get sort and order
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      // Update the sort and order in state
      setSidebarhData({ ...sidebarhData, sort, order });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the search query from the state
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarhData.searchTerm);
    urlParams.set("type", sidebarhData.type);
    urlParams.set("parking", sidebarhData.parking);
    urlParams.set("furnished", sidebarhData.furnished);
    urlParams.set("offer", sidebarhData.offer);
    urlParams.set("sort", sidebarhData.sort);
    urlParams.set("order", sidebarhData.order);
    const searchQuery = urlParams.toString();

    // Navigate to the search page with the constructed search query
    navigate(`/search?${searchQuery}`);
  };

  // Use effect to fetch listings when location.search changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // Update state with search parameters from URL
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarhData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    // Function to fetch listings based on search query
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    // Call fetchListings function
    fetchListings();
  }, [location.search]);

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
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {console.log(loading, listings)}
          {!loading &&
            listings &&
            listings.map((listings) => (
              <ListingItem key={listings._id} listing={listings} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
