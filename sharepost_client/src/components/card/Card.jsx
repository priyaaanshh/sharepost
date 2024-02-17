import React, { useState } from "react";
import Carousel from "../carousel/Carousel";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { VscSend } from "react-icons/vsc";

const Card = ({ post }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [linesToDisplay, setLinesToDisplay] = useState(1);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionLines = () => {
    const description = post.description;
    if (description === "" || !description) return "";
    return description.substring(0, 80) + "...";
  };

  return (
    <div className="w-full bg-cyan-100 rounded-md shadow-md my-2">
      <div className="flex items-center justify-between px-4 py-2 text-lg">
        <div className="flex items-center justify-start gap-2">
          <div className="flex w-[35px] h-[35px] rounded-full bg-slate-700 overflow-hidden">
            <img src={post.profilePicture} alt="" />
          </div>
          <div className="text-base font-semibold">{post.username}</div>
        </div>
        <SlOptionsVertical className="cursor-pointer w-5 h-5" />
      </div>
      <Carousel images={post.images} />
      <div className="flex flex-col px-4 py-2 gap-1">
        <div className="flex items-center w-full justify-between ">
          <div className="flex items-center justify-start gap-5">
            <FaRegHeart className="cursor-pointer w-5 h-5" />
            <FaRegComment className="cursor-pointer w-5 h-5" />
            <VscSend className="cursor-pointer w-5 h-5" />
          </div>
          <FaRegBookmark className="cursor-pointer w-5 h-5" />
        </div>
        <div className="flex text-sm font-semibold">
          {post.likesCount} likes
        </div>

        <div className="flex text-sm items-center whitespace-pre-line">
          {showFullDescription ? post.description : getDescriptionLines()}
        </div>
        <button className="flex text-xs" onClick={toggleDescription}>
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
        {post.commentsCount > 0 && (
          <div className="flex text-sm cursor-pointer">
            View all {post.commentsCount} comments
          </div>
        )}
        <div className="flex w-full">
          <input
            type="text"
            className="w-full bg-transparent py-2"
            placeholder="Add a comment..."
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
