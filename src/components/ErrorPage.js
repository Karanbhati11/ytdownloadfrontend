import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = (props) => {
  const navigate = useNavigate();
  const ClickHandler = (e) => {
    e.preventDefault();
    const path = `${props.path}`;
    navigate(path);
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px",
          flexDirection: "column",
        }}
      >
        <h3 style={{ color: "Black" }}>Opps Something Went Wrong</h3>
        <button
          style={{ marginTop: "20px" }}
          className="btn btn-dark"
          onClick={(e) => ClickHandler(e)}
        >
          Go Back
        </button>
      </div>
    </React.Fragment>
  );
};

export default ErrorPage;
