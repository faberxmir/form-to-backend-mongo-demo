//Npm modules
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

//local modules
const default_routes = require('./routes/default_routes');

const PORT = process.env.PORT || 3000;
const DBSTRING = process.env.DBSTRING || "mongodb://127.0.0.1"

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(default_routes);

app.listen(PORT, initApp);


// This function is responsible for initializing other modules that 
// are used within the app. 
function initApp(){
    try {
        console.info(`Attempting connection to: ${DBSTRING}`);
        const db = mongoose.connect(DBSTRING, {dbName:"Example"});
        if(db){
            console.info('Connection to database established!');
        }
    } catch(error){
        console.error('Could not connect to database!\n', error.message,'\n');
    }
    console.info(`server running on port: ${PORT}\nstarted @ ${new Date().toString()}`);
}