const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// ObjectId = Schema.ObjectId;

const User = new Schema({
    admin: Boolean,
    name: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    twitter_account: String,
});

module.exports = User;
