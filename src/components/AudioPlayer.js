/* eslint-disable array-callback-return */
import React from "react";
import AudioPlayer1 from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
const AudioPlayer = ({ props }) => {
  return (
    <React.Fragment>
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
            items.hasAudio === true
          ) {
            return (
              <div
                key={Math.random() * 89898}
                className="card"
                style={{ width: "22rem" }}
              >
                <img
                  className="card-img-top"
                  src={props.Card.snippet.thumbnails.medium.url}
                  alt="Thumbnail"
                />
                <div className="card-body">
                  <AudioPlayer1
                    src={items.url}
                    className="adio"
                    // other props here
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
};

export default AudioPlayer;
