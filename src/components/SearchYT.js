/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resultAction } from "../redux/actions/ResultActions";

const SearchYT = ({ Keyword, para }) => {
  const URL = "https://ytdownloadbackend.netlify.app/download";
  const [Keynumber, setKeynumber] = useState(1);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(para.Flag);
  const SearchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults";
  const API_KEY1 = "AIzaSyCHTfN6PwhBVOE1JGHh1fLFskP0-W2EGtk";
  const API_KEY2 = "AIzaSyBWJk1BqO7Wd36mSJk2PSIgx4H2Pm4NMHs";
  const API_KEY3 = "AIzaSyCoI8TWaoz2aZwe_T8FmmZgotKAKWH3ndg";
  const API_KEY4 = "AIzaSyAVDvfHJElsfWGMrKcZCX5uQ_LIQcd4HRA";
  const MaxResults = 20;
  const NumberofKeys = 4;
  const [Key, setKey] = useState(API_KEY1);
  //   const [Search, setSearch] = useState("");
  // const [Results, setResults] = useState(
  //   JSON.parse(sessionStorage.getItem("Data"))
  //     ? JSON.parse(sessionStorage.getItem("Data"))
  //     : []
  // );
  const [Results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Downloader, setDownloader] = useState([]);
  const [IsCardClicked, setIsCardClicked] = useState(false);
  //   const SubmitHandler = (e) => {
  //     e.preventDefault();
  //     axios
  //       .get(`${SearchURL}=${MaxResults}&q=${Keyword}&type=video&key=${API_KEY}`)
  //       .then((res) => {
  //         console.log(res.data.items);
  //         setResults(res.data.items);
  //       });
  //   };
  // console.log(Submit);
  // console.log("ONCLICK", flag);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SearchURL}=${MaxResults}&q=${Keyword}&type=video&key=${Key}`)
      .then((res) => {
        // console.log(res.data.items);
        setResults(res.data.items);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        if (Keynumber < NumberofKeys) {
          setKeynumber(Keynumber + 1);
          var a = Keynumber + 1;
          // eslint-disable-next-line no-eval
          setKey(eval("API_KEY" + a));
        } else {
          console.log("MAXIMUM_SEARCH_LIMIT_REACHED");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [para.Flag, Keynumber]);

  const CardClick = (e) => {
    setDownloader({ info: [] });
    setLoading(true);
    // sessionStorage.setItem("Data", JSON.stringify(Results));
    axios
      .get(`${URL}?url=https://www.youtube.com/watch?v=${e.id.videoId}`)
      .then((res) => {
        // console.log(res.data);
        setDownloader(res.data);
        dispatch(resultAction({ MyData: res.data, Card: e }));
        // setIsCardClicked(true);
        let path = `/cardclick`;
        navigate(path);
      });
  };
  return (
    <React.Fragment>
      {/* Search Using Keyword */}
      <div>
        {/* <input
          value={Search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
        {/* <button
          className="btn btn-primary"
          style={{ marginLeft: "20px" }}
          onClick={(e) => SubmitHandler(e)}
        >
          Submit
        </button> */}
      </div>
      {Loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading type="bars" color="#0d6efd" height={150} width={100} />
        </div>
      )}
      {!Loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {Results.map((items) => {
            return (
              <div
                key={Math.random() * 456456465}
                className="card"
                style={{ width: "18rem", margin: "5px" }}
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
      )}
      {IsCardClicked &&
        Downloader.info.map((items) => {
          return (
            <DownloadComponent key={Math.random() * 87987} items={items} />
          );
        })}
    </React.Fragment>
  );
};

export default SearchYT;
