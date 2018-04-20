var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var text = "";
  fs.open('../expressTwitter/log.csv', "r+", 0644, function(err, file_handle) {
      if (!err) {
        fs.readFile('../expressTwitter/log.csv', function (err, contents) {
          var text_massive = contents.toString().split('\n');
          for(var i = 0; i < text_massive.length; i = i + 6){
            if(text_massive[0] == ''){
              text = 'There are no users.';
            } else if(text_massive[i] != ''){
              text += text_massive[i] + '\n' + text_massive[i + 1] + '\n' + text_massive[i + 2] + '\n' + '\n';
            }
          }
          //console.log(text);
          res.render('users', {text: text});
      })} else {
          text = 'There are no atnother users.';
          res.render('users', { text: text});
      }
    });
  //console.log(text);

});

module.exports = router;
