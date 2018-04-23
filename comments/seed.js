const config = require('./config.json');
const mongoose = require('mongoose');
const User = require('./Models/userShema');
const Checkin = require('./Models/checkinShema');

mongoose.connect(`${config.dbUrl}/${config.dbName}`);

const db = mongoose.connection;
const userModel = db.model('users', User);
const checkinModel = db.model('checkin', Checkin);

let user = {
    name: 'Alex',
    email: 'Alex@gmail.com',
    password: '111111',
    twitter: 'Alex_twitter',    
}

// const newUser = new userModel(user);
// newUser.save(function(error, user){
//     console.log(error, user)
// });

userModel.findOne(user, function (err, user) {
    console.log(user.name)

    const newCheckin = new checkinModel({
        coord: [1,0],
        message: 'some message',
        date: new Date(),
        imgUrl: 'URL', 
        rating: [5],
        user: user.id
    });

    newCheckin.save(function(error, checkin){
        console.log(error, checkin)
    });
  });
