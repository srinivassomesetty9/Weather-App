import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Common";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Registration = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // Errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const data = (e) => {
    // console.log(firstName, email, password);
    e.preventDefault();
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    // Validation
    if (firstName === "" || firstName === null) {
      setFirstNameError("Please Enter First Name");
    }
    if (lastName === "" || lastName === null) {
      setLastNameError("Please Enter Last Name");
    }
    if (email === "" || email === null) {
      setEmailError("Please Enter Email");
    }
    if (password === "" || password === null) {
      setPasswordError("Please Enter Password");
    }

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      axios
        .post(`${baseUrl}/register`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res);

          if (
            res.data.result !== "No Details Entered" &&
            res.data.result !== "Email already exists"
          ) {
            setShow(true);
            setTimeout(() => {
              navigate("/");
            }, 1000);
            localStorage.setItem("user", JSON.stringify(res));
          } else {
            setMessage(res.data.result);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.code === "ERR_NETWORK") {
            setMessage(err?.message);
          } else {
            setMessage(err?.response?.data?.error);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        });
    }
  };

  return (
    <div className="loginwrap">
      <Snackbar
        open={show}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={6000}
        message="Success"
        onClose={() => setShow(false)}
      >
        <Alert
          onClose={() => setShow(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registred Successfully
        </Alert>
      </Snackbar>
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
                  alt="gif"
                  style={{
                    maxWidth: "100%",
                    maxheight: "100vh",
                    borderRadius: "999px 999px 999px 0",
                  }}
                  className="bannerlogin"
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
                  <img src="/icon1.png" alt="icon" style={{ height: "64px" }} />
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
                  <p>Please sign-up to your account</p>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="outlined-FirstName-input"
                    label="First Name"
                    type="text"
                    color="primary"
                    autoComplete="current-FirstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setFirstNameError("");
                      setMessage(false);
                    }}
                  />
                  <div className="text-danger">{firstNameError}</div>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="outlined-LastName-input"
                    label="Last Name"
                    type="text"
                    color="primary"
                    autoComplete="current-LastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setLastNameError("");
                      setMessage(false);
                    }}
                  />
                  <div className="text-danger">{lastNameError}</div>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="outlined-Email-input"
                    label="Email"
                    type="email" // Set type to "email" for email validation
                    color="primary"
                    autoComplete="current-Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setMessage(false);
                    }}
                    // required
                  />
                  <div className="text-danger">{emailError}</div>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    color="primary"
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
                    value={password}
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
                    <Grid item xs={12} md={9} style={{ textAlign: "right" }}>
                      <p>
                        Already you have an account?
                        <Button
                          variant="text"
                          style={{
                            color: "#002355",
                            fontSize: "12px",
                            textTransform: "capitalize",
                          }}
                          onClick={() => navigate("/")}
                        >
                          Login
                        </Button>
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={data}
                    type="submit"
                    fullWidth
                  >
                    Sign Up
                  </Button>
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

export default Registration;
