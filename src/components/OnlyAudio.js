/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resultAudioPlayer } from "../redux/actions/ResultActions";
import ReactLoading from "react-loading";
import Navbar from "./Navbar";
import backendApi from "../apis/backendApi";
const OnlyAudio = () => {
  const [params, setParams] = useState("");
  const [searchresults, setSearchResults] = useState([]);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Keynumber, setKeynumber] = useState(1);
  const NumberofKeys = 4;
  const dispatch = useDispatch();
  const API_KEY1 = "AIzaSyCHTfN6PwhBVOE1JGHh1fLFskP0-W2EGtk";
  const API_KEY2 = "AIzaSyBWJk1BqO7Wd36mSJk2PSIgx4H2Pm4NMHs";
  const API_KEY3 = "AIzaSyCoI8TWaoz2aZwe_T8FmmZgotKAKWH3ndg";
  const API_KEY4 = "AIzaSyAVDvfHJElsfWGMrKcZCX5uQ_LIQcd4HRA";
  const MaxResults = 20;
  const [Key, setKey] = useState(API_KEY1);
  const SearchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults";

  const SubmitHandler = async (e) => {
    setLoading(true);
    const resp = await fetch(
      `${SearchURL}=${MaxResults}&q=${params}&type=video&key=${Key}`,
      {
        method: "GET",
      }
    );
    const myres = await resp.json();
    if (myres) {
      setSearchResults(myres.items);
      setLoading(false);
    } else {
      // console.log(error);
      if (Keynumber < NumberofKeys) {
        setKeynumber(Keynumber + 1);
        var a = Keynumber + 1;
        // eslint-disable-next-line no-eval
        setKey(eval("API_KEY" + a));
      } else {
        console.log("MAXIMUM_SEARCH_LIMIT_REACHED");
      }
    }
  };

  const CardClick = (e) => {
    setSearchResults([]);
    setLoading(true);
    backendApi
      .get(`/download?url=https://www.youtube.com/watch?v=${e.id.videoId}`)
      .then((res) => {
        dispatch(resultAudioPlayer({ MyData: res.data, Card: e }));
        let path = `/Player`;
        navigate(path);
      });
  };

  return (
    <React.Fragment>
      <Navbar name="Audio Player" btn_name={"Saved"} color={"dark"} />
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
          onChange={(e) => {
            setParams(e.target.value);
          }}
          placeholder="Search or Enter URL"
          value={params}
        />
        <button
          className="btn btn-dark"
          style={{ marginLeft: "5px" }}
          onClick={(e) => SubmitHandler(e)}
        >
          Submit
        </button>
      </div>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading type="bars" color="#0d6efd" height={150} width={100} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {searchresults.map((items) => {
          return (
            <div
              key={Math.random() * 456456465}
              className="card"
              style={{
                width: "18rem",
                margin: "5px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => CardClick(items)}
            >
              <img
                className="card-img-top"
                src={items.snippet.thumbnails.medium.url}
                alt="Card im"
              />
              <div className="card-body">
                <p className="card-text">{items.snippet.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default OnlyAudio;
