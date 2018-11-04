//VAR's
let carta = document.getElementsByClassName("card");
let cartas = [...carta];
let cartoesAbertos = [];
let matchedCard = document.getElementsByClassName("match");
let movimentos = 0;

//POPUP DE PRABENS
const popup = document.getElementById("parabens-popup");

let refreshHTML = function (target, value) {
    return target.innerHTML = value;
};

let CounterSet = function (movimentos) {
    this.target = document.querySelector(".counter");
    refreshHTML(this.target, movimentos);
};

//CONTADOR DE MOVIMENTOS
CounterSet.prototype.add = function () {
    movimentos++;
    refreshHTML(this.target, movimentos);
};

//ATUALIZAR-RESETAR O CONTATADOR

CounterSet.prototype.restart = function () {
    movimentos = 0;
    refreshHTML(this.target, movimentos);
};

let counter = new CounterSet(movimentos);

//ESTRELA - ATÉ 15 MOVIMENTOS = 3 ESTRELAS, ATÉ 23 MOVIMENTOS = 2 ESTRELAS, ACIMA DE 23 MOVIMENTOS = 1 ESTRELA
let PlcarEstrela = function () {
    this.estrelas = document.querySelectorAll(".fa-star");
};

PlcarEstrela.prototype.rate = function () {
    if (movimentos > 15 && movimentos < 23) {
        this.estrelas[2].classList.remove("luz");
    } else if (movimentos > 23) {
        this.estrelas[1].classList.remove("luz");
    }
};

PlcarEstrela.prototype.restart = function () {
    for (var i = 0; i < this.estrelas.length; i++) {
        this.estrelas[i].classList.add("luz");
    }
};

let estrelas = new PlcarEstrela();

//DECLANDO O TIMER
const timer = document.querySelector(".timer");


//MOSTRANDO MINUTOS E SEGUNDOS 
let second = {
    value: 0,
    label: " "
};

let minute = {
    value: 0,
    label: " : "
};

let interval;

window.onload = iniciarJogo();

// LISTANDO OS EVENTOS
for (var i = 0; i < cartas.length; i++) {
    //cartas[i].addEventListener("click", mostrarCartao);
    cartas[i].addEventListener("click", abrirCartao);
    //	cartas[i].addEventListener("click", parabens);
}

//RESETAR O BTN
document.querySelector(".restart").addEventListener("click", iniciarJogo);

function iniciarJogo() {//iniciando
    cartas = shuffle(cartas);
    for (var i = 0; i < cartas.length; i++) {
        document.querySelector(".deck").innerHTML = "";
        [].forEach.call(cartas, function (item) {
            document.querySelector(".deck").appendChild(item);
        });

    }
    reiniciarValores();
}

function shuffle(array) {
    var currentIndex = array.length, timerraryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        timerraryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = timerraryValue;
    }

    return array;
}



function reiniciarValores() {
    counter.restart()
    estrelas.restart();
    reiniciartimer();
    cartasDefaul();
}

function cartasDefaul() {
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].classList.remove("show", "open", "match");
    }
}

function abrirCartao() {

    let cartaoAux = $(this);
    if (cartaoAux.hasClass("open show") || cartaoAux.hasClass("match")) {
        return;
    }
    if (cartoesAbertos.length < 2) {
        $(this).toggleClass("open show");
        cartoesAbertos.push(this);
    }

    if (cartoesAbertos.length === 2) {
        counter.add();
        estrelas.rate();
        iniciartime();
        verificarCartoes();
    }
}

function verificarCartoes() {
    if (cartoesAbertos[0].type === cartoesAbertos[1].type) {
        for (var i = 0; i < cartoesAbertos.length; i++) {
            $(cartoesAbertos[i]).toggleClass("match");
        }
        cartoesAbertos = [];
    } else {
        setTimeout(function () {
            for (var i = 0; i < cartoesAbertos.length; i++) {
                $(cartoesAbertos[i]).toggleClass("open show")
            }

            cartoesAbertos = [];
        }, 900);
    }
}



//ATURALIZAR E RESETAR O TEMPO
function refreshtimer() {
    timer.innerHTML = minute.value + minute.label + second.value + second.label;
}

function reiniciartimer() {
    second.value = 0;
    minute.value = 0;
    refreshtimer();
}

// INICIAR O TEMPO
function iniciartime() {
    if (movimentos == 1) {
        interval = setInterval(function () {
            second.value++;
            if (second.value == 60) {
                minute.value++;
                second.value = 0;
            }
            refreshtimer();
        }, 1000);
    }
}


