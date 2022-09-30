/* eslint-disable array-callback-return */
import React, { useState, useRef } from "react";
import AudioPlayer1 from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
const AudioPlayer = ({ props }) => {
  var key = 12;
  const player = useRef();
  const [rotate] = useState("rotating");

  if (props === undefined) {
    return <ErrorPage path={"/AudioPlayer"} />;
  } else {
    return (
      <React.Fragment>
        <Navbar name={"Audio Player"} color={"dark"} />
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
                    // alignItems: "center",
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
                    />
                  </div>
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
