import React, { useContext } from "react";
import "./Posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authcontext";
import Post from "../Post/Post";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      console.log("check post user id", data);
      return res.data;
    })
  );

  const { currentUser } = useContext(AuthContext);
  console.log("check current user id", currentUser.id);
  console.log("from post id", userId);

  let content;

  if (error) {
    content = "Something went wrong!";
  } else if (isLoading) {
    content = "Loading...";
  } else if (data && data.length > 0) {
    content = data.map((post) => <Post post={post} key={post.id} />);
  } else if (userId === "undefined") {
    content = (
      <div className="not">
        <h2>She Hasn't Posted Anything</h2>
      </div>      
    );
  } else if (currentUser.id !== userId) {
    content = (
      <div className="welcome">
        <h1>
          WELCOME TO FRIEND ZONE <span>{currentUser.username}</span>
        </h1>
        <h2>Go to the create page to make new posts</h2>
      </div>
    );
  } else {
    content = <h1>You Haven't Posted Anything</h1>;
  }

  return <div className="posts">{content}</div>;
};

export default Posts;
