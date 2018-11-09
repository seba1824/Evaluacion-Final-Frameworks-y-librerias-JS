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

$(function(){

  //agarrar dulces

  $(".elemento").draggable()
})
