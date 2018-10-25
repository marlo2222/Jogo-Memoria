/*
 * Create a list that holds all of your cards
 */
let carta = $(".card");
let cartas = [...card];
let cartasviradas = [];

$(function() {

   // $('.card').click(game.selecionarCard);
   // $('.restart').click(game.reset)
    jogo.initGame();

});

class Jogo{
    initGame(){
        jogo.espalharcartas();
    }
function espalharcartas() {
    cartas = shuffle(cartas);
    for (let i = 0; i < cartas.length; i++) {
        document.querySelector(".deck").innerHTML = "";
        [].forEach.call(cards, function (item) {
            document.querySelector(".deck").appendChild(item);
        });
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
selecionarCard(){

    let carta= $(this);

    if (card.hasClass('open show') || card.hasClass("match")){
        return;
    }
    if (!iniciarJogo) {
        iniciarJogo = true;
        cronometro = setTimeout(game.iniciarCronometro(), 500);
    }

    if (cardsVirados.length < 2){
        $(this).toggleClass("open show");
        cardsVirados.push($(this));
    }

    if (cardsVirados.length === 2){
        //game.verificaCardsVirados(cardsVirados)
        cardsVirados = [];
    }

   // game.atualizarNumeroDeJogadas();

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
}
let jogo = new Jogo();//objeto da classe jogo