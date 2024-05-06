import React, { useState } from "react";
import "./Login.css";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Common";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //Error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    console.warn(email, password);

    let data = { email: email, password: password };

    if (email === "" || email === null || email === undefined) {
      setEmailError("Please Enter Email");
    }
    if (password === "" || password === null || password === undefined) {
      setPasswordError("Please Enter Password");
    }

    if (email !== "" && password !== "") {
      if (email !== undefined && password !== undefined) {
        axios
          .post(`${baseUrl}/login`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            // console.log(res.data.message);

            if (res.data.message === "Login successful") {
              navigate("/home");
              localStorage.setItem("user", JSON.stringify(res));
            } else {
              setMessage(res.data.message);
              // Hide the alert after 5 seconds
              setTimeout(() => {
                setMessage("");
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err, "ERR");
            if (err?.code === "ERR_NETWORK") {
              setMessage(err?.message);
            } else {
              setMessage(err?.response?.data?.error);
              // Hide the alert after 5 seconds
              setTimeout(() => {
                setMessage("");
              }, 3000);
            }
          });
      }
    }
  };

  return (
    <div className="loginwrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box sx={{ flexGrow: 1, height: "calc(100vh + 8px)" }}>
          <Grid container spacing={1} sx={{ height: "calc(100vh + 8px)" }}>
            {/* start Login form left side wrap, logo and wallpaper design */}
            <Grid
              item
              xs={12}
              md={8}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={0}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                <img
                  src="/login.gif"
                  style={{
                    maxWidth: "100%",
                    maxheight: "100vh",
                    borderRadius: "999px 999px 999px 0",
                  }}
                  className="bannerlogin"
                  alt="gif"
                />
              </Grid>
            </Grid>
            {/* end left side wrap*/}
            {/* start Login form right side wrap */}

            <Grid
              item
              xs={12}
              md={4}
              className="loginformwrap"
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ pb: 5 }}
            >
              <Grid item xs={11} md={10}>
                {/* display: { xs: 'block', sm: 'none' }, */}
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <img src="/icon1.png" style={{ height: "64px" }} alt="icon" />
                  <p
                    style={{
                      fontSize: "21px",
                      fontWeight: "400",
                      color: "black",
                      marginBottom: "15px",
                    }}
                  >
                    Weather APP
                  </p>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginBottom: "15px", textAlign: "left" }}
                >
                  <h1 className="welcomheading">Welcome! </h1>
                  <p>Login to continue</p>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="outlined-Email-input"
                    label="Email"
                    type="text"
                    color="primary"
                    autoComplete="current-Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setMessage(false);
                    }}
                    required
                  />
                  <div className="text-danger">{emailError}</div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    color="primary"
                    required
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="current-password"
                    // value={pass}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                      setMessage(false);
                    }}
                  />
                  <div className="text-danger">{passwordError}</div>
                </Grid>
                {message ? (
                  <Alert
                    show={message}
                    color="error"
                    onClose={() => setMessage(false)}
                    dismissible
                    style={{ marginTop: "10px" }}
                  >
                    {message}
                  </Alert>
                ) : null}
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} md={6}>
                      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" /> */}
                    </Grid>
                    <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
                      <Button
                        variant="text"
                        style={{
                          color: "#002355",
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                        // onClick={() => navigate("/forgotPassword")}
                      >
                        Forgot Password?
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    type="submit"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginBottom: "15px", textAlign: "left" }}
                >
                  <p>
                    Didn't have an account?
                    <Button
                      variant="text"
                      style={{
                        color: "#002355",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Button>
                  </p>
                </Grid>
                <Grid>
                  {/* {auth && auth.status && auth.status.status == 200 ? <SuccessAlert msg={auth.status ? auth.status.data.message : ''} /> : ''}
                                    {auth && auth.status && auth.status.status == 400 ? <ErrorAlert msg={auth.status ? auth.status.data.message : ''} /> : ''} */}
                </Grid>
              </Grid>
            </Grid>
            {/* end Login form right side wrap */}
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default Login;
