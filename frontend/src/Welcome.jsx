import React from 'react';
import ReactDOM from "react-dom";
import "./styles/Welcome.css";
import SignIn from "./SignIn.jsx";
import Register from "./Register.jsx";

import { Button } from "@material-ui/core";

function Welcome() {

    function handleSignIn() {
        ReactDOM.render(<SignIn />, document.getElementById("root"));
    }

    function handleRegister() {
        ReactDOM.render(<Register />, document.getElementById("root"));
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://www.silicon.co.uk/wp-content/uploads/2018/03/2000px-WhatsApp.svg_.png"
                alt="whatsapp-logo" />
                <div className="login__text">
                    <h1>Welcome to Whatsapp</h1>
                </div>
                <Button onClick={handleSignIn}>SignIn</Button>
                <Button onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
}

export default Welcome;