import React from "react";
import MIC_SLASH from "./microphone-slash-solid.svg";
import MIC from "./microphone-solid.svg";
const DownloadComponent = ({ items }) => {
  if (
    items.hasVideo === true &&
    items.hasAudio === true &&
    !items.mimeType.includes("vp9")
  ) {
    return (
      <div
        style={{
          margin: "5px",
          backgroundColor: "wheat",
          width: "300px",
        }}
        className="btn"
      >
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          href={items.url}
          rel="noreferrer"
        >
          {items.mimeType.split("/")[0] +
            "   " +
            items.qualityLabel +
            "  " +
            items.codecs}
        </a>
      </div>
    );
  } else if (
    items.hasVideo === true &&
    items.hasAudio === false &&
    !items.mimeType.includes("vp9")
  ) {
    return (
      <div
        style={{ margin: "5px", backgroundColor: "wheat", width: "300px" }}
        className="btn"
      >
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          href={items.url}
          rel="noreferrer"
        >
          <img
            src={MIC_SLASH}
            style={{ height: "20px", width: "25px" }}
            alt=""
          />
          {items.mimeType.split("/")[0] +
            "   " +
            items.qualityLabel +
            "  " +
            items.codecs}
        </a>
      </div>
    );
  } else if (!items.mimeType.includes("vp9")) {
    return (
      <div
        style={{ margin: "5px", backgroundColor: "wheat", width: "300px" }}
        className="btn"
      >
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          href={items.url}
          rel="noreferrer"
        >
          <img style={{ height: "20px", width: "25px" }} src={MIC} alt="" />
          {items.mimeType.split("/")[0]}
        </a>
      </div>
    );
  }
};

export default DownloadComponent;
