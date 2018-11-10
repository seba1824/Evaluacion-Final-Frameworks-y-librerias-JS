var clicks = 0
var movimientos = 0

$(function () {
    tituloamarillo();
    tableroInicio();

    $('.btn-reinicio').on("click", function () {
        clicks += 1;
        if (clicks == 1) {
            $(this).text("Reiniciar");
            countdown();
            abajo();
            derecha();
            titilar();
        }
        if (clicks == 2) {
            $(this).text("Iniciar");
            clicks = 0;
            reset();
            puntos = 0;
            movimientos = 0;
            restart();
            tableroInicio();
        }
    })
})

//arrastrar dulces
function arrastrar() {
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
}


//cambio de color titutlo
function tituloblanco() {
    $('.main-titulo').animate({
        color: "#fff"
    }, 800, function () {
        setTimeout(tituloamarillo, 1700);
    })
};
function tituloamarillo() {
    $('.main-titulo').animate({
        color: "#DCFF0E"
    }, 800, function () {
        setTimeout(tituloblanco, 1700);
    })
};

//poner dulces random al inicio
var id = 1;
function tableroInicio() {
    var cantidad = 7;
    id = 1;
    for (var j = 1; j <= cantidad; j++) {
        for (var i = 0; i < cantidad; i++) {
            var aleatorio = Math.round(Math.random() * (4 - 1) + parseInt(1));
            var pick = "image/" + aleatorio.toString() + ".png";
            if ($('.col-' + j + ' img').length < 7) {
                $('.col-' + j).append('<img src="' + pick + '" class="elemento" id="' + id + '">');
            } id++;
        }
    }
}

//comparar columnas y filas
function derecha() {
    var cantidad = 7;
    var numero = 0;
    for (var i = 0; i < cantidad; i++) {
        for (var j = 1; j < cantidad; j++) {
            var objeto = $('.col-' + j + ' .elemento');
            if ((j + 2) <= 7 && (objeto[i].src == $('.col-' + (j + 1) + ' .elemento')[i].src) && ((objeto[i].src == $('.col-' + (j + 2) + ' .elemento')[i].src))) {
                for (var k = 0; k < cantidad; k++) {
                    if ((j + k) <= 7 && objeto[i].src == $('.col-' + (j + k) + ' .elemento')[i].src) {
                        numero = '#' + $('.col-' + (j + k) + ' .elemento')[i].id;
                        $(numero).addClass('eliminar');
                    } else break;
                }
            }
        }
    }
}

function abajo() {
    var cantidad = 7;
    var numero = 0;
    for (var j = 1; j <= cantidad; j++) {
        for (var i = 0; i < cantidad; i++) {
            var objeto = $('.col-' + j + ' .elemento');
            if ((i + 2) < 7 && (objeto[i].src == objeto[i + 1].src) && (objeto[i].src == objeto[i + 2].src)) {
                for (var k = 0; k < cantidad; k++) {
                    if ((i + k) < 7 && objeto[i].src == objeto[i + k].src) {
                        numero = '#' + objeto[i + k].id;
                        $(numero).addClass('eliminar');
                    } else break;
                }
            }
        }
    }
}

//eliminar dulces iguales
function titilar() {
    if ($('.eliminar').length != 0 && over == false) {
        $('.eliminar').animate({ opacity: 0 }, 200)
            .animate({ opacity: 1 }, 200)
            .animate({ opacity: 0 }, 200)
            .animate({ opacity: 1 }, 200)
            .animate({ opacity: 0 }, 200)
            .animate({ opacity: 1 }, 200)
            .animate({ opacity: 0 }, 250,
                function () {
                    puntaje();
                    $('.eliminar').remove();
                    setTimeout(rellenar, 250);
                    setTimeout(abajo, 300);
                    setTimeout(derecha, 300);
                }
            )
        setTimeout(titilar, 2300);
    } else setTimeout(arrastrar, 100); return false;
}

//añadir despues de eliminar iguales
function rellenar() {
    var cantidad = 7;
    var fill = 0;
    for (i = 1; i <= cantidad; i++) {
        if ($('.col-' + i + ' img').length < 7) {
            fill = cantidad - $('.col-' + i + ' img').length;
            for (j = 0; j < fill; j++) {
                var aleatorio = Math.round(Math.random() * (4 - 1) + parseInt(1));
                var pick = "image/" + aleatorio.toString() + ".png";
                $('.col-' + i).prepend('<img src="' + pick + '" class="elemento" id="' + id + '">');
                id++;
            }
        }
    }
}

//puntos
var puntos = 0;
function puntaje() {
    puntos = puntos + ($('.eliminar').length * 15);
    $('#score-text').text(puntos);
}

//terminacion del tiempo
var over = false;
function gameOver() {
    $('.panel-tablero').animate({
        height: "toggle",
        width: "toggle",
        opacity: 0.2
    }, 895, "linear");
    $('.panel-score').animate({
        width: "+=75%",
    }, 1013, function () {
        letrerofin()
    });
    $('.time').animate({
        height: "toggle",
        width: "toggle",
        opacity: 0.2
    }, 895, "linear");
    over = true;
}

function letrerofin() {
    $('.score').before('<h2 class="titulo-over" style="text-align:center">Juego Terminado</h2>');
}

//reiniciar el tablero
function restart() {
    if (over == true) {
        $('.panel-tablero').animate({
            height: "toggle",
            width: "toggle",
            opacity: 1
        }, 50, "linear")
        $('.time').animate({
            height: "toggle",
            width: "toggle",
            opacity: 1
        }, 50, "linear")
        $('.panel-score').css({ "height": "700px", "width": "25%" })
        over = false
    }
    $('.titulo-over').remove();
    $('.elemento').remove();
    $('#score-text').text(puntos);
    $('#movimientos-text').text(movimientos);
}
