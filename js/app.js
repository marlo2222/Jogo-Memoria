//VAR's
let carta = document.getElementsByClassName("card");
let cartas = [...carta];
let cartoesAbertos = [];
let movimentos = 0;
let cartoesEncontrados = 0;
this.target = document.querySelector(".counter");
let timer = document.querySelector(".timer");
let segundos = { value: 0, label: " " };
let minutos = { value: 0, label: " : " };
let intervalo;



// ---- movimentos
function atualizarHTML(target, value) {
    return target.innerHTML = value;
}

function addMovimento() {
    movimentos++;
    atualizarHTML(this.target, movimentos);
}

//estrelas: jogadas <= 15 : 3 estrelas,  jogadas <= 23 : 2 estrelas 
function removeEstrela(i) {
    this.estrelas = document.querySelectorAll(".fa-star");
    this.estrelas[i].classList.add("dull");
}

// ---- tempo
function atualizarTempo() {
    timer.innerHTML = minutos.value + minutos.label + segundos.value + segundos.label;
}

function inicarTempo() {
    if (movimentos == 1) {
        intervalo = setInterval(function () {
            segundos.value++;
            if (segundos.value == 60) {
                minutos.value++;
                segundos.value = 0;
            }
            atualizarTempo();
        }, 1000);
    }
}


// ---- chamada do inicio do jogo
window.onload = iniciarJogo();

for (var i = 0; i < cartas.length; i++) {
    cartas[i].addEventListener("click", abrirCartao);
}

// ---- reiniciar jogo
document.querySelector(".restart").addEventListener("click", reset);

function reset() {
    location.reload();
}

// iniciando o jogo;
function iniciarJogo() {//iniciando
    cartas = shuffle(cartas);
    for (var i = 0; i < cartas.length; i++) {
        document.querySelector(".deck").innerHTML = "";
        [].forEach.call(cartas, function (item) {
            document.querySelector(".deck").appendChild(item);
        });

    }
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

// ---- abri cartao
function abrirCartao() {
    //usei um pouco de jquery aqui, não sei se poderia.
    let cartaoAux = $(this);
    if (cartaoAux.hasClass("open show") || cartaoAux.hasClass("match")) {
        return;
    }
    if (cartoesAbertos.length < 2) {
        $(this).toggleClass("open show");
        cartoesAbertos.push(this);
    }
    if (cartoesAbertos.length === 2) {
        atualizarJogadas();
        inicarTempo();
        verificarCartoes();
    }
    if (cartoesEncontrados === 1) {
        terminarJogo();
    }
}

function verificarCartoes() {
    if (cartoesAbertos[0].type === cartoesAbertos[1].type) {
        for (var i = 0; i < cartoesAbertos.length; i++) {
            $(cartoesAbertos[i]).toggleClass("match");
        }
        cartoesAbertos = [];
        cartoesEncontrados++;
    } else {
        setTimeout(function () {
            for (var i = 0; i < cartoesAbertos.length; i++) {
                $(cartoesAbertos[i]).toggleClass("open show")
            }
            cartoesAbertos = [];
        }, 1000);
    }
}

function atualizarJogadas() {
    addMovimento();
    if (movimentos > 12 && movimentos < 20) {
        removeEstrela(2);
    } else if (movimentos > 20) {
        removeEstrela(1);
    }
}

function terminarJogo() {
    swal({
        title: "Parabens!!!",
        text: "você concluiu o jogo com " +movimentos + " movimentos.",
        type: "success",
        timer: 5000,
        showConfirmButton: false
      }, function(){
            window.location.href = "index.html";
      });
}
