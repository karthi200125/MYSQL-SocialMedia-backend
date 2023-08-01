import React, { useState, useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Posts from "../../components/posts/Posts";
import "./profile.scss";
import {AiFillFacebook ,AiFillLinkedin,AiFillTwitterCircle,AiFillInstagram,AiOutlineMore,AiOutlineMail} from 'react-icons/ai'
import {BsPinterest} from 'react-icons/bs'
import {BiLocationPlus} from 'react-icons/bi'
import {GrLanguage} from 'react-icons/gr'


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get(`/users/find/${userId}`).then((res) => res.data)
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  if (isLoading) {
    return "Loading...";
  }

  const { name, city, website, coverPic, profilePic } = data;

  return (
    <div className="profile">
      <div className="images">
        <img src={`/upload/${coverPic}`} alt="" className="cover" />
        <img src={`/upload/${profilePic}`} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">              
              <AiFillFacebook size={25} className="fb" />
            </a>
            <a href="http://instagram.com">
              <AiFillInstagram size={25} className="ig" />
            </a>
            <a href="http://twitter.com">
              <AiFillTwitterCircle size={25} className="tw" />
            </a>
            <a href="http://linkedin.com">
              <AiFillLinkedin size={25} className="li" />
            </a>
            <a href="http://pinterest.com">
              <BsPinterest size={25} className="pr" />
            </a>
          </div>
          <div className="center">
            <span>{name}</span>
            <div className="info">
              <div className="item">
                <BiLocationPlus className="location" size={25}/>
                <span>{city}</span>
              </div>
              <div className="item">
                <GrLanguage className="world" size={25}/>
                <span>{website}</span>
              </div>
            </div>
            {rIsLoading ? (
              "Loading..."
            ) : userId === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <AiOutlineMore size={25}/> 
            <AiOutlineMail size={25}/>
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
