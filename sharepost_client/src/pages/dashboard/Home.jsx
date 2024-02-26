import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import CreatePost from "../../components/createPost/CreatePost";
import Sidebar from "../../components/sidebar/Sidebar";
import RightSidebar from "../../components/sidebar/RightSidebar";
import axios from "axios";
import server from "../../routes/serverRoute";
import InfiniteScroll from "react-infinite-scroll-component";

import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = () => {
  const limit = 2;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const response = await axios.get(`${server}/post/get/${page}/${limit}`);
      if (response.data.posts.length === 0) {
        setHasMore(false);
      }
      if (response.data.posts) {
        setPosts((prevPosts) => {
          const newPosts = response.data.posts.filter(
            (newPost) =>
              !prevPosts.some((prevPost) => prevPost._id === newPost._id)
          );
          return [...prevPosts, ...newPosts];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [page]);

  return (
    <div
      className="flex w-full justify-center sm:justify-between bg-cyan-50
    "
    >
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col items-center justify-start w-full px-2">
        <div className="max-w-[400px] w-full sm:max-w-[500px] mt-2">
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={() => {
              setPage(page + 1);
            }}
            hasMore={hasMore}
            loader={
              <div className="flex py-2 w-full items-center justify-center">
                <FadeLoader
                  color={"#123abc"}
                  loading={true}
                  css={override}
                  size={150}
                />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                Looks like you've reached end of the result.
              </p>
            }
            style={{
              overflow: "hidden",
            }}
          >
            <CreatePost />
            {posts.map((post, index) => (
              <Card post={post} key={index} />
            ))}
            {posts.length === 0 && (
              <div className="flex py-2 w-full items-center justify-center">
                <FadeLoader
                  color={"#123abc"}
                  loading={true}
                  css={override}
                  size={150}
                />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>

      <div className="flex">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
