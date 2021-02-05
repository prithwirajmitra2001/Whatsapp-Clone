// Importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";
import Auth from "./dbAuth.js";
import cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 5000;

const pusher = new Pusher({
    appId: "1148341",
    key: "c26dd59ac42ff0684540",
    secret: "98c4d32f59888be1357b",
    cluster: "ap2",
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(cors());

// DB config
const url = "mongodb+srv://prithwiraj:uPUmQK3iFOCFgE89@cluster0.nnxss.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', function() {

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', function(change) {
        
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                    "name": messageDetails.name,
                    "message": messageDetails.message,
                    "timestamp": messageDetails.timestamp
                });
        } else {
            console.log("Error triggiring Pusher");
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
app.get("/auth/read", function(req, res) {

    Auth.find(function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
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