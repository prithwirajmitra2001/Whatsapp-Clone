import React, {useState} from "react";
import "./styles/Sidebar.css";
import "./styles/SidebarChat.css";

import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Sidebar() {

    const [persons, setPersons] = useState([]);

    function addFriend() {
        const person = prompt("Enter name:");
        setPersons([...persons, person]);
    }

    return (
        <div className = "sidebar">

            <div className="sidebar__header">
                <div className="sidebar__headerRight">
                    <Avatar alt="avatar" src="https://img.favpng.com/11/21/25/iron-man-cartoon-avatar-superhero-icon-png-favpng-jrRBMJQjeUwuteGtBce87yMxz.jpg"/>
                    <div className="sidebar__headerRight_Icons" onClick={addFriend}>
                        <IconButton><DonutLargeIcon /></IconButton>
                        <IconButton><ChatIcon /></IconButton>
                        <IconButton><AddCircleIcon /></IconButton>
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
                    <div className="sidebarChat" key={index}>
                        <Avatar src="https://preview.redd.it/rz4859l8vaw11.jpg?width=640&crop=smart&auto=webp&s=1d906c4fe4de94df926eba82dade7582fc7d3e20" />
                        <div className="sidebarChat__info">
                            <h4>{chatHeader}</h4>
                        </div>
                    </div>
                    );
                })}
            </div>

        </div>
    );
}

export default Sidebar;