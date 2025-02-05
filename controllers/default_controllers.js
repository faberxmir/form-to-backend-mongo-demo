const User = require('../models/User');

const index = (req, res, next)=>{
    res.render('index');
}

const showMongoData = async (req,res,next)=>{
    try {
        const users = await User.find({});
        console.log(users);
        res.status(200).render('Users', {users});
    } catch(error){
        console.log('error was caught!', error);
        res.status(500).json({message:error.message});
    }
}

const parseFrontendToMongo = async (req, res, next)=>{
    const {name,surname}= req.body;
    console.log(name, surname);
    try {
        await User.create({name,surname});
        res.status(200).redirect('/showmongodata');
    } catch(error){
        console.log('error was caught!', error);
        res.status(500).json({message:error.message});
    }
}

module.exports={
    index,
    showMongoData,
    parseFrontendToMongo
}