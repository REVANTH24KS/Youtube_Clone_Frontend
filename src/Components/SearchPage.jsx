import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import Base from "../Base/Base";
import { fetchSearchedData } from "../container/routes";
import CircularProgress from "@mui/material/CircularProgress";
import Cards3 from "../container/Cards3";
import { useParams } from "react-router";
import Cards from "../container/Cards";

const SearchPage = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let text = useParams("text");
  // State to keep track of the previous id
  const [prevText, setPrevText] = useState(text);

  useEffect(() => {
    async function fetchData() {
      let res = await fetchSearchedData({ text: text.text });
      setData(res);
      setLoading(false);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (text !== prevText) {
      setPrevText(text);
      // Reload the page when the text changes
      window.location.reload();
    }
  }, [text, prevText]);
  return (
    <Base>
      {loading && (
        <div className="loading-box">
          <CircularProgress />
        </div>
      )}
      <div className="search-container">
        {data &&
          data.length &&
          data.map((data, key) => <Cards video={data} key={key} />)}
      </div>
      {!data &&<div className="search-no-data">
            <img src='https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png'
            alt='No data Found'
            />
      </div>

      }
    </Base>
  );
};

export default SearchPage;
