import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  /////////////////////////////
  useEffect(() => {
    const getSingleListing = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/listing/getsinglelisting/${params.id}`
        );
        if (res.data.success === false) {
          toast.error(res.data.message);
          setError(true);
          setLoading(false);
          return;
        }
        setError(false);
        setLoading(false);

        setListing(res.data.listing);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setError(true);
        setLoading(false);
      }
    };

    getSingleListing();
  }, [params.id]); // Empty dependency array since you only want this effect to run once

  return (
    <main>
      {loading && <p className="text-center text-2xl my-7">Loading.....</p>}
      {error && (
        <div className="text-center">
          {" "}
          <p className="text-center text-2xl my-7">Something went wrong!</p>
          <span className="text-center my-5 text-green-700 text-2xl">
            {" "}
            <Link to={"/"}>Go Back</Link>
          </span>
        </div>
      )}
      {listing && !loading && !error && (
        <>
          {" "}
          <Swiper navigation>
            {listing?.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] "
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>{" "}
          {listing && (
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} - ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-3"
                  >
                    Contact landlord
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Listing;
