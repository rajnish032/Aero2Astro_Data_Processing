import React, { useState } from "react";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
export default function Portfolio({
  setCurrentUser,
  currentUser,
  giveControl,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("image");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  //image control
  const goToNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % currentUser?.portfolioImage?.length
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentUser?.portfolioImage?.length - 1 : prevIndex - 1
    );
  };
 
  const handleFileUpload = async (file) => {
    const MAX_FILE_SIZE = 500 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File must be under 500 KB.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    const token = cookies.get("auth");
    try {
      const response = await axios.post(
        `${reqUrl}/user/details/addPortfolioImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const updatedPortfolio = [
          ...(currentUser?.portfolioImage || []),
          response?.data?.secure_url,
        ];
        setCurrentUser({ ...currentUser, portfolioImage: updatedPortfolio });
        toast.success(response.data.message || "Image added successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.response?.data?.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const openDialog = (inputType) => {
    if (inputType === "fileInput") {
      document.getElementById("fileInput").click();
    } else {
      document.getElementById("urlInput").click();
    }
  };
  const handleDeleteImage = async (index) => {
    setIsDeleting(true);
    const url = currentUser?.portfolioImage[index];
    const token = cookies.get("auth");

    try {
      const response = await axios.delete(
        `${reqUrl}/user/details/deletePortfolioImage`,
        {
          data: { index, url },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedPortfolio = currentUser?.portfolioImage?.filter(
          (url, i) => i != index
        );
        setCurrentUser({ ...currentUser, portfolioImage: updatedPortfolio });
        goToPrev();
        toast.success(response.data.message || "Image deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.message || "Failed to delete image.");
    } finally {
      setIsDeleting(false);
    }
  };

  //video control
  const handleVideoUpload = async () => {
    if (!youtubeUrl || youtubeUrl === "") {
      toast.error("Invalid Input");
      return;
    }
    setIsUploading(true);
    const token = cookies.get("auth");
    try {
      const response = await axios.post(
        `${reqUrl}/user/details/addPortfolioVideo`,
        { url: youtubeUrl }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const updatedPortfolio = [
          ...(currentUser?.portfolioVideo || []),
          response?.data?.videoUrl,
        ];
        setCurrentUser({ ...currentUser, portfolioVideo: updatedPortfolio });
        toast.success(response.data.message || "Video added successfully!");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error(error.response?.data?.message || "Failed to upload video.");
    } finally {
      setIsUploading(false);
      setYoutubeUrl("");
    }
  };

  const handleDeleteVideo= async (index) => {
    setIsDeleting(true);
    const url = currentUser?.portfolioVideo[index];
    const token = cookies.get("auth");

    try {
      const response = await axios.delete(
        `${reqUrl}/user/details/deletePortfolioVideo`,
        {
          data: { url },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedPortfolio = currentUser?.portfolioVideo?.filter(
          (url, i) => i != index
        );
        setCurrentUser({ ...currentUser, portfolioVideo: updatedPortfolio });
        goToPrevVideo();
        toast.success(response.data.message || "Video deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error(error.response?.data?.message || "Failed to delete video.");
    } finally {
      setIsDeleting(false);
    }
  };
  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? currentUser?.portfolioVideo?.length - 1 : prevIndex - 1
    );
  };
  const goToNextVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % currentUser?.portfolioVideo?.length
    );
  };

  return (
    <div className="rounded-md shadow relative bg-white">
      <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-800">
        <MdPermMedia className="" /> Portfolio
      </h2>
      {/* swith between video and image */}
      <div className="w-full ml-4 mt-2 flex gap-x-1 rounded-full overflow-hidden text-xs mb-6">
        {["image", "video"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-2 py-1 rounded-full ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-blue-400`}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory === "image" ? (
        <div className="relative w-full mx-auto">
          {/* Image Display */}
          {currentUser?.portfolioImage?.length > 0 ? (
            <div className="relative w-full">
              <img
                src={`${currentUser?.portfolioImage[currentIndex]}`}
                alt="image"
                className="w-full min-h-80 object-cover rounded-xl shadow-md"
              />
              {giveControl &&
                (isDeleting ? (
                  <div className="absolute top-2 right-2 flex flex-col items-center justify-center gap-2">
                    <span className="h-5 w-5 border-l-2 border-t-2  border-red-500 animate-spin rounded-full"></span>{" "}
                    <span className="text-xs text-red-500">Deleting...</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteImage(currentIndex)}
                    className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow hover:text-red-800"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                ))}
              {/* Dots Navigation */}
              <div className="flex absolute bottom-2 left-1/2 -translate-x-1/2 justify-center mt-4 space-x-2">
                {currentUser?.portfolioImage?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3  rounded-full ${
                      index === currentIndex ? "bg-blue-800" : "bg-blue-500"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-lg font-bold flex justify-center items-center w-full h-64">
              No Image Uploaded
            </div>
          )}

          {/* Navigation Buttons */}
          {currentUser?.portfolioImage?.length > 0 && (
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 bg-white rounded-full p-2 shadow hover:text-gray-800"
            >
              <AiOutlineLeft size={24} />
            </button>
          )}
          {currentUser?.portfolioImage?.length > 0 && (
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 bg-white rounded-full p-2 shadow hover:text-gray-800"
            >
              <AiOutlineRight size={24} />
            </button>
          )}

          {/* Add Image Button */}
          {giveControl && (
            <div className="flex justify-center mt-4 pb-2">
              <button
                onClick={() => openDialog("fileInput")}
                disabled={isUploading}
                className="flex items-center space-x-2 text-blue-600 bg-white border border-blue-600 rounded-full px-4 py-2 shadow hover:bg-blue-600 hover:text-white"
              >
                <BsPlusCircle size={20} />
                <span>{isUploading ? "Uploading..." : "Add Image"}</span>
              </button>
            </div>
          )}
          {/* Hidden File Input */}

          <input
            type="file"
            id="fileInput"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative w-full mx-auto">
          {/* Video Display */}
          {currentUser?.portfolioVideo?.length > 0 ? (
            <div className="relative w-full">
              <div className="w-full" style={{ maxHeight: "400px" }}>
                {" "}
                {/* Adjusted max height */}
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "30%",
                    height: 0,
                    overflow: "hidden",
                    maxWidth: "100%",
                    background: "#000",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${
                      currentUser?.portfolioVideo[currentVideoIndex]
                        ?.split("v=")[1]
                        ?.split("&")[0]
                    }?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  />
                </div>
              </div>
              {giveControl &&
                (isDeleting ? (
                  <div className="absolute top-2 right-2 flex flex-col items-center justify-center gap-2">
                    <span className="h-5 w-5 border-l-2 border-t-2  border-red-500 animate-spin rounded-full"></span>{" "}
                    <span className="text-xs text-red-500">Deleting...</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteVideo(currentVideoIndex)}
                    className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow hover:text-red-800"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                ))}
              {/* Dots Navigation */}
              <div className="flex absolute bottom-2 left-1/2 -translate-x-1/2 justify-center mt-4 space-x-2">
                {currentUser?.portfolioVideo?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3  rounded-full ${
                      index === currentVideoIndex ? "bg-blue-800" : "bg-blue-500"
                    }`}
                    onClick={() => setCurrentVideoIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-lg font-bold flex justify-center items-center w-full h-64">
              No Video Uploaded
            </div>
          )}

          {/* Navigation Buttons */}
          {currentUser?.portfolioImage?.length > 0 && (
            <button
              onClick={goToPrevVideo}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 bg-white rounded-full p-2 shadow hover:text-gray-800"
            >
              <AiOutlineLeft size={24} />
            </button>
          )}
          {currentUser?.portfolioImage?.length > 0 && (
            <button
              onClick={goToNextVideo}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 bg-white rounded-full p-2 shadow hover:text-gray-800"
            >
              <AiOutlineRight size={24} />
            </button>
          )}

          {/* Add video Button */}
          {giveControl && (
            <div className="flex justify-center mt-8 pb-2">
              <input
                type="url"
                id="urlInput"
                disabled={isUploading}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                value={youtubeUrl}
                placeholder={`${
                  isUploading ? "Uploading..." : "Paste Youtube Video url"
                }`}
                className="border rounded-md px-3 py-2 text-black outline-none"
              />
              <button
                onClick={handleVideoUpload}
                disabled={isUploading}
                className="flex ml-2 text-sm font-semibold items-center space-x-2 text-blue-600 bg-white border border-blue-600 rounded-full px-4 py-2 transition-all duration-200 shadow hover:bg-blue-600 hover:text-white"
              >
                <span>{isUploading ? "Uploading..." : "Upload"}</span>
              </button>
            </div>
          )}
          {/* Hidden File Input */}
        </div>
      )}
    </div>
  );
}
