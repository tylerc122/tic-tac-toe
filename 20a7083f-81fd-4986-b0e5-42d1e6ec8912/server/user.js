const mognoose = require('mongoose');

// Schema is essentially the model for all users.
// So, users are required to have a username that must be unique
// They must also have a password that isn't necessarily unique.
// And they are also assigned a score, which at default is zero.
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { typer: String, required: true },
    score: { type: Number, deafult: 0 }
});

// Then we set our const User equal to the model we just initialzed.
const User = mongoose.model('User', UserSchema);
module.exports = User;