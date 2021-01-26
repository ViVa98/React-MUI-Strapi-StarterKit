import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../Redux/actions/profile";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [admin, setAdmin] = useState();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.target.name === "username" && setUsername(event.target.value);
    event.target.name === "password" && setPassword(event.target.value);
  };

  const handleLogin = () => {
    setBackdrop(true);
    async function login() {
      let url = `${process.env.REACT_APP_API}/auth/local`;
      axios
        .post(url, {
          identifier: username,
          password: password,
        })
        .then((response) => {
          dispatch(ADD_USER(response.data));
          setAdmin(response.data.user.role.name);
        })
        .catch((error) => {
          let message = error.response.data.data[0].messages[0].message;
          setMsg(message);
          setBackdrop(false);
        });
    }
    login();
  };

  useEffect(() => {
    function redirect() {
      if (admin === "Admin") {
        history.push("/dashboard");
      }
    }
    redirect(); // eslint-disable-next-line
  }, [admin]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          variant="h5"
          style={{ textAlign: "center", paddingBottom: "20px" }}
        >
          App Name App Name App Name
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Typography color="secondary" variant="body1">
            {msg === "Identifier or password invalid."
              ? "Username or password invalid."
              : msg}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
        <Typography variant="body1" style={{ padding: "10px" }}>
          Logging in
        </Typography>
      </Backdrop>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
