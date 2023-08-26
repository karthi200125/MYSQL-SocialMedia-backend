import React, { useContext, useState } from "react";
import "./Stories.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser, token } = useContext(AuthContext);
  const [storyimg, setStoryImg] = useState(null);


  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    "X-User-ID": currentUser.id.toString(),
  };

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories", { headers }).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      return makeRequest.put("/stories/add", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]); 
      },
    }
  );

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];    
    setStoryImg(selectedFile);
    let storyUrl = storyimg;
    if (selectedFile) {
      storyUrl = await upload(selectedFile);
    }
    const updatedData = { img: storyUrl };
    mutation.mutate(updatedData);
  };

  console.log(currentUser)
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.username}</span>

        <label htmlFor="profile" className="btn-label">
          <span className="btn">+</span>
        </label>
        <input
          type="file"
          id="profile"
          style={{ display: "none" }}
          onChange={handleSubmit}
        />
      </div>

      {data &&
        data.map((story) => (
          <div className="story" key={story.id}>
            <img src={"/upload/" + story.img} alt="" />
            <span>{story.username}</span>
          </div>
        ))}
    </div>
  );
};

export default Stories;
