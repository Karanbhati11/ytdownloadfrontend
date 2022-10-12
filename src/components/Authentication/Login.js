import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import styled from "styled-components";
import Button from "../Small_Components/Button";
import Input from "../Small_Components/Input";
import Navbar from "../Navbar";
import backendApi from "../../apis/backendApi";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;
const Login = () => {
  // const Results = useSelector((state) => state.registration.results);
  // const audioResults = useSelector((state) => state.credentials.results);

  const navigate = useNavigate();
  const [logindetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  backendApi.defaults.withCredentials = true;

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await backendApi.post(
        "/login",
        {
          ...logindetails,
        },
        {
          "Content-Type": "application/json",
          Accept: "*/*",
        }
      );
      if (res.status !== 403 || res) {
        toast.success("Login Successfull");
        localStorage.setItem("jwtoken", `${res.data.jwtoken}`);
        navigate("/Playlist/Homepage");
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Navbar name={"Login"} btn_name={"Register"} color={"dark"} />
      <ToastContainer />
      <div className="lbody">
        <MainContainer>
          <WelcomeText>Welcome</WelcomeText>
          <InputContainer
            onChange={(e) => {
              setLoginDetails({ ...logindetails, email: e.target.value });
            }}
          >
            <Input type="text" placeholder="Email" required />
          </InputContainer>
          <InputContainer
            onChange={(e) => {
              setLoginDetails({ ...logindetails, password: e.target.value });
            }}
          >
            <Input type="password" placeholder="Password" required />
          </InputContainer>
          <ButtonContainer onClick={(e) => LoginHandler(e)}>
            <Button content="Login" />
          </ButtonContainer>
          <HorizontalRule />
        </MainContainer>
      </div>
    </React.Fragment>
  );
};

export default Login;
