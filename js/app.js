var colores = 0;

//cambiar color del cartel automaticamente
  setInterval( function(){
    if (colores == 1){
      $('h1').css('color','#DCFF0E');
      colores = 0;
    } else {
      $('h1').css('color','white');
      colores = 1;
    };
  },1000);

//rellenar dulces aleatoriamente

for (var f=0; f<7; f++){
  for(var i = 0; i<=7;i++){
    num = Math.floor((Math.random()*4) +1);
    $('.col-' + i).prepend("<img class='elemento' src='image/"+num+".png'>")
  }
}

  //agarrar dulces

  $('.elemento').draggable({
      start: function () {
          $(this).next().droppable({
              accept: ".elemento",
              drop: function (event, ui) {
                  var imagen2 = $(this).attr("src");
                  var imagen1 = $(ui.draggable).attr("src");
                  $(this).attr("src", '' + imagen1 + '');
                  $(ui.draggable).attr("src", '' + imagen2 + '')
                  movimientos++;
                  $('#movimientos-text').text(movimientos);
                  $(this).droppable('destroy')
              }
          })
          $(this).prev().droppable({
              accept: ".elemento",
              drop: function (event, ui) {
                  var imagen2 = $(this).attr("src");
                  var imagen1 = $(ui.draggable).attr("src");
                  $(this).attr("src", '' + imagen1 + '');
                  $(ui.draggable).attr("src", '' + imagen2 + '')
                  movimientos++;
                  $('#movimientos-text').text(movimientos);
                  $(this).droppable('destroy')
              }
          })
          var fila = $(this).index()
          var columna = $(this).parent().attr('class');
          columna = columna.split("-")[1];
          columna = parseInt(columna);
          if (columna == 1) {
              var derecha = $('.col-' + (columna + 1) + ' .elemento:eq(' + fila + ')').attr('id');
              $("#" + derecha).droppable({
                  accept: ".elemento",
                  drop: function (event, ui) {
                      var imagen2 = $(this).attr("src");
                      var imagen1 = $(ui.draggable).attr("src");
                      $(this).attr("src", '' + imagen1 + '');
                      $(ui.draggable).attr("src", '' + imagen2 + '')
                      movimientos++;
                      $('#movimientos-text').text(movimientos);
                      $(this).droppable('destroy')
                  }
              })
          } else if (columna > 1 && columna < 7) {
              var derecha = $('.col-' + (columna + 1) + ' .elemento:eq(' + fila + ')').attr('id');
              $("#" + derecha).droppable({
                  accept: ".elemento",
                  drop: function (event, ui) {
                      var imagen2 = $(this).attr("src");
                      var imagen1 = $(ui.draggable).attr("src");
                      $(this).attr("src", '' + imagen1 + '');
                      $(ui.draggable).attr("src", '' + imagen2 + '')
                      movimientos++;
                      $('#movimientos-text').text(movimientos);
                      $(this).droppable('destroy')
                  }
              });
              var izquierda = $('.col-' + (columna - 1) + ' .elemento:eq(' + fila + ')').attr('id');
              $("#" + izquierda).droppable({
                  accept: ".elemento",
                  drop: function (event, ui) {
                      var imagen2 = $(this).attr("src");
                      var imagen1 = $(ui.draggable).attr("src");
                      $(this).attr("src", '' + imagen1 + '');
                      $(ui.draggable).attr("src", '' + imagen2 + '')
                      movimientos++;
                      $('#movimientos-text').text(movimientos);
                      $(this).droppable('destroy')
                  }
              });;
          } if (columna == 7) {
              var izquierda = $('.col-' + (columna - 1) + ' .elemento:eq(' + fila + ')').attr('id');
              $("#" + izquierda).droppable({
                  accept: ".elemento",
                  drop: function (event, ui) {
                      var imagen2 = $(this).attr("src");
                      var imagen1 = $(ui.draggable).attr("src");
                      $(this).attr("src", '' + imagen1 + '');
                      $(ui.draggable).attr("src", '' + imagen2 + '')
                      movimientos++;
                      $('#movimientos-text').text(movimientos);
                      $(this).droppable('destroy')
                  }
              });;
          }
      },
      containment: $('.panel-tablero'), cursor: "crosshair", revert: true,
      stop: function (event, ui) {
          derecha();
          abajo();
          titilar();
          $('.elemento').draggable('destroy')
      }
  });
