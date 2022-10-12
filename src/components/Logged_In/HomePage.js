import React, { useLayoutEffect, useState } from "react";
import backendApi from "../../apis/backendApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchcredentials } from "../../redux/actions/ResultActions";
import "../AudioPlayer.css";
import "react-h5-audio-player/lib/styles.css";
import Navbar from "../Navbar";
import ReactLoading from "react-loading";
import Pagination from "../Pagination";

const HomePage = () => {
  const navigate = useNavigate();
  // const player = useRef();
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();
  const [playlistflag, setPlaylistflag] = useState(true);
  const [loading, setLoading] = useState(false);

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
  const InitPlaylistPage = async (e) => {
    backendApi.defaults.withCredentials = true;
    try {
      const res = await backendApi.get("/playlist", {
        withCredentials: true,
      });
      dispatch(fetchcredentials(res.data));
      if (res.data.data) {
        setLoading(true);
        setPlaylistflag(true);
        const hey = await res.data.data.Playlist.PlaylistData.map(
          async (items) => {
            const fetccherr = Promise.resolve(
              backendApi.get(`/myplay?url=${items.videoID}`)
            );
            return fetccherr;
          }
        );
        Promise.all(hey).then((rest) => {
          rest.map((items) => {
            res.data.data.Playlist.PlaylistData.find(
              (v) => v.videoID === items.data.id
            ).AudioUrl = items.data.info[0].url;
            setPlaylist(res.data.data.Playlist.PlaylistData);
            setLoading(false);
            return null;
          });
        });
      } else {
        setPlaylistflag(false);
      }
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useLayoutEffect(() => {
    InitPlaylistPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <Navbar name={"Playlist"} btn_name={"Logout"} color={"dark"} />
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading type="bars" color="#0d6efd" height={150} width={100} />
        </div>
      )}
      {!playlistflag && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "black", marginTop: "50px" }}>Nothing Added</h3>
          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/AudioPlayer");
            }}
          >
            Add
          </button>
        </div>
      )}
      {playlistflag && <Pagination items={playlist} itemsPerPage={6} />}
    </React.Fragment>
  );
};

export default HomePage;
