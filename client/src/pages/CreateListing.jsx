import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //handleImageSubmit
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      // As we have multiple images, to avoid more time, we generate multiple promises at a time
      const promises = [];
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setLoading(false);
        })
        .catch((error) => {
          setImageUploadError("Error Uploading Images (max 2mb per)");
          setLoading(false);
        });
    } else {
      setImageUploadError("You can upload only 6 Images (max 2mb per image)");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  //handleImageDelete
  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, url) => url !== index),
    });
  };

  //handleChange
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  //handleFormSubmit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //validation agr koi image nahi h
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice <= +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/v1/listing/create", {
        ...formData,
        userRef: currentUser.id,
      });
      if (res.data.success === false) {
        setError(true);
        setLoading(false);
        toast.error(res.data.error);
        return;
      } else {
        setLoading(false);
        setError(false);
        toast.success(res.data.message);
        setFormData({
          imageUrls: [],
          name: "",
          description: "",
          address: "",
          type: "rent",
          bedrooms: 1,
          bathrooms: 1,
          regularPrice: 50,
          discountPrice: 0,
          offer: false,
          parking: false,
          furnished: false,
        });
        console.log(res.data);
        navigate(`/listing/${res.data.listing._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center my-7">Post Your add</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Name"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <textarea
            id="description"
            onChange={handleChange}
            value={formData.description}
            type="text"
            placeholder="description"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <input
            id="address"
            onChange={handleChange}
            value={formData.address}
            type="text"
            placeholder="address"
            required
            maxLength={60}
            minLength={10}
            className="p-3 border rounded-lg"
          />
          <div className="flex flex-wrap gap-6 ">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "sale"}
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                type="checkbox"
                id="rents"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.parking}
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>parking slot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 ">
            <div className="flex items-center gap-3">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths </p>
            </div>
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                checked={formData.regularPrice}
                required
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                min="0"
                max="10000000"
                id="regularPrice"
              />
              <div className="">
                <p>Regular Price</p>
                <span className="text-sm">($/ month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-3">
                <input
                  onChange={handleChange}
                  checked={formData.discountPrice}
                  className="p-3 border border-gray-300  rounded-lg"
                  type="number"
                  min="0"
                  max="10000000"
                  id="discountPrice"
                />
                <div className="">
                  <p>Discounted Price</p>
                  <span className="text-sm">($/ month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-400 ml-2">
              Fisrt Image will be the cover (max 6 images)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 w-full rounded-lg"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={loading}
              type="button"
              onClick={handleImageSubmit}
              className="disabled:bg-opacity-80 uppercase p-3 border border-green-700 rounded hover:shadow-lg"
            >
              {loading ? "Loading..." : "Upload"}
            </button>
            <span className="text-red-700 font-semibold">
              {imageUploadError && imageUploadError}
            </span>
          </div>
          <div className="">
            {formData?.imageUrls.length > 0 &&
              formData.imageUrls.map((imageUpload, index) => (
                <div
                  key={imageUpload}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={imageUpload}
                    alt="listing-images"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="p-3 text-red-700 font-semibold rounded-lg 
                  hover:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white hover:opacity-90 rounded-lg "
          >
            {loading ? "Loading..." : "Create Listing"}
          </button>
          {error && (
            <p className="text-red-700"> {error || "Something Went Wrong!"}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
