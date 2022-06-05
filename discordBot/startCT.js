
const PORT = 8001;
const CERT_PATH = "/etc/letsencrypt/live/transmitter.hazmoleaws.work/";

const INTERACT_CHANNEL = "XXXXXX"; // Channel ID
const APP_ID = "XXXXXX"; // App ID

const chatTransmit = require('./chatTransmit');

var app = new chatTransmit.start( PORT, CERT_PATH, INTERACT_CHANNEL, APP_ID);



