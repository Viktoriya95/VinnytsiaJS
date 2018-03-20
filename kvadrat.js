var latitude = 5;
var longitude = 6;
var coordinates_massive_number = [];
var obstacles_coordinates_number_1 = [];
var obstacles_coordinates_number = [];

var car_coordinate_x = 0;
var car_coordinate_y = 0;

const readlineSync = require('readline-sync');
const coordinates = readlineSync.question('Your coordinates? For example 4.5 ');
const obstacles = readlineSync.question('Obstracles? For example 4.5, 3.2 ');

var coordinates_massive_string = coordinates.split('.');
var obstacles_coordinates_string = obstacles.split(',');
//console.log(obstacles_coordinates_string);
for(var i = 0; i < obstacles_coordinates_string.length; i++){
    obstacles_coordinates_number_1[i] = obstacles_coordinates_string[i].split('.');
    for (var j = 0; j < obstacles_coordinates_number_1[i][j].length; j++){
        console.log(obstacles_coordinates_number_1);
    }
}

//console.log(obstacles_coordinates_number_1);
//console.log(obstacles_coordinates_number);

for(var i = 0; i < coordinates_massive_string.length; i ++){
    coordinates_massive_number.push(Number(coordinates_massive_string[i]));
}

var steps = Math.abs(coordinates_massive_number[0] - car_coordinate_x) + Math.abs(coordinates_massive_number[1] - car_coordinate_y);
