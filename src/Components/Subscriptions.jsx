import React, { useEffect, useState } from "react";
import "./Subscriptions.css";
import Base from "../Base/Base";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../container/Cards";
import { useNavigate } from "react-router";
import { fetchSubscription } from "../container/routes";

const Subscriptions = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  //Getting Channels
  useEffect(() => {
    async function fetchData() {
      if (!token) {
        navigate("/login");
      }
      let res = await fetchSubscription(token);
      setData(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Base>
      {loading && (
        <div className="loading-box">
          <CircularProgress />
        </div>
      )}
      <span className="subscription-header">
        <h2>Your Subcribtions</h2>
      </span>
      {!loading && (
        <div className="subcription-container">
          {data && data.map((val, ind) => <Cards key={ind} video={val} />)}
        </div>
      )}
    </Base>
  );
};

export default Subscriptions;
