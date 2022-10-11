import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "./Register.css";
import { useDispatch } from "react-redux";
import { resgistrationSuccess } from "../../redux/actions/ResultActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import styled from "styled-components";
import Button from "../Small_Components/Button";
import Input from "../Small_Components/Input";
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

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registrationvariables, setRegistrationVariables] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const dispatch = useDispatch();

  const SubmitRegistration = async (e) => {
    e.preventDefault();

    await backendApi
      .post("/register", { ...registrationvariables })
      .then((res) => {
        setRegistrationVariables({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        toast.success("Registration Successfull");
        setLoading(true);
        dispatch(resgistrationSuccess(res.data));
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <Navbar name={"Register"} btn_name={"Login"} color={"dark"} />

      <ToastContainer />
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading type="bars" color="#0d6efd" height={150} width={100} />
        </div>
      )}
      {!loading && (
        <div className="lbody">
          <MainContainer>
            <WelcomeText>Welcome</WelcomeText>
            <InputContainer
              onChange={(e) => {
                setRegistrationVariables({
                  ...registrationvariables,
                  name: e.target.value,
                });
              }}
            >
              <Input type="text" placeholder="Name" required />
            </InputContainer>
            <InputContainer
              onChange={(e) => {
                setRegistrationVariables({
                  ...registrationvariables,
                  email: e.target.value,
                });
              }}
            >
              <Input type="text" placeholder="Email" required />
            </InputContainer>
            <InputContainer
              onChange={(e) => {
                setRegistrationVariables({
                  ...registrationvariables,
                  password: e.target.value,
                });
              }}
            >
              <Input type="password" placeholder="Password" required />
            </InputContainer>
            <InputContainer
              onChange={(e) => {
                setRegistrationVariables({
                  ...registrationvariables,
                  cpassword: e.target.value,
                });
              }}
            >
              <Input type="password" placeholder="Confirm Password" required />
            </InputContainer>
            <ButtonContainer onClick={(e) => SubmitRegistration(e)}>
              <Button content="Register" />
            </ButtonContainer>
            <HorizontalRule />
          </MainContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
