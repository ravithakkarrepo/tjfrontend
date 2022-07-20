/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Redirect } from "react-router-dom";
import LaddaButton, { SLIDE_UP } from "react-ladda";
import Spinner from "../../components/Spinner";
import DefaultFooter from "../../containers/DefaultLayout/DefaultFooter";
import { GoogleLogin } from "react-google-login";

const Login = ({
  userAuthorizationRequest,
  userAuthorizationByGoogleRequest,
  isFetching,
  hasLoggedIn,
  appReceiveAlert
}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  if (hasLoggedIn) return <Redirect from="/login" to="/" />;

  if (isFetching) return <Spinner />;

  const handleLogin = loginData => {
    if (loginData.hasOwnProperty("tokenId")) {
      userAuthorizationByGoogleRequest({
        token: loginData.tokenId,
        profileObj: loginData.profileObj
      });
      loginData.disconnect();
    }
  };

  const handleFailure = loginData => console.log(loginData);

  return (
    <div className="main lg_ftr">
      <div className="login_main">
        <div className="login_inner">
          <div className="login_left">
            <a className="logo" href="javascript;">
              TJ
            </a>
          </div>
          <div className="login_right" style={{ height: "430px" }}>
            <div className="login_right_top text-center">
              <img
                alt=""
                src={require("../../assets/img/login-user-icon.png")}
              />
              <p>Sign In to your account</p>
            </div>
            <Form onSubmit={evt => evt.preventDefault()}>
              {/* <Form.Group>
                <span className="icon">
                  <img alt="" src={require("../../assets/img/user-icon.png")} />
                </span>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onKeyPress={evt => {
                    if (evt.key === "Enter") {
                      // if (username === "" || password === "") {
                      //   return appReceiveAlert({
                      //     message: "Please Input User Name & Password"
                      //   })
                      // }
                      userAuthorizationRequest({ username, password })
                    }
                  }}
                  onChange={evt => setUserName(evt.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <span className="icon">
                  <img alt="" src={require("../../assets/img/lock-icon.png")} />
                </span>
                <Form.Control
                  type="password"
                  name="password"
                  password={password}
                  placeholder="Password"
                  onKeyPress={evt => {
                    if (evt.key === "Enter") {
                      // if (!username || !password) {
                      //   return appReceiveAlert({
                      //     message: "Please Input User Name & Password"
                      //   })
                      // }
                      userAuthorizationRequest({ username, password })
                    }
                  }}
                  onChange={evt => setPassword(evt.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
                <a className="forgot_link" href="#" style={{ display: "none" }}>
                  Forgot your password ?
                </a>
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => userAuthorizationRequest({ username, password })}
              >
                Login
              </Button> */}
              <div className="strike">
                <br />
                <span style={{ color: "black" }}>or</span>
              </div>
              <br />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "35%"
                }}
              >
                <GoogleLogin
                  clientId="412297947827-hrs8ck9cvd6rldr4k2a2ue6a7nvmrvnj.apps.googleusercontent.com"
                  buttonText="Log In With Google"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
                  className={"googleCls"}
                  style={{ width: "80%" }}
                  isSignedIn={false}
                  theme="dark"
                  // uxMode="redirect"
                  // responseType="code"
                  // accessType="offline"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default Login;
