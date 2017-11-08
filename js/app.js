/*
 * Create a list that holds all of your cards
 */
var cardNames = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
var cards =[];
var openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(cardNames);

// Shuffle function from http://stackoverflow.com/a/2450976
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

var Card = function(name) {
    this.element = $("<li class='card'><i></i></li>");
    $(".deck").append(this.element);
    this.child = $(this.element[0].children[0]);
    this.child.attr("class", name);
};

Card.prototype.open = function() {
    $(this.element[0]).attr("class", "card open show");
};

Card.prototype.match = function() {
    $(this.element[0]).attr("class", "card match");
};

Card.prototype.close = function() {
    $(this.element[0]).attr("class", "card");
};

function makeCards() {
    for (n = 0; n < cardNames.length; n++) {
        cards[n] = new Card(cardNames[n]);
    }
    return cards;
}

function addToOpenCards(x) {
    openCards.push(x);
}

function isMatch() {
    if (openCards[0].child.attr("class") == openCards[1].child.attr("class")) {
        openCards[0].match();
        openCards[1].match();
    }
    else {
        openCards[0].close();
        openCards[1].close();
    }
}

var moves = 0;
function updateMoves() {
    $(".moves").empty().append(moves);
}

function reset() {
    $(".restart").click(function() {
        moves = 0;
        updateMoves();
        $(".deck").empty();
        shuffle(cardNames);
        game();
    });
}

function game() {
    makeCards();
    $.each(cards, function(i, card) {
        $(card.element[0]).click(function() {
            if (openCards.length < 2) {
                if ($(this).attr("class") == "card") {
                    card.open();
                    addToOpenCards(card);
                    moves++;
                    updateMoves();
                }
            }
            else {
                isMatch(card);
                openCards = [];
            }
        });
    });
}

game();
reset();