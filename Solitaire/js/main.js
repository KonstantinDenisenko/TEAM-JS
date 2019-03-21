(function () {
    var $btnReset = document.getElementById('reset');
    var cards = [];
	var playingDecks = {
		deckPlaying1: {array: [], cardPos: 1, click: checkCard},
		deckPlaying2: {array: [], cardPos: 3, click: checkCard},
		deckPlaying3: {array: [], cardPos: 6, click: checkCard},
		deckPlaying4: {array: [], cardPos: 10, click: checkCard},
		deckPlaying5: {array: [], cardPos: 15, click: checkCard},
		deckPlaying6: {array: [], cardPos: 21, click: checkCard},
		deckPlaying7: {array: [], cardPos: 28, click: checkCard},
		deckDistribution: {array: [], cardPos: 52, click: openCardDestribution},
		deckDistributionOpen: {array: [], click: chooseCardDistribution},
		deckFinish1: {array: [], click: checkCard},
		deckFinish2: {array: [], click: checkCard},
		deckFinish3: {array: [], click: checkCard},
		deckFinish4: {array: [], click: checkCard}
	}
	var mixRandom = function() {
        return Math.random() - 0.5;
    };
	var deckSelected = null;
    var cardSelectedNumber = null;

    
    function fillingArrayCards() {

        for (var i = 1; i < 53; i++) {
            var value = i%13 === 0 ? 13 : i%13;
            var name;
            var suit;
            var suitGroup = Math.ceil(i/13);
    
            if (suitGroup === 1) {
                suit = 'hearts';
            } else if (suitGroup === 2) {
                suit = 'diamonds';
            } else if (suitGroup === 3) {
                suit = 'clovers';
            } else if (suitGroup === 4) {
                suit = 'spades';
            }
    
            if (value === 1) {
                name = 'A';
            } else if (value === 11) {
                name = 'J';
            } else if (value === 12) {
                name = 'Q';
            } else if (value === 13) {
                name = 'K';
            } else {
                name = String(value);
            }
    
            cards.push({
                isVisible: false,
                id: 'card' + i,
                value: value,
                name: name,
                suit: suit,
            });
        }
    };

    function fillingGameDecks() {
		for (var i = 0; i < cards.length; i++) {
			for (key in playingDecks) {
				if (playingDecks[key].cardPos && i < playingDecks[key].cardPos) {
					playingDecks[key].array.push(cards[i]);
					
					break;
				}
				
			}
		}
		
		for (key in playingDecks) {
			if (playingDecks[key].cardPos) {
				console.log(key);
				if (playingDecks[key] === playingDecks.deckDistribution) {
					playingDecks[key].array[playingDecks[key].array.length-1].isVisible = false;
				}else {
					playingDecks[key].array[playingDecks[key].array.length-1].isVisible = true;
				}
			}
		}
    };
  
    function drawTable(){
		for (key in playingDecks) {
			createDeck(playingDecks[key].array, document.getElementById(key));
		}
    };

    function createDeck(deck, $deck){
        var cardsHTML = '';

        for (var i=0;i<deck.length;i++) {
            cardsHTML = cardsHTML + '<div id="'+ deck[i].id +'" class="card '+ deck[i].suit + (deck[i].isVisible ? ' open' : '') +'">'+ deck[i].name +'</div>';
        }
        $deck.innerHTML = cardsHTML;
    };
       
    function addEvents(){
		for (key in playingDecks) {
			(function(deckKey){
				document.getElementById(deckKey).addEventListener('click', function(event) {
					playingDecks[deckKey].click(event, deckKey);
				});
			})(key);
		}

        $btnReset.addEventListener("click", function () {
            resetGame();
        });


    };

    function openCardDestribution() {
        var clickedCard;
        var card;

        if (!playingDecks.deckDistribution.array.length) {
            while (playingDecks.deckDistributionOpen.array.length) {
                card = playingDecks.deckDistributionOpen.array.pop();
                card.isVisible = false;
                playingDecks.deckDistribution.array.push(card);
            }
        } else {
            clickedCard = playingDecks.deckDistribution.array.pop();
            clickedCard.isVisible = true;
            playingDecks.deckDistributionOpen.array.push(clickedCard);
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
        if (playingDecks.deckFinish1.array.length === 13 && playingDecks.deckFinish2.array.length === 13 && playingDecks.deckFinish3.array.length === 13 && playingDecks.deckFinish4.array.length === 13) {
            alert("Поздравляем Вы выиграли!");
            resetGame();
        }
    };

    function resetGame() {
        cards = [];
		for (key in playingDecks) {
			playingDecks[key].array = [];
		}
        fillingArrayCards();
        cards.sort(mixRandom);
        fillingGameDecks();
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
		
		
		firstDeck = playingDecks[firstDeckId].array;
		secondDeck = playingDecks[secondDeckId].array;


        for (var i = 0; i < firstDeck.length; i++) {
            if (firstDeck[i].id === firstCardId) {
                movingCardIndex = i;
                compareCardSuit1 = firstDeck[i].suit;
                compareCardValue1 = firstDeck[i].value;
            }
        }

        for (var i = 0; i < secondDeck.length; i++) {
            if (secondDeck[i].id === secondCardId) {
                compareCardSuit2 = secondDeck[i].suit;
                compareCardValue2 = secondDeck[i].value;
            }
        }

        if (compareCardSuit1 === 'hearts' || compareCardSuit1 === 'diamonds') {
            compareCardColor1 = "red";
        } if (compareCardSuit1 === 'clovers' || compareCardSuit1 === 'spades') {
            compareCardColor1 = "black";
        } if (compareCardSuit2 === 'hearts' || compareCardSuit2 === 'diamonds') {
            compareCardColor2 = "red";
        } if (compareCardSuit2 === 'clovers' || compareCardSuit2 === 'spades') {
            compareCardColor2 = "black";
        }

        if (secondDeckId === 'deckFinish1' || secondDeckId === 'deckFinish2' || secondDeckId === 'deckFinish3' || secondDeckId === 'deckFinish4') {
            if (compareCardValue1 - 1 === compareCardValue2 && compareCardSuit1 === compareCardSuit2 || compareCardValue1 === 1) {
                spliceCards(firstDeck, secondDeck, movingCardIndex);
            } else {
                alert("Начать стопку Дома можно только с Туза. Все карты в стопке должны быть только одной масти и в таком порядке Туз, 2,3,4,5,6,7,8,9,10, Валет, Дама, Король.");
            }

        } else if (compareCardValue1 === compareCardValue2 - 1 || secondDeckId === secondCardId) {
            if (compareCardColor1 !== compareCardColor2 || secondDeckId === secondCardId) {
                spliceCards(firstDeck, secondDeck, movingCardIndex);
            } else {
                alert("Неверный ход! На карту черной масти можно положить только карту с красной масти или наоборот и цвета должны чередоваться.");
            }
        } else {
            alert("Неверный ход! Положить карту на другую карту можно, только если эта карта следующая в последовательности. порядок следующий: Король, Дама, Валет, 10,9,8,7,6,5,4,3,2, Туз.");
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
	
	fillingArrayCards();
    cards.sort(mixRandom);
    fillingGameDecks();
	drawTable();
	addEvents();
})();













































