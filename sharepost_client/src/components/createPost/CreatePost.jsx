import React, { useContext, useEffect, useState } from "react";
import gallery from "../../assets/images/picture.png";
import video from "../../assets/images/video-camera.png";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import server from "../../routes/serverRoute";

const CreatePost = () => {
  const { user, access_token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const previews = Array.from(fileList).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles(fileList);
    setFilePreviews(previews);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((preview, index) => index !== indexToRemove)
    );
  };
  const [postInfo, setPostInfo] = useState({});

  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const uploadImages = ({ files }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uploadedUrls = [];

        const uploadPromises = [];

        for (const file of files) {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "HotelBook.com");
          data.append("cloud_name", "dox9ptswj");

          uploadPromises.push(
            axios.post(
              "https://api.cloudinary.com/v1_1/dox9ptswj/image/upload",
              data
            )
          );
        }

        const uploadResponses = await Promise.all(uploadPromises);

        uploadResponses.forEach((uploadRes) => {
          const { url } = uploadRes.data;
          uploadedUrls.push(url);
        });

        resolve(uploadedUrls);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handlePost = async () => {
    try {
      if (filePreviews.length === 0) {
        console.log("Please add images!!!");
        return;
      }

      const uploadedUrls = await uploadImages({ files });
      console.log("Uploaded URLs:", uploadedUrls);

      const response = await axios.post(
        `${server}/post/create/${access_token}/${user.id}`,
        { ...postInfo, images: uploadedUrls }
      );
      if (response.data.success) {
        console.log(response.data);
        setFilePreviews([]);
        setFiles([]);
        setPostInfo({});
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-normal w-full bg-cyan-100 rounded-md shadow-md gap-2 px-4 py-2">
      <div className="flex w-full font-semibold">Create Post</div>
      <div className="flex flex-col items-start justify-start w-full border-slate-700/25 border-[1px] rounded-md shadow-md px-4 py-2">
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex w-10 h-10 rounded-full overflow-hidden bg-slate-600">
            <img
              src={user?.profilePicture}
              className="w-10 h-10 object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-wrap items-center justify-between ">
            <div className="flex items-center justify-start gap-3">
              <label
                htmlFor="pictureUploader"
                className="flex items-center justify-start gap-1 px-2 py-1 bg-slate-300 rounded-xl text-sm cursor-pointer"
              >
                <img src={gallery} className="h-[25px]" alt="" />
                Gallery
              </label>
              <div className="flex items-center justify-start gap-1 px-2 py-1 bg-gray-300 rounded-xl text-sm cursor-pointer">
                <img src={video} className="h-[25px]" alt="" />
                Video
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              id="pictureUploader"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-4 gap-5">
          {filePreviews.length === 0 && (
            <label
              htmlFor="pictureUploader"
              className="cursor-pointer flex items-center justify-center w-[60px] h-[90px] bg-cyan-300 rounded-md"
            >
              <FaPlusCircle />
            </label>
          )}
          {filePreviews &&
            filePreviews.map((image, index) => {
              return (
                <div
                  key={index}
                  className="relative flex w-[60px] h-[90px] bg-cyan-300 rounded-md overflow-hidden"
                >
                  <img src={image} className="w-full object-cover" alt="" />
                  <div
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 cursor-pointer flex bg-white items-center justify-center h-max w-max rounded-full "
                  >
                    <IoMdCloseCircle />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex w-full flex-grow mt-3">
          <textarea
            name="description"
            value={postInfo?.description || ""}
            placeholder="What's on your mind...."
            className="w-full bg-transparent resize-none border-none focus:outline-none"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      {filePreviews.length > 0 && (
        <div className="flex flex-wrap items-center justify-end w-full ">
          <button
            className="flex items-center justify-start gap-1 px-2 py-1 bg-blue-600 text-white rounded-xl text-md  my-2"
            onClick={() => {
              handlePost();
            }}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
