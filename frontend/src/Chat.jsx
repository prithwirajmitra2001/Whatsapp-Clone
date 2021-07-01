import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "./axios";
import "./styles/Chat.css";

import {Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function Chat({messages, user}) {

    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId) {
            setRoomName(roomId);
        }
    }, [roomId]);
    
    function deleteClicked(index) {
        axios.put("/messages/delete", messages[index]);
    }

    const sendMessage = async(event) => {
        event.preventDefault();
        
        await axios.post("/messages/create", {
            "from": user,
            "to": roomName,
            "timestamp": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            "message": input,
        });

        setInput("");
    };

    return (

        <div className = "chat">

            <div className = "chat__header">
                <Avatar src="https://preview.redd.it/rz4859l8vaw11.jpg?width=640&crop=smart&auto=webp&s=1d906c4fe4de94df926eba82dade7582fc7d3e20" />
                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Online</p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton><SearchOutlinedIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>

            <div className = "chat__body">
                {messages.map(function(message, index) {
                    if ((message.from === user && message.to === roomName) || ((message.from === roomName && message.to === user)))
                    {
                        return (
                            <p className = {(message.from === user) ? "chat__message chat__reciever" : "chat__message"} key={index}>
                                <span className="chat__desc">{message.message}</span>
                                <span className="chat__timestamp">{message.timestamp}</span>
                                <IconButton className="roundedIcon" onClick={() => deleteClicked(index)} style={{padding: "0"}}>
                                        <DeleteRoundedIcon fontSize="small"/>
                                </IconButton>
                            </p>
                        );
                    }
                })}
            </div>

            <div className = "chat__footer">
                <IconButton><InsertEmoticonIcon /></IconButton>
                <IconButton><AttachFileIcon /></IconButton>
                <form>
                    <input
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder = "Type a message"
                        type = "text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <IconButton><MicIcon /></IconButton>
            </div>

        </div>
    );
}

export default Chat;