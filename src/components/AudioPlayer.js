/* eslint-disable array-callback-return */
import React, { useState, useRef } from "react";
import AudioPlayer1 from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./AudioPlayer.css";
import backendApi from "../apis/backendApi";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
const AudioPlayer = ({ props }) => {
  console.log(props);
  var key = 12;
  const player = useRef();
  const [rotate] = useState("rotating");
  const [url, setUrl] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  backendApi.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "jwtoken"
      )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const Upload = async (e) => {
    backendApi.defaults.withCredentials = true;

    try {
      const rest = await backendApi.get("/playlist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setEmail(rest.data.root);
      await backendApi.post("/addtoplaylist", {
        email: rest.data.root,
        videoID: props.Card.id.videoId,
        ImageUrl: props.Card.snippet.thumbnails.medium.url,
        AudioUrl: url,
        Title: props.Card.snippet.title,
      });
      // console.log(res.data.message);
      toast.success("Added Successfully");
    } catch (err) {
      if (err.response.data.error === "Already Exist") {
        toast.warn("Already Added");
      } else {
        navigate("/login");
      }
    }
  };

  if (props === undefined) {
    return <ErrorPage path={"/AudioPlayer"} />;
  } else {
    return (
      <React.Fragment>
        <Navbar name={"Audio Player"} btn_name={"Saved"} color={"dark"} />
        <ToastContainer />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {props.MyData.info.map((items) => {
            if (
              !items.mimeType.includes("vp9") &&
              items.hasVideo === false &&
              items.hasAudio === true &&
              key === 12
            ) {
              key = key + 12;
              return (
                <div
                  key={Math.random() * 89898}
                  className="card"
                  style={{
                    width: "22rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    className={`card-img-top mycardinfo ${rotate}`}
                    src={props.Card.snippet.thumbnails.medium.url}
                    alt="Thumbnail"
                    style={{ alignSelf: "center" }}
                  />
                  <div className="card-body">
                    <AudioPlayer1
                      src={items.url}
                      className="adio"
                      // other props here
                      ref={player}
                      onLoadedData={() => {
                        setUrl(items.url);
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => Upload(e)}
                  >
                    Add
                  </button>
                </div>
              );
            }
          })}
        </div>
      </React.Fragment>
    );
  }
};
export default AudioPlayer;
