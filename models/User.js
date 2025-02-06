// Dette er en minimal modell for å kunne demonstrere hvordan mongoose 
// til å håndtere forflytning av data tur/retur backend
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: {
        type: String,
        unique: true
    }
});

const User = mongoose.model('Demo-User', userSchema);

module.exports=User;