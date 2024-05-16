import axios from "axios";
import { list } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState(null);

  //handleMessageChange
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/user/${listing.userRef}`);
        setLandLord(res.data.rest);
        console.log(landLord.username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []); // Empty dependency array since you only want this effect to run once

  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for {"    "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows={2}
            value={message}
            onChange={handleMessageChange}
            className="w-full border border-gray-300 p-3"
          ></textarea>
          <Link
            to={`mailto:${landLord.email}?Subject:Regardind ${listing.name}&body:${message}`}
            className="bg-slate-700 rounded-lg text-white p-2 uppercase hover:opacity-80 text-center"
          >
            Send Message
          </Link>
        </div>
      )}{" "}
    </>
  );
};

export default Contact;
