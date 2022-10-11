/* eslint-disable no-unused-vars */
import axios from "axios";

const localURL = "http://localhost:8888";
const HostedURL = "https://ytdownloadbackendd.netlify.app";

export default axios.create({
  baseURL: localURL,
});
