import React, { useState } from "react";
import "./PostVideo.css";
import Base from "../Base/Base";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import asserts from "../assert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { handlePost } from "../container/routes";

//Configs
let preset_key = asserts.preset_key;
let cloud_name = asserts.cloud_name;

//Validation Schema
let fieldValidationSchema = yup.object({
  title: yup.string().required("Please Provide a Title for the Video"),
  body: yup.string().required("Please Provide a Content for the Video"),
});

const PostVideo = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(null);
  let [type, setType] = useState("Normal");
  let [video, setVideo] = useState("");
  let [filename, setFilename] = useState("");
  let token = localStorage.getItem("token");
  let formData = new FormData();
  if (!token) {
    navigate("/login");
  }

  //Formik Actions
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      Post(user);
    },
  });

  //Upload Video to Cloudinary
  async function handleUpload(event) {
    let file = event.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    if (file && file.name) {
      setFilename(file.name);
    }

    try {
      let res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        formData
      );

      setVideo(res.data.secure_url);
    } catch (error) {
      console.error("Cloudinary Error:", error.response);
    }
  }

  async function Post(user) {
    setLoading(1);
    if (!video) {
      alert("Please upload a video");
      return false;
    }
    user["type"] = type;
    user["video"] = video;
    await handlePost({ user, token });
    navigate("/your-videos");
  }

  //For Video Type
  const types = [
    {
      value: "Normal",
      label: "Normal",
    },
    {
      value: "Music",
      label: "Music",
    },
  ];

  return (
    <Base>
      <div className="upload-video-container">
        <form onSubmit={handleSubmit} className="video-form">
          <div className="video-box">
            <label htmlFor="inputTag" className="video-label">
              Select Video
              <br />
              <input
                type="file"
                id="inputTag"
                className="video-input"
                onChange={handleUpload}
              />
              <FontAwesomeIcon icon={faCamera} size="2x" />
              {filename}
              <br />
              <span className="imageName"></span>
            </label>
          </div>
          <br />
          <TextField
            id="outlined-select-currency"
            select
            label="Video Type"
            defaultValue="Normal"
            helperText="Please select video type"
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="title"
            type="title"
            label="Title"
            placeholder="Enter Title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title ? (
            <div style={{ color: "crimson" }}>{errors.title}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="body"
            type="body"
            label="Body"
            placeholder="Enter the body content"
            value={values.body}
            onChange={handleChange}
          />
          {errors.body ? (
            <div style={{ color: "crimson" }}>{errors.body}</div>
          ) : (
            ""
          )}
          <br />
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Uploading...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Upload
              </Button>
            )}
          </div>
        </form>
      </div>
    </Base>
  );
};

export default PostVideo;
