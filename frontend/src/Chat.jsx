import React, {useEffect, useState} from "react";
import "./styles/Chat.css";
import axios from "./axios";
import {useParams} from "react-router-dom";

import {Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat({messages, user}) {

    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId) {
            setRoomName(roomId);
        }
    }, [roomId]);

    const sendMessage = async(event) => {
        event.preventDefault();
        
        await axios.post("/messages/create", {
            "from": user,
            "to": roomName,
            "timestamp": new Date().toLocaleDateString(),
            "message": input,
        });

        setInput("");
    };

    return (

        <div className = "chat">

            <div className = "chat__header">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Gvm-dN3ZscTN56tNhWGhMjqosZ27qeBhSg&usqp=CAU" />
                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Online</p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton><SearchOutlinedIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>

            <div className = "chat__body">
                {messages.map(function(message, index) {
                    if (message.to === roomName)
                    {
                        return (
                            <p className = {(message.from === user) ? "chat__message chat__reciever" : "chat__message"} key={index}>
                                <span className="chat__desc">{message.message}</span>
                                <span className="chat__timestamp">{message.timestamp}</span>
                            </p>);
                    }
                })}
            </div>

            <div className = "chat__footer">
                <IconButton><InsertEmoticonIcon /></IconButton>
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