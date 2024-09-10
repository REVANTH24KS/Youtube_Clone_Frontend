import React from "react";
import "./CommentsCard.css";
import { Avatar, Typography } from "@mui/material";
import { Days } from "./service";

const CommentsCard = ({ data }) => {
  let date = Days({ date: data.date });
  return (
    <div className="comment-card">
      <Avatar alt={data.name} src={data.image} />
      <div className="comment-details">
        <Typography variant="subtitle1">
          {data.name} | {date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {data.comment}
        </Typography>
      </div>
    </div>
  );
};

export default CommentsCard;
