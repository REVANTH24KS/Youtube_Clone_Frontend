import axios from "axios";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

//Get Channels
const fetchChannels = async ({ token, id }) => {
  try {
    let response = await axios.get(`${api_url}/channel/get-channel/${id}`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data.result;
  } catch {
    alert("Invalid Credentials");
  }
};
//Get All Videos
const fetchVideos = async (token) => {
  try {
    const respons = await axios.get(`${api_url}/video/get-videos`, {
      headers: {
        "x-auth": token,
      },
    });
    let temp = respons.data.Video;
    const shuffledData = [...temp].sort(() => Math.random() - 0.5);
    return shuffledData;
  } catch (error) {
    console.log(error);
  }
};
//Get History
const fetchHistory = async (token) => {
  try {
    const respons = await axios.get(`${api_url}/history/get-history`, {
      headers: {
        "x-auth": token,
      },
    });
    return respons.data.video;
  } catch (error) {
    console.log(error);
  }
};
//Get Liked Videos
const fetchLikedVideos = async (token) => {
  try {
    const respons = await axios.get(`${api_url}/like/get-liked-videos`, {
      headers: {
        "x-auth": token,
      },
    });
    return respons.data.likedVideos;
  } catch (error) {
    console.log(error);
  }
};
//Post Video
const handlePost = async ({ user, token }) => {
  try {
    let response = await axios.post(`${api_url}/video/upload-video`, user, {
      headers: {
        "x-auth": token,
      },
    });
    if (response.data.message === "Video uploaded Successfully") {
      alert(response.data.message);
    }
  } catch {
    alert("Invalid Credentials");
  }
};
//Get Subscribtions
const fetchSubscription = async (token) => {
  try {
    let channelresponse = await axios.get(
      `${api_url}/subscribe/get-subscribes`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    return channelresponse.data.subscribes;
  } catch {
    alert("Invalid Credentials");
  }
};
//Get Watch Later Videos
const fetchWatchLater = async (token) => {
  try {
    const respons = await axios.get(`${api_url}/watchlater/get-watchlater`, {
      headers: {
        "x-auth": token,
      },
    });
    return respons.data.video;
  } catch (error) {
    console.log(error);
  }
};
//Update Views
const UpdateViews = async ({ token, id }) => {
  try {
    await axios.put(
      `${api_url}/video/update-views`,
      { id },
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  } catch {
    alert("Invalid Credentials");
  }
};
//Update History
const addVideotoHistory = async ({ token, id }) => {
  try {
    await axios.put(
      `${api_url}/history/add-history`,
      { id },
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  } catch {
    alert("Invalid Credentials");
  }
};
//Get User Data
const getUser = async (token) => {
  try {
    let response = await axios.get(`${api_url}/auth/get-user-data`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data.user;
  } catch {
    alert("Invalid Credentials");
  }
};
//Add Watch later
const watchlater = async ({ id, token }) => {
  try {
    await axios.put(
      `${api_url}/watchlater/add-watchlater`,
      { id },
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  } catch {
    alert("Can't Add Video to Watch later, try again later");
  }
};
//Like Video
const likeVideo = async ({ token, id }) => {
  try {
    await axios.put(
      `${api_url}/like/like-video`,
      { id },
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  } catch {
    alert("Can't like Video, try again later");
  }
};
//Subscribe channel
const subscribe = async ({ token, id }) => {
  try {
    await axios.put(
      `${api_url}/subscribe/subscribe-channel`,
      { id },
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  } catch {
    alert("Can't Subscribe channel, try again later");
  }
};
//Get User Videos
const fetchUserVideo = async (token) => {
  try {
    const response = await axios.get(`${api_url}/video/get-video-byId`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data.Video;
  } catch (error) {
    console.log(error);
  }
};
//Get Searched Videos
const fetchSearchedData = async ({ text }) => {
  try {
    const response = await axios.put(`${api_url}/search/search-videos`, {
      text,
    });
    return response.data.video;
  } catch (error) {
    console.log(error);
  }
};
//Get SubscriberCount
const fetchSubscriberCount = async ({ id }) => {
  try {
    const response = await axios.get(
      `${api_url}/subscribe/get-subscribers/${id}`
    );
    return response.data.subscribers;
  } catch (error) {
    console.log(error);
  }
};

//Update Notification
const updateNotification = async ({token}) => {
  try {
    console.log(token);
    const response = await axios.put(
      `${api_url}/notification/update-notification`,{token}, {
        headers: {
          "x-auth": token,
        },
      });
  } catch (error) {
    console.log(error);
  }
};
export {
  fetchChannels,
  fetchVideos,
  fetchHistory,
  fetchLikedVideos,
  handlePost,
  fetchSubscription,
  fetchWatchLater,
  UpdateViews,
  addVideotoHistory,
  getUser,
  watchlater,
  likeVideo,
  subscribe,
  fetchUserVideo,
  fetchSearchedData,
  fetchSubscriberCount,
  updateNotification,
};
