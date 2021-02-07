import React, {useState} from 'react';
import ReactDOM from "react-dom";
import "./styles/SignIn.css";
import App from "./App.jsx";
import axios from "./axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function SignIn() {

  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");

  const sendAuth = async(event) => {
    event.preventDefault();

    axios.put("/auth/find", {
      username: inputUsername,
      password: inputPassword
    })
    .then(function(res) {
      if (res.data) {
        ReactDOM.render(<App user={inputUsername}/>, document.getElementById("root"));
      } else {
        alert("Either username or password is wrong !!!.");
      }
    });

    setUsername("");
    setPassword("");
  };

  return (
    <Container component="main" maxWidth="xs" className="page">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className="form" noValidate>
          <TextField
            variant="outlined" margin="normal" required fullWidth label="Username"
            value={inputUsername}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth label="Password" type="password"
            value={inputPassword}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit" fullWidth variant="contained" color="primary"
            className="submit"
            onClick={sendAuth}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;