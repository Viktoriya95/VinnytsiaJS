var fs = require('fs');
var fname = 'a_example.in';
var readFile = (err, contents) => {
    var lines = contents.toString().split('\n');
    var firstData = lines[0].split(' ');

    var rows = firstData[0];
    var columns = firstData[1];
    var cars = firstData[2];
    var rides = firstData[3];
    var bonus = firstData[4];
    var steps = firstData[5];

    console.log('rows', rows);
    console.log('columns', columns);
    console.log('cars', cars);
    console.log('rides', rides);
    console.log('bonus', bonus);
    console.log('steps', steps);
    console.log('');

    var ridesMassive = [];
    for(var i = 1; i < lines.length - 1; i++){
        var iData = lines[i].split(' ');
        var massive = {
            ride_id: i,
            ride_from: [iData[0], iData[1]],
            ride_to: [iData[2], iData[3]],
            earliest_start: iData[4],
            latest_finish: iData[5],
            steps: Math.abs(iData[3] - iData[0]) + Math.abs(iData[4] - iData[2])
        };
        ridesMassive[i-1] = massive;
    }
    console.log(ridesMassive);
    console.log('');
    for(var i = 0; i < ridesMassive.length; i++){
        var line = ridesMassive[i];
        for(key in line){
            console.log(key + ": " + line[key]);
        }
    }

    console.log(contents.toString());

    var cars_rides = [{
      car_id: 1,
      car_rides_id: [1]
    },{
      car_id: 2,
      car_rides_id: [2, 3]
    }
  ]

  var out = ()=>{
    var text = "";
    for(var i = 0; i < cars_rides.length; i++){
        var line = cars_rides[i];
        for(key in line){
            text += (key + " " + line[key] + '\n');
        }
        text += '\n';
    }
    return text;
  }

  var file_out = "file.txt";
  fs.open(file_out, "w+", 0644, function(err, file_handle) {
	if (!err) {
	    fs.writeFile(file_handle, out(), function(err, written) {
	        if (!err) {
	            console.log("Текст успешно записан в файл");
	        } else {
	            console.log("Произошла ошибка при записи");
	        }
	    });
	} else {
		console.log("Произошла ошибка при открытии");
	}
});

};

fs.readFile(fname, readFile);
