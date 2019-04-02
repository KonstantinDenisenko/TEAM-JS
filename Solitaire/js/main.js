(function () {
    var $btnReset = document.getElementById('reset');
    var cards = [];
	var playingDecks = {
		deckPlaying1: {cards: [], cardPos: 1, click: checkCard},
		deckPlaying2: {cards: [], cardPos: 3, click: checkCard},
		deckPlaying3: {cards: [], cardPos: 6, click: checkCard},
		deckPlaying4: {cards: [], cardPos: 10, click: checkCard},
		deckPlaying5: {cards: [], cardPos: 15, click: checkCard},
		deckPlaying6: {cards: [], cardPos: 21, click: checkCard},
		deckPlaying7: {cards: [], cardPos: 28, click: checkCard},
		deckDistribution: {cards: [], cardPos: 52, click: openCardDestribution},
		deckDistributionOpen: {cards: [], click: chooseCardDistribution},
		deckFinish1: {cards: [], click: checkCard},
		deckFinish2: {cards: [], click: checkCard},
		deckFinish3: {cards: [], click: checkCard},
		deckFinish4: {cards: [], click: checkCard}
	};
	var mixRandom = function() {
        return Math.random() - 0.5;
    };
	var deckSelected = null;
    var cardSelectedNumber = null;
    var SUIT_CARDS_QTY = 13;
    var CARD_ONCE_NUMBER = 1;
    var CARD_TWO_NUMBER = 2;
    var CARD_THREE_NUMBER = 3;
    var CARD_FOUR_NUMBER = 4;
    var CARD_ELEVEN_NUMBER = 11;
    var CARD_TWELVE_NUMBER = 12;
    var CARD_FIFTYTHREE_NUMBER = 53;
    var HINT_STEP = "Начать стопку Дома можно только с Туза. Все карты в стопке должны быть только одной масти и в таком порядке Туз, 2,3,4,5,6,7,8,9,10, Валет, Дама, Король.";
    var MISTAKE_COLOR = "Неверный ход! На карту черной масти можно положить только карту с красной масти или наоборот и цвета должны чередоваться.";
    var MISTAKE_SUIT = "Неверный ход! Положить карту на другую карту можно, только если эта карта следующая в последовательности. порядок следующий: Король, Дама, Валет, 10,9,8,7,6,5,4,3,2, Туз.";

    function fillArrayCards() {

        for (var i = 1; i < CARD_FIFTYTHREE_NUMBER; i++) {
            var value = i%SUIT_CARDS_QTY === 0 ? SUIT_CARDS_QTY : i%SUIT_CARDS_QTY;
            var name;
            var suit;
            var color;
            var suitGroup = Math.ceil(i/SUIT_CARDS_QTY);

            switch (suitGroup) {
                case CARD_ONCE_NUMBER:
                    suit = 'hearts';
                    color = 'red';
                    break;
                case CARD_TWO_NUMBER:
                    suit = 'diamonds';
                    color = 'red';
                    break;
                case CARD_THREE_NUMBER:
                    suit = 'clovers';
                    color = 'black';
                    break;
                case CARD_FOUR_NUMBER:
                    suit = 'spades';
                    color = 'black';
                    break;
            }

            switch (value) {
                case CARD_ONCE_NUMBER:
                    name = 'A';
                    break;
                case CARD_ELEVEN_NUMBER:
                    name = 'J';
                    break;
                case CARD_TWELVE_NUMBER:
                    name = 'Q';
                    break;
                case SUIT_CARDS_QTY:
                    name = 'K';
                    break;
                default:
                    name = String(value);
            }
    
            cards.push({
                isVisible: false,
                id: 'card' + i,
                value: value,
                name: name,
                suit: suit,
                color: color
            });
        }
    };

    function fillGameDecks() {
		for (var i = 0; i < cards.length; i++) {
			for (key in playingDecks) {
				if (playingDecks[key].cardPos && i < playingDecks[key].cardPos) {
					playingDecks[key].cards.push(cards[i]);
					
					break;
				}
			}
		}
    };

    function openFirstCard() {
        for (key in playingDecks) {
            if (playingDecks[key].cardPos) {
                playingDecks[key].cards[playingDecks[key].cards.length-1].isVisible = playingDecks[key] !== playingDecks.deckDistribution
            }
        }
    };
  
    function drawTable(){
		for (key in playingDecks) {
			createDeck(playingDecks[key].cards, document.getElementById(key));
		}
    };

    function createDeck(deck, $deck){
        var card;
        $deck.innerHTML = "";

        for (var i = 0; i < deck.length; i++) {
            card = document.createElement('div');
            card.innerHTML = deck[i].name;
            card.id = deck[i].id;
            card.classList.add("card", deck[i].suit, (deck[i].isVisible ? "open" : false));

            $deck.appendChild(card);
        }
    };
       
    function addEvents(){
		for (key in playingDecks) {
			(function(deckKey){
				document.getElementById(deckKey).addEventListener('click', function(event) {
					playingDecks[deckKey].click(event, deckKey);
				});
			})(key);
		}

        $btnReset.addEventListener("click", resetGame);
    };

    function openCardDestribution() {
        var clickedCard;
        var card;

        if (playingDecks.deckDistribution.cards.length) {
            clickedCard = playingDecks.deckDistribution.cards.pop();
            clickedCard.isVisible = true;
            playingDecks.deckDistributionOpen.cards.push(clickedCard);
        } else {
            while (playingDecks.deckDistributionOpen.cards.length) {
                card = playingDecks.deckDistributionOpen.cards.pop();
                card.isVisible = false;
                playingDecks.deckDistribution.cards.push(card);
            }
        }
        drawTable();
    };

    function chooseCardDistribution(event, deckKey) {
        deckSelected = deckKey;
        cardSelectedNumber = event.target.id;
        event.target.classList.add("active");
    };

    function checkCard(event, deckNum) {
        if (deckSelected) {
            moveCards(deckNum, event.target.id, deckSelected, cardSelectedNumber);
            deckSelected = null;
            cardSelectedNumber = null;
            drawTable();
            checkGameCompletion();
        } else {
            deckSelected = deckNum;
            cardSelectedNumber = event.target.id;
            event.target.classList.add("active");
        }
    };

    function checkGameCompletion() {
        if (playingDecks.deckFinish1.cards.length === SUIT_CARDS_QTY &&
            playingDecks.deckFinish2.cards.length === SUIT_CARDS_QTY &&
            playingDecks.deckFinish3.cards.length === SUIT_CARDS_QTY &&
            playingDecks.deckFinish4.cards.length === SUIT_CARDS_QTY) {
            alert("Поздравляем Вы выиграли!");
            resetGame();
        }
    };

    function resetGame() {
        cards = [];
		for (key in playingDecks) {
			playingDecks[key].cards = [];
		}
        fillArrayCards();
        cards.sort(mixRandom);
        fillGameDecks();
        openFirstCard();
        drawTable();
    };

    function moveCards(secondDeckId, secondCardId, firstDeckId, firstCardId) {
        var secondDeck;
        var firstDeck;
        var movingCardIndex;
        var compareCardSuit1;
        var compareCardValue1;
        var compareCardSuit2;
        var compareCardValue2 = 0;
        var compareCardColor1;
        var compareCardColor2;

		firstDeck = playingDecks[firstDeckId].cards;
		secondDeck = playingDecks[secondDeckId].cards;

        for (var i = 0; i < firstDeck.length; i++) {
            if (firstDeck[i].id === firstCardId) {
                movingCardIndex = i;
                compareCardSuit1 = firstDeck[i].suit;
                compareCardValue1 = firstDeck[i].value;
                compareCardColor1 = firstDeck[i].color;
            }
        }

        for (var i = 0; i < secondDeck.length; i++) {
            if (secondDeck[i].id === secondCardId) {
                compareCardSuit2 = secondDeck[i].suit;
                compareCardValue2 = secondDeck[i].value;
                compareCardColor2 = secondDeck[i].color;
            }
        }

        if (secondDeckId === 'deckFinish1' ||
            secondDeckId === 'deckFinish2' ||
            secondDeckId === 'deckFinish3' ||
            secondDeckId === 'deckFinish4') {
            if (compareCardValue1 - 1 === compareCardValue2 &&
                compareCardSuit1 === compareCardSuit2 || compareCardValue1 === 1) {
                spliceCards(firstDeck, secondDeck, movingCardIndex);
            } else {
                alert(HINT_STEP);
            }
        } else if (compareCardValue1 === compareCardValue2 - 1 || secondDeckId === secondCardId) {
            if (compareCardColor1 !== compareCardColor2 || secondDeckId === secondCardId) {
                spliceCards(firstDeck, secondDeck, movingCardIndex);
            } else {
                alert(MISTAKE_COLOR);
            }
        } else {
            alert(MISTAKE_SUIT);
        }
    };
    
    function spliceCards(firstDeck, secondDeck, movingCardIndex) {
        var cards;
        cards = firstDeck.splice(movingCardIndex, firstDeck.length);
        for (var i = 0; i < cards.length; i++) {
            secondDeck.push(cards[i]);
        }
        upendCard(firstDeck);
    };

    function upendCard(firstDeck) {
        if (firstDeck.length)  {
            firstDeck[firstDeck.length - 1].isVisible = true;
        }
    };
	
	fillArrayCards();
    cards.sort(mixRandom);
    fillGameDecks();
    openFirstCard();
	drawTable();
	addEvents();
})();













































