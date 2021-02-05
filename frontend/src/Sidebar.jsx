import React from "react";
import "./styles/Sidebar.css";
import "./styles/SidebarChat.css";
import SidebarDropdown from "./components/SidebarDropdown.jsx";
import sidebarChats from "./data/sidebarChats.js";

import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function Sidebar() {
    return (
        <div className = "sidebar">

            <div className="sidebar__header">
                <div className="sidebar__headerRight">
                    <Avatar alt="avatar" src="https://img.favpng.com/11/21/25/iron-man-cartoon-avatar-superhero-icon-png-favpng-jrRBMJQjeUwuteGtBce87yMxz.jpg"/>
                    <div className="sidebar__headerRight__icons">
                        <IconButton><DonutLargeIcon /></IconButton>
                        <IconButton><ChatIcon /></IconButton>
                        <SidebarDropdown />
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
                {sidebarChats.map((chatHeader, index) => {
                    return (
                    <div className="sidebarChat" key={index}>
                        <Avatar src="https://preview.redd.it/rz4859l8vaw11.jpg?width=640&crop=smart&auto=webp&s=1d906c4fe4de94df926eba82dade7582fc7d3e20" />
                        <div className="sidebarChat__info">
                            <h4>{chatHeader.name}</h4>
                            <p>{chatHeader.message}</p>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;