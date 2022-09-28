import React, { useState } from "react";
import SearchYT from "./SearchYT";
import YoutubeApi from "./YoutubeApi";
import { useNavigate } from "react-router-dom";

const MainComponent = () => {
  const [Params, setParams] = useState("");
  const [YoutubeURL, setYoutubeURL] = useState(false);
  const [SearchID, setSearchID] = useState(false);
  const [Flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (Params === "") {
      alert("Enter a URL or SearchParameter");
    } else if (Params.includes("youtube")) {
      setYoutubeURL(true);
    } else {
      setFlag(!Flag);
      setSearchID(true);
    }
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
          padding: "20px",
        }}
      >
        <input
          style={{ width: "50vw" }}
          className="form-control"
          onChange={(e) => setParams(e.target.value)}
          placeholder="Search or Enter URL"
          value={Params}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
          onClick={(e) => SubmitHandler(e)}
        >
          Submit
        </button>
        <button
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
          onClick={(e) => navigate("/AudioPlayer")}
        >
          Only Audio
        </button>
      </div>
      {SearchID && (
        <div>
          <SearchYT Keyword={Params} para={{ Flag: Flag }} />
        </div>
      )}
      {YoutubeURL && <YoutubeApi Params={Params} />}
    </React.Fragment>
  );
};

export default MainComponent;
