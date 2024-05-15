import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        </>
      )}
    </main>
  );
};

export default Listing;
