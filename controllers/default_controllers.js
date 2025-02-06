const User = require('../models/User');

//This is the simplest possible controller, rendering the index page only.
const index = (req, res, next)=>{
    res.render('index');
}

//This controller retrieves data found from all users and renders a page, Users, 
//if it finds data. Returns json with a message if anything fails.
const showMongoData = async (req,res,next)=>{
    try {
        //By using no search parameters in the find method, all users in the 
        //collection will be returned
        const users = await User.find({});
        //renders "Users", showing all users.
        res.status(200).render('Users', {users});
    } catch(error){
        //If failure return json that notifies about the error.
        res.status(500).render('Users', {feedback: error.message});
    }
}


//This controller takes data, name/surname, from the request body. We can do this 
//because it is URL-encoded in "app.js", else it would be more complicated. 
const parseFrontendToMongo = async (req, res, next)=>{
    const {name,surname}= req.body;
    try {
        // uses name/surname and creates an entry in the database
        await User.create({name,surname});
        //If success redirects the request to the route shown.
        res.status(200).redirect('/showmongodata');
    } catch(error){
        //If failure return json that notifies about the error.
        if(error?.code === 11000){
            res.status(409).render('index', {feedback: 'Your surname must be unique!'});
        } else {
            res.status(500).render('index', {feedback: error.message});
        }
    }
}

module.exports={
    index,
    showMongoData,
    parseFrontendToMongo
}