import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import Base from "../Base/Base";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import asserts from "../assert";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Days, Views, truncateText } from "../container/service";
import Cards from "../container/Cards";
import Cards3 from "../container/Cards3";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Avatar,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import CommentsCard from "../container/CommentsCard";
import {
  UpdateViews,
  addVideotoHistory,
  fetchSubscriberCount,
  fetchVideos,
  getUser,
  likeVideo,
  subscribe,
  watchlater,
} from "../container/routes";
import { Helmet } from "react-helmet";

//Backend URL
const api_url = asserts.backend_url;

const PlayVideo = () => {
  let { id: currentId } = useParams();
  let [loading, setLoading] = useState(true);
  let [video, setVideo] = useState({});
  let [data, setData] = useState([]);
  let [body, setBody] = useState("");
  let [views, setViews] = useState("");
  let [daysAgo, setDaysAgo] = useState("");
  let [userComment, setUserComment] = useState("");
  let [showMore, setShowMore] = useState(false);
  let [showComment, setShowComment] = useState(false);
  let [likes, setLikes] = useState(0);
  let [isLiked, setIsLiked] = useState(false);
  let [isSubscribed, setIsSubscribed] = useState(false);
  let [subscriber, setSubscribers] = useState(0);
  let [helmet, setHelmet] = useState("")
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  // State to keep track of the previous id
  const [prevId, setPrevId] = useState(currentId);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    async function fetchData() {
      let res = await fetchVideos(token);
      let temp = [];
      res.map((val) => {
        if (val._id == currentId) {
          setVideo(val);
        } else {
          temp.push(val);
        }
      });
      setData([...temp]);
      setLoading(false);
      UpdateViews({ token, id: currentId });
      addVideotoHistory({ token, id: currentId });
    }
    fetchData();

    setLoading(false);
  }, [currentId]);

  useEffect(() => {
    // Check if the currentId is different from the previous id
    if (currentId !== prevId) {
      // Update the previous id
      setPrevId(currentId);
      // Reload the page when the id changes
      window.location.reload();
    }
  }, [currentId, prevId]);

  //Get subscribers
  async function getsubscribers() {
    let subscribes = await fetchSubscriberCount({ id: video.creator });
    let formattedSubscribers = Views({ views: subscribes });
    setSubscribers(formattedSubscribers);
  }

  async function getData() {
    let res = await getUser(token);
    if (res.likedVideos.includes(currentId)) {
      setIsLiked(true);
    }
    if (res.subscribing.includes(video.creator)) {
      setIsSubscribed(true);
    }
  }

  //After Getting Video
  useEffect(() => {
    if (video.date) {
      setBody(video.body);
      setDaysAgo(Days({ date: video.date }));
      setViews(Views({ views: video.views }));
      setLikes(Views({ views: video.likes.length }));
      setVideo(video);
      getsubscribers();
      let helmet=truncateText(video.title,10);
      setHelmet(helmet);
    }

    getData();
  }, [video]);
  //onClick Show more
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncatedDescription = truncateText(body, 300);
  const displayedDescription = showMore ? body : truncatedDescription;

  //onClick Show Comment
  const toggleShowComment = () => {
    setShowComment(!showComment);
  };

  //Function to post comment
  async function postComment() {
    let comment = userComment;
    try {
      let response = await axios.put(
        `${api_url}/comment/comment/${currentId}`,
        { comment },
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      setUserComment("");
    } catch {
      alert("Can't post comment, try again later");
    }
  }
  // Play the next video
  const playNextVideo = () => {
    navigate(`/play/${data[4]._id}`);
  };
  return (
    <Base>
    
      {loading && (
        <div className="loading-box">
          <CircularProgress />
        </div>
      )}
      {data.length > 0 && video && video.video && (
        <div className="video-player-box">
          <Helmet>
        <title>{helmet} | YouTube</title>
      </Helmet>
          {/* Current Video Playing */}
          <span className="youtube-video-container">
            {/* Video and titles */}
            <div className="youtube-video-player">
              {video && video.video && (
                <div className="video-container">
                  <video
                    className="video"
                    controls
                    autoPlay
                    onEnded={playNextVideo}
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div className="video-details">
                <h2>{video.title}</h2>
                <span className="video-logo">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "red[500]",
                        marginRight: "8px",
                        border: "1px solid gray",
                        borderRadius: "50px",
                        cursor: "pointer",
                      }}
                      src={video.img}
                      alt={video.title}
                      onClick={() => navigate(`/channel/${video.creator}`)}
                    />
                    <p>{video.channelName}</p>
                    <button
                      className="subscribe-btn"
                      onClick={() => {subscribe({ id: video.creator, token });setIsSubscribed(true)}}
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                    <br />
                  </span>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <button
                      className="likes-btn"
                      onClick={() => {likeVideo({ id: currentId, token });setIsLiked(true)}}
                    >
                      {!isLiked ? (
                        <ThumbUpOffAltIcon sx={{ cursor: "pointer" }} />
                      ) : (
                        <ThumbUpAltIcon sx={{ cursor: "pointer" }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        style={{
                          marginLeft: "4px",
                          marginRight: "4px",
                          fontSize: "16px",
                        }}
                      >
                        |
                      </Typography>
                      {likes} likes
                    </button>
                    <button
                      className="save-btn"
                      onClick={() => watchlater({ id: currentId, token })}
                    >
                      <PlaylistAddIcon sx={{ cursor: "pointer" }} />
                      Save
                    </button>
                  </span>
                </span>
                <p className="subscribers-subscribers">
                  {subscriber} Subscribers
                </p>
              </div>
            </div>
            {/* Body of the video */}
            <div className="video-body">
              <p>
                {views}views | {daysAgo}
              </p>
              {displayedDescription}
              <button className="showmore-btn" onClick={toggleShowMore}>
                {showMore ? "Showless" : "more"}
              </button>
            </div>
            {/* Comments */}
            <div className="video-comments">
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Add a Comment
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">Comment: </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      <SendIcon
                        onClick={postComment}
                        sx={{ cursor: "pointer" }}
                      />{" "}
                    </InputAdornment>
                  }
                />
              </FormControl>
              <span>
                {showComment &&
                  video.comments &&
                  video.comments.map((data, key) => (
                    <CommentsCard data={data} key={key} />
                  ))}
                <button
                  className="show-comments-btn"
                  onClick={toggleShowComment}
                >
                  {showComment ? "Hide Comments" : "Show Comments"}
                </button>
              </span>
            </div>
          </span>
          {/* Video Suggestions */}
          <span className="video-suggestion-phone">
            {data.map((val, key) => (
              <Cards video={val} key={key} />
            ))}
          </span>
          <span className="video-suggestion-web">
            {data.map((val, key) => (
              <Cards3 video={val} key={key} />
            ))}
          </span>
        </div>
      )}
    </Base>
  );
};

export default PlayVideo;
