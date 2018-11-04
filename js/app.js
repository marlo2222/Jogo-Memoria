//VAR's
let carta = document.getElementsByClassName("card");
let cartas = [...carta];
let cartoesAbertos = [];
let movimentos = 0;
let cartoesEncontrados = 0;
//let estrelas = document.querySelectorAll(".fa-star");
this.target = document.querySelector(".counter");
let timer = document.querySelector(".timer");
let segundos = { value: 0, label: " " };
let minutos = { value: 0, label: " : " };
let intervalo;

//POPUP DE PRABENS
const popup = document.getElementById("parabens-popup");

// ---- movimentos
function atualizarHTML(target, value) {
    return target.innerHTML = value;
}

function addMovimento() {
    movimentos++;
    atualizarHTML(this.target, movimentos);
}

// --- reiniciando valores "novo jogo"
function resetMovimentos() {
    movimentos = 0;
    atualizarHTML(this.target, movimentos);
}

function reiniciarTempo() {
    segundos.value = 0;
    minutos.value = 0;
    atualizarTempo();
}

function reinicarCartas() {
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].classList.remove("show", "open", "match");
    }
}

//ESTRELA - ATÉ 15 MOVIMENTOS = 3 ESTRELAS, ATÉ 23 MOVIMENTOS = 2 ESTRELAS, ACIMA DE 23 MOVIMENTOS = 1 ESTRELA

function removeEstrela(i){
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

function reset(){
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

//---- valores padrão caso reinicie o "jogo"
function reiniciarValores() {
    resetMovimentos();
    reiniciarTempo();
    reinicarCartas();
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
    if (cartoesEncontrados === 8) {
        alert("voce conseguiu seu imprestavel");
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

function atualizarJogadas(){
    addMovimento();
    if (movimentos > 15 && movimentos < 23) {
        removeEstrela(2);
    } else if (movimentos > 23) {
       removeEstrela(1);
    }
}
