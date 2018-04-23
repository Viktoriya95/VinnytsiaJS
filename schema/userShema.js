const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// ObjectId = Schema.ObjectId;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    twitterAccount: String,
    password: String,
    confirmPassword: String
});

module.exports = User;
