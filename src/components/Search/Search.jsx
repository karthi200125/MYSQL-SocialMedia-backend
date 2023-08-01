import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import React from 'react';
import './Search.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get(`/users?userId=${userId}`)
      .then((res) => res.data)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Something went wrong!</span>;
  }

  const uniquePosts = Array.from(new Set(data.map((post) => post.userId)))
    .map((userId) => data.find((post) => post.userId === userId))
    .filter(Boolean);

  return (
    <div className="searchs">
      <div className="search">
        <SearchOutlinedIcon className="icon" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="search-content">
        {uniquePosts.map((post) => (
          <div className="item" key={post.userId}>
            <div className="userInfo">
              <img src={`/upload/${post.profilePic}`} alt="" />
              <span>{post.name}</span>
            </div>        
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
