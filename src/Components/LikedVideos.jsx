import React, { useEffect, useState } from "react";
import "./LikedVideos.css";
import Base from "../Base/Base";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Cards2 from "../container/Cards2";
import { fetchLikedVideos } from "../container/routes";

const LikedVideos = () => {
  let [video, setVideo] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    // fetching data
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchdata = async () => {
      let res = await fetchLikedVideos(token);
      setVideo(res);
      setLoading(false);
    };
    fetchdata();
  }, []);
  return (
    <Base>
      {loading && (
        <div className="loading-box">
          <CircularProgress />
        </div>
      )}
      <span className="subscription-header">
        <h2>Liked Videos</h2>
      </span>
      <div className="history-later-container">
        {video &&
          video.length &&
          video.map((data, key) => (
            <Cards2 video={data} key={key} route={`like/unlike-video`} />
          ))}
      </div>
    </Base>
  );
};

export default LikedVideos;
