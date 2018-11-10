var interval;
var terminado;
function countdown() {
  terminado = false
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('#timer').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('#timer').html(minutes + ':' + seconds);

      if (minutes == 0 && seconds == 0) clearInterval(interval), terminado = true, gameOver();
  }, 1000);
}
function reset() {
    $('#timer').text("2:00");
    clearInterval(interval);
    terminado = false;
}
//Cuando se quiere iniciar el conteo se llama la función countdown();
//Cuando se quiere detener y reiniciar se llama la función clearInterval(interval)
