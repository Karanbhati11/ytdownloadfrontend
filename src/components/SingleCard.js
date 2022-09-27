import React from "react";
import DownloadComponent from "./DownloadComponent";

const SingleCard = ({ props }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="ratio"
          style={{
            "--bs-aspect-ratio": "50%",
            width: "50vw",
            marginTop: "20px",
          }}
        >
          <iframe
            src={props.MyData.url}
            title="YouTube video"
            draggable={true}
            allowFullScreen
          ></iframe>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {props.MyData.info.map((items) => {
            return (
              <DownloadComponent key={Math.random() * 87987} items={items} />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleCard;
