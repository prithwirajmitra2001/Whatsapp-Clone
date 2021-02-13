// Importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from 'dotenv';
dotenv.config();
import Messages from "./dbMessages.js";
import Auth from "./dbAuth.js";
import cors from "cors";

// App config
const app = express();
const port = 5000;

const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', function() {
    console.log("DB Connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', function(change) {
        
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                "from": messageDetails.from,
                "to": messageDetails.to,
                "message": messageDetails.message,
                "timestamp": messageDetails.timestamp
            });
        } else if (change.operationType === 'delete') {
            pusher.trigger('messages', 'deleted', change.documentKey._id
            );
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

// API Routes

// dbMessages Route
app.get("/messages/read", function(req, res) {

    Messages.find(function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/messages/create", function(req, res) {

    const dbMessage = req.body;
    Messages.create(dbMessage, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// dbAuthentication Route
app.put("/auth/find", function(req, res) {

    const findData = req.body;
    Auth.findOne(findData, function(err, found) {
        if (err) {
            res.status(500).send(err);
        } else if (found) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    });
});

app.post("/auth/create", function(req, res) {

    const dbAuth = req.body;
    Auth.create(dbAuth, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// Listener
app.listen(port, function () {
    console.log('Server on localhost:' + port);
});