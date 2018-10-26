/*
 * Create a list that holds all of your cards
 */
let carta = $(".card");
let cartas = [...carta];
let cartasviradas = [];
let estadoJogo = false;
let carta1, carta2;
let numCartas = 0;

$(function () {

    //$('.card').click(game.escolherCarta);
    // $('.restart').click(game.reset)
    jogo.initGame();

});

class Jogo {
    initGame() {
       jogo.espalharcartas();
    }
espalharcartas(){
    cartas = jogo.shuffle(cartas);
    for (let i = 0; i < cartas.length; i++) {
        document.querySelector(".deck").innerHTML = "";
        [].forEach.call(cartas, function (item) {
            document.querySelector(".deck").appendChild(item);
        });
    }
}
escolherCarta() {

    if (estadoJogo != true) {
        estadoJogo = true;
    }
    if (cartasviradas.length < 2) {
        $(this).toggleClass("open show");
        cartasviradas[numCartas++] = $(this);
    }
    if (cartasviradas.length == 2) {
        jogo.verificarSeAcertou(cartasviradas);
        numCartas = 0;
    }

}
verificarSeAcertou(cartasviradas) {
    carta1 = card[0].firstChild.nextSibling.classList[1];
    carta2 = card[1].firstChild.nextSibling.classList[2];
    alert(carta1);
}
shuffle(array) {
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