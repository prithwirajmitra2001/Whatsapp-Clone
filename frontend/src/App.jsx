import React, {useState, useEffect} from "react";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import "./styles/App.css";

function App({user}) {

  const [messages, setMessages] = useState([]);

  useEffect(function() {
    axios.get("/messages/read").then(function(res) {
        setMessages(res.data);
      });
  }, []);

  useEffect(function() {
    const pusher = new Pusher('c26dd59ac42ff0684540', { cluster: 'ap2' });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar messages={messages} user={user}/>
        <Chat messages={messages} user={user}/>
      </div>
    </div>
  );
}

export default App;
