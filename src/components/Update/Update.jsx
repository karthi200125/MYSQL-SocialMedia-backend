import React, { useContext, useState } from 'react';
import { makeRequest } from '../../axios';
import './Update.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';
import {AiOutlineUpload} from 'react-icons/ai'

const Update = ({ user, setOpenUpdate }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email:user.email,
    username: user.username,
    city: user.city,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { currentUser, token } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${token}`,
    'X-User-ID': currentUser.id.toString(),
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      return makeRequest.put('/users', data, { headers });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    const updatedData = { ...texts, profilePic: profileUrl, coverPic: coverUrl };
    mutation.mutate(updatedData);
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  
  return (
    <div className='update'>
      <div className="wrapper">
      <form>

      <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <AiOutlineUpload className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <AiOutlineUpload className="icon"/>
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

        <label>Email</label>
        <input type='text' name='email' value={texts.email} onChange={handleChange} />
        <label>User Name</label>
        <input type='text' name='username' value={texts.username} onChange={handleChange} />
        <label>City Name</label>
        <input type='text' name='city' value={texts.city} onChange={handleChange} />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button className="close" onClick={() => setOpenUpdate(false)}>X</button>
    </div>
    </div>
  );
};

export default Update;
