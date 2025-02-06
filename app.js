//Npm modules
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

//local modules
const default_routes = require('./routes/default_routes');

//Module scoped variables
const PORT = process.env.PORT || 3000;
const DBSTRING = process.env.DBSTRING || "mongodb://127.0.0.1"

//Set what view engine to use..
app.set('view engine', 'ejs');

//Instruct express to use a folder, public, at root level
//to serve static files
app.use(express.static('public'));

//Encodes the url so we can access it through a request object
//in our controller methods
app.use(express.urlencoded({extended:true}));

//Attach the routes we imported from our router to the app
app.use(default_routes);

//Start the express app.
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