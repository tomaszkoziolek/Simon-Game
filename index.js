var koloryBoxow = [
    "red",
    "blue",
    "green",
    "yellow"
]

var sekwencja = [];
var sekwencjaGracza = [];
var poziom = 0;
var graRozpoczeta = false;
var soundOn = true;

function nastepnaSekwencja() {
    sekwencjaGracza = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomBoxColor = koloryBoxow[randomNumber];
    sekwencja.push(randomBoxColor);
    $("#" + randomBoxColor).fadeOut().fadeIn("fast");
    dzwiek(randomBoxColor);
    poziom++;
    $("h1").text("Poziom " + poziom);
}

function dzwiek(kolor) {
    if (soundOn) {
        var dzwiek = new Audio("sounds/" + kolor + ".mp3");
        dzwiek.play();
    }
}

function animacjaKlikniecia(kolor) {
    var btn = $("#" + kolor);
    btn.addClass("pressed");
    setTimeout(function() {
        btn.removeClass("pressed");
    }, 100);
}

function sprawdzOdpowiedz(index) {
    if (sekwencjaGracza[index] === sekwencja[index]) {
        if (sekwencjaGracza.length === sekwencja.length) {
            setTimeout(function() {
                nastepnaSekwencja();
            }, 1000);
        }
    } else {
        dzwiek("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Wciśnij Dowolny Klawisz Aby Zagrać Ponownie");
        restart();
    }
}

function restart() {
    poziom = 0;
    sekwencja = [];
    graRozpoczeta = false;
}

$(".btn").on("click", function(event) {
    if (graRozpoczeta) {
        var kliknietyKolor = event.target.id;
        sekwencjaGracza.push(kliknietyKolor);
        dzwiek(kliknietyKolor);
        animacjaKlikniecia(kliknietyKolor);
        sprawdzOdpowiedz(sekwencjaGracza.length - 1);
    }
});

$(document).on("keydown", function() {
    if (!graRozpoczeta){
        nastepnaSekwencja();
        graRozpoczeta = true;
    }
});

/* ------------------------------------------------------------------------------------- */

$("#pomoc-btn").click(function() {
    $("#pomoc").toggle();
})

$("#sound").click(function() {
    soundOn = !soundOn;
    if (soundOn) {
        $("#sound").text("Dźwięk: on");
    } else {
        $("#sound").text("Dźwięk: off");
    }
})