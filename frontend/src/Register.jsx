import React, {useState} from 'react';
import ReactDOM from "react-dom";
import "./styles/Register.css";
import App from "./App.jsx";
import axios from "./axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Register() {

  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");

  const sendAuth = async(event) => {
    event.preventDefault();

    await axios.post("/auth/create", {
      "username": inputUsername,
      "password": inputPassword
    });

    ReactDOM.render(<App user={inputUsername}/>, document.getElementById("root"));
  };

  return (
    <Container component="main" maxWidth="xs" className="page">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Register</Typography>
        <form className="form" noValidate>
          <TextField
            variant="outlined" margin="normal" required fullWidth label="Name"
            value={inputUsername}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth label="Password" type="password"
            value={inputPassword}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth label="Re-Enter Password" type="password"
          />
          <Button
            type="submit" fullWidth variant="contained" color="primary"
            className="submit"
            onClick={sendAuth}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Register;