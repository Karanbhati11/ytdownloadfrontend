import axios from "axios";
import React, { useEffect, useState } from "react";
import DownloadComponent from "./DownloadComponent";
import ReactLoading from "react-loading";

const SearchYT = ({ Keyword }) => {
  const URL = "https://ytdownloadbackend.netlify.app/download";
  const SearchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults";
  const API_KEY = "AIzaSyCHTfN6PwhBVOE1JGHh1fLFskP0-W2EGtk";
  const MaxResults = 5;
  //   const [Search, setSearch] = useState("");
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SearchURL}=${MaxResults}&q=${Keyword}&type=video&key=${API_KEY}`)
      .then((res) => {
        console.log(res.data.items);
        setResults(res.data.items);
        setLoading(false);
      });
  }, [Keyword]);
  const CardClick = (e) => {
    setDownloader({ info: [] });
    axios.get(`${URL}?url=https://www.youtube.com/watch?v=${e}`).then((res) => {
      console.log(res.data);
      setDownloader(res.data);
      setIsCardClicked(true);
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
        <div style={{ display: "flex" }}>
          {Results.map((items) => {
            return (
              <div
                class="card"
                style={{ width: "18rem", margin: "5px" }}
                onClick={() => CardClick(items.id.videoId)}
              >
                <img
                  class="card-img-top"
                  src={items.snippet.thumbnails.default.url}
                  alt="Card im"
                />
                <div class="card-body">
                  <p class="card-text">{items.snippet.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {IsCardClicked &&
        Downloader.info.map((items) => {
          return <DownloadComponent key={Downloader.url} items={items} />;
        })}
    </React.Fragment>
  );
};

export default SearchYT;
