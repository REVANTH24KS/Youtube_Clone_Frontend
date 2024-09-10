import React, { useEffect, useState } from "react";
import "./Watchlater.css";
import Base from "../Base/Base";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Cards2 from "../container/Cards2";
import { fetchWatchLater } from "../container/routes";

const Watchlater = () => {
  let [video, setVideo] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    // fetching data
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchdata = async () => {
      let res = await fetchWatchLater(token);
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
        <h2>Your WatchLater Videos</h2>
      </span>
      <div className="watch-later-container">
        {video &&
          video.length &&
          video.map((data, key) => (
            <Cards2
              video={data}
              key={key}
              route={`watchlater/remove-watchlater`}
            />
          ))}
      </div>
    </Base>
  );
};

export default Watchlater;
