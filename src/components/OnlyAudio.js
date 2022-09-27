import React, { useState } from "react";

const OnlyAudio = () => {
  const [params, setParams] = useState("");
  const [searchresults, setSearchResults] = useState([]);

  const URL = "https://ytdownloadbackend.netlify.app/download";

  return <div>OnlyAudio</div>;
};

export default OnlyAudio;
