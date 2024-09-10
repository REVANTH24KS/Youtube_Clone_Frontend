import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Channel from "./Components/Channel";
import History from "./Components/History";
import LikedVideos from "./Components/LikedVideos";
import PlayVideo from "./Components/PlayVideo";
import Subscriptions from "./Components/Subscriptions";
import Watchlater from "./Components/Watchlater";
import YourVideos from "./Components/YourVideos";
import PostVideo from "./Components/PostVideo";
import SearchPage from "./Components/SearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/channel/:name" element={<Channel />} />
        <Route path="/history" element={<History />} />
        <Route path="/likes" element={<LikedVideos />} />
        <Route path="/play/:id" element={<PlayVideo />} />
        <Route path="/subscribs" element={<Subscriptions />} />
        <Route path="/watch-later" element={<Watchlater />} />
        <Route path="/your-videos" element={<YourVideos />} />
        <Route path="/post-videos" element={<PostVideo />} />
        <Route path="/search/:text" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
