function getRandom(min, max){
  var random = Math.floor(Math.random() * (max - min + 1)+ min);
  return random;
}

//funzione orario
function addTime(){
  var time = new Date();
  var hour = time.getHours() + ':' + addZero(time.getMinutes());
  return hour;
}
//funzione aggiungi zero a numero inferiore di 10
function addZero(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}
