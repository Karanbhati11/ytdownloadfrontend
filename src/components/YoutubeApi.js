/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import ReactLoading from "react-loading";

const YoutubeApi = ({ Params }) => {
  const URL = "https://ytdownloadbackend.netlify.app/download";
  // const [params, setParams] = useState("");
  const [Data, setData] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [Loading, setLoading] = useState(false);

  // const Fetcher = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   axios.get(`${URL}?url=${Params}`).then((res) => {
  //     setData(res.data.info);
  //     setVideoURL(res.data.url);
  //     setLoading(false);
  //   });
  // };
  useEffect(() => {
    setLoading(true);
    axios.get(`${URL}?url=${Params}`).then((res) => {
      setData(res.data.info);
      setVideoURL(res.data.url);
      setLoading(false);
    });
  }, [Params]);
  return (
    <React.Fragment>
      <h2 style={{ margin: "20px", border: "2px solid white" }}>
        {/* Youtube Downloader */}
      </h2>
      <br></br>
      {/* <div style={{ display: "flex", justifyContent: "center", margin: "2px" }}>
        <input
          className="form-control"
          placeholder="enter url"
          style={{ width: "50vw" }}
          value={params}
          onChange={(e) => {
            setParams(e.target.value);
          }}
        />
        <button
          style={{ marginLeft: "5px" }}
          className="btn btn-primary"
          onClick={(e) => Fetcher(e)}
        >
          Load
        </button>
      </div> */}
      {Loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading type="bars" color="#0d6efd" height={150} width={100} />
        </div>
      )}
      {!Loading && (
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
              src={videoURL}
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
            {Data.map((items) => {
              return <DownloadComponent key={items.url} items={items} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default YoutubeApi;
