import React, { useEffect, useState } from "react";
import "./Channel.css";
import Base from "../Base/Base";
import { useNavigate, useParams } from "react-router";
import { Avatar, Typography } from "@mui/material";
import Cards from "../container/Cards";
import { fetchChannels, fetchSubscriberCount, getUser, subscribe } from "../container/routes";
import { Views } from "../container/service";
import CircularProgress from "@mui/material/CircularProgress";

const Channel = () => {
  let id = useParams("id");
  let [data, setData] = useState([]);
  let [channel, setChannel] = useState([]);
  let [loading, setLoading] = useState(true);
  let [isOwner, setIsOwner] = useState(false);
  let [subscribers, setSubscribers] = useState(0);
  let [isSubscribed, setIsSubscribed] = useState(false);
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  //Getting Channels
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    async function getData() {
      let res = await fetchChannels({ token, id: id.name });
      setChannel(res.channel);
      setData(res.Video);
      setIsOwner(res.isOwner);
      setLoading(false);
      //Get subscribers
      let subscribes = await fetchSubscriberCount({ id: id.name });
      let formattedSubscribers = Views({ views: subscribes });
      setSubscribers(formattedSubscribers);
    }
    getData();
    async function getUserData() {
      let res = await getUser(token);
      console.log(id);
      if (res.subscribing.length && res.subscribing.includes(id.name)) {
        setIsSubscribed(true);
      }
    }
    getUserData()
  }, []);
  return (
    <Base>
      {loading && (
        <div className="loading-box">
          <CircularProgress />
        </div>
      )}
      <div className="channel-container">
        {channel && (
          <div className="channel-header">
            <Avatar
              sx={{
                bgcolor: "red[500]",
                marginRight: "8px",
                width: 100,
                height: 100,
              }}
              src={channel.img}
              alt={channel.name}
            />
            <div className="channel-details">
              <Typography sx={{ fontSize: "28px" }}>{channel.name}</Typography>
              <Typography sx={{ fontSize: "18px" }}>
                {subscribers} Subscribers{" "}
                <button
                  className="subscribe-btn"
                  onClick={() => subscribe({ id: id.name, token })}
                >
                  
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              </Typography>
            </div>
          </div>
        )}

        {data && (
          <div className="channel-videos">
            {data.map((val, ind) => (
              <Cards video={val} key={ind} />
            ))}
          </div>
        )}
        {!data && (
          <div className="channel-no-video">
            {!isOwner && (
              <div className="user">
                <img
                  src="https://i1.sndcdn.com/artworks-000221547106-q9j673-t500x500.jpg"
                  alt="no content"
                  className="no-content-img"
                />
                <Typography sx={{ fontSize: "24px" }}>
                  This channel doesn't have any content!
                </Typography>
              </div>
            )}

            {isOwner && (
              <div className="user">
                <img
                  src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg"
                  alt="no content"
                  className="no-content-img"
                />
                <>
                  <Typography sx={{ fontSize: "18px" }}>
                    Create Content on any device
                  </Typography>
                  <Typography sx={{ fontSize: "18px" }}>
                    Upload and record at home or on the go.Everything that you
                    make public will appear here.
                  </Typography>
                </>
                <button
                  className="create-btn"
                  onClick={() => navigate("/post-videos")}
                >
                  Create
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Base>
  );
};

export default Channel;
