import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./styles/Sidebar.css";
import "./styles/SidebarChat.css";

import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function logout() {
    if (window.confirm("Wish to logout ?")) {
        window.location.assign("/");
    }
}

function Sidebar({user}) {

    const [persons, setPersons] = useState([]);

    function addFriend() {
        const person = prompt("Enter name:");
        if (person != null && person !== "") {
            setPersons([...persons, person]);
        }
    }

    return (
        <div className = "sidebar">

            <div className="sidebar__header">
                <div className="sidebar__headerRight">
                    <div className="sidebar__headerRight__desc">
                        <Avatar alt="avatar" src="https://img.favpng.com/11/21/25/iron-man-cartoon-avatar-superhero-icon-png-favpng-jrRBMJQjeUwuteGtBce87yMxz.jpg"/>
                        <p className="username"><b>{user}</b></p>
                    </div>
                    <div className="sidebar__headerRight__icons">
                        <IconButton><DonutLargeIcon /></IconButton>
                        <IconButton onClick={addFriend}><ChatIcon /></IconButton>
                        <IconButton onClick={logout}><ExitToAppIcon /></IconButton>
                    </div>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>

            <div style={{overflow: "auto"}}>
                {persons.map((chatHeader, index) => {
                    return (
                        <Link to={'/rooms/' + chatHeader} key={index}>
                            <div className="sidebarChat" key={index}>
                                <Avatar src="https://preview.redd.it/rz4859l8vaw11.jpg?width=640&crop=smart&auto=webp&s=1d906c4fe4de94df926eba82dade7582fc7d3e20" />
                                <div className="sidebarChat__info">
                                    <h4>{chatHeader}</h4>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}

export default Sidebar;