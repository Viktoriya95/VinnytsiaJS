const readlineSync = require('readline-sync');
var massive = [];
var numberArray = [];
var randArray = [];
var korovs = [];
var buks = [];
var korovs_string = "";
var buks_string = "";
var b = 0;

for (var i = 1; i < number.toString().length + 1; ){
    var randNum = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    for (var j = 0; j < i; j++){
        if((randArray[j] != randNum) && (j == 0 && randNum != 0)){
            randArray.push(randNum);
            i++;
        }
    }
}

do{
    while(buks.length) {
        buks.shift();
    }
    while(korovs.length) {
        korovs.shift();
    }
    buks_string = "";
    korovs_string = "";
    b = 0;

    console.log("Ваше 4-значне число. Цифри не повинні повторюватися.");
    var text = readlineSync.question(' ');
    var number = Number(text);
    var k = number;
    for(var i = 0; i < text.length; i++){
        n = k%10;
        k = k/10 - n/10;
        massive.push(n);
    }
    for(var i = 0; i < text.length; i++){
        numberArray[i] = massive[text.length - i - 1];
    }

    /*for (var i in numberArray){
        console.log(numberArray[i]);
        var j = i + 1;
        for(j in numberArray){
          console.log(numberArray[j]);
            if(numberArray[i] == numberArray[j]){
                console.log("Цифри не повинні повторюватися. Ваше 4-значне число.");
                number = readlineSync.question(' ');
                break;
            }
        }
    }*/

    console.log(randArray);

    for(var i = 0; i < number.toString().length; i++){
        if(numberArray[i] == randArray[i]){
            buks.push(Number(numberArray[i]));
        }
        else{
            for(var f = 0; f < number.toString().length; f++){
                if((numberArray[i] == randArray[f]) && (numberArray[i] != randArray[i])){
                    korovs.push(Number(numberArray[i]));
                }
            }
        }
    }

    for(var i in korovs){
        korovs_string +=" " + korovs[i];
    }

    for(var i in buks){
        buks_string +=" " + buks[i];
    }

    for(var i = 0; i < number.toString().length; i++){
        if(buks[i] == randArray[i]){
            b++;
        }
    }

    if (b == number.toString().length){
        console.log("Ви виграли!");
    }
    else{
        console.log("Бики" + buks_string + " i корови" + korovs_string + ".");
    }

}
while(b != number.toString().length)
