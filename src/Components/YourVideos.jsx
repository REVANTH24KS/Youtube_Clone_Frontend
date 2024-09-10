import React, { useEffect, useState } from "react";
import "./YourVideos.css";
import Base from "../Base/Base.jsx";
import dummyData, { Views, truncateText } from "../container/service.js";
import asserts from "../assert.js";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { fetchUserVideo } from "../container/routes";
import Cards2 from "../container/Cards2";

//Backend URL
const api_url = asserts.backend_url;

const YourVideos = () => {
  let [videos, setVideos] = useState([]);
  let [loading, setLoading] = useState(true);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      let res=await fetchUserVideo(token)
      setVideos(res);
      setLoading(false);
    };
    fetchdata();
  }, []);
  return (
    <Base>
      <div className="yourvideos-container">
        <Button variant="contained" onClick={() => navigate("/post-videos")}>
          Upload New Video
        </Button>
        <div>
          {
            videos.map((val,key)=>(
              <Cards2 video={val} key={key} route={'video/delete-video'}/>
            ))
          }
        </div>
      </div>
    </Base>
  );
};

export default YourVideos;
