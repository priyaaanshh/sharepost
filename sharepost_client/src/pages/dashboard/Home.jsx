import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import CreatePost from "../../components/createPost/CreatePost";
import Sidebar from "../../components/sidebar/Sidebar";
import RightSidebar from "../../components/sidebar/RightSidebar";
import axios from "axios";
import server from "../../routes/serverRoute";

import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  
  const getPost = async () => {
    try {
      const response = await axios.get(`${server}/post/get/${page}/${10}`);
      if (response.data.posts) {
        setLoading(false);
        setPosts((prevPosts) => {
          const newPosts = response.data.posts.filter(
            (newPost) =>
              !prevPosts.some((prevPost) => prevPost._id === newPost._id)
          );
          return [...prevPosts, ...newPosts];
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // getPost();

  useEffect(() => {
    getPost();
  }, [page]);

  const handelInfiniteScroll = async () => {
    if (page > posts.length) {
      return;
    }
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 500 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div
      className="flex w-full justify-center sm:justify-between bg-cyan-50
    "
    >
      <div className="hidden sm:flex">
        <Sidebar />
      </div>
      <div className="flex flex-col items-center justify-start w-full px-2">
        <div className="max-w-[400px] w-full sm:max-w-[500px] mt-2">
          <CreatePost />
          {posts.map((post, index) => (
            <Card post={post} key={index} />
          ))}
          <div className="flex py-2 w-full items-center justify-center">
            <FadeLoader
              color={"#123abc"}
              loading={loading}
              css={override}
              size={150}
            />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
