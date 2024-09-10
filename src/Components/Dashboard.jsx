import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Base from "../Base/Base";
import Cards from "../container/Cards";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { fetchVideos } from "../container/routes";

const Dashboard = () => {
  let [video, setVideo] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchdata = async () => {
      let res = await fetchVideos(token);
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
      {!loading && (
        <div className="dashboard-container">
          {video && video.map((val, ind) => <Cards key={ind} video={val} />)}
        </div>
      )}
    </Base>
  );
};

export default Dashboard;
