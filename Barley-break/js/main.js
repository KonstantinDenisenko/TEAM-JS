var game = document.getElementById("game");
var barleyBreak = new Barleybreak(game);
barleyBreak.addEvents();

function Barleybreak(game) {
	var elements = game.querySelectorAll(".element");
	var reset = game.querySelector(".reset");
	var cover = game.querySelector(".cover");
	var congratulation = game.querySelector(".congratulation");
	var steps = game.querySelector(".steps");
	var sumSteps = 0;

	this.addEvents = function () {
		for(var a = 0; a < elements.length; a++){
			(function (a) {
				elements[a].addEventListener("click", function () {
					this.neighborCheck(a);
					sumSteps++;
				}.bind(this));
			}.bind(this))(a);
		}

		window.addEventListener('load', function () {
			this.mixCells();
		}.bind(this));

		reset.addEventListener("click", function () {
			this.mixCells();
		}.bind(this));

		congratulation.addEventListener("click", function () {
			cover.classList.remove("active");
			congratulation.classList.remove("active");
		}.bind(this));
	};

	 this.mixCells = function() {
		sumSteps = 0;

		for(var a = 0; a < elements.length; a++){
			if(elements[a].innerText === ""){
				elements[a].classList.remove("empty");
			}
		}
		this.arrayCells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];

		this.arrayCells.sort(this.compareRandom);

		for(var i = 0; i < this.arrayCells.length; i++){
			elements[i].innerText = this.arrayCells[i];
		}

		for(var q = 0; q < elements.length; q++){
			if(elements[q].innerText === ""){
				elements[q].classList.add("empty");
			}
		}
	};

    this.compareRandom = function() {
        return Math.random() - 0.5;
    };

	this.neighborCheck = function(index) {
		if(elements[index + 1] && elements[index + 1].innerText === ""){
			this.moveCell(index + 1, index);
		}else if(elements[index - 1] && elements[index - 1].innerText === ""){
			this.moveCell(index - 1, index);
		}else if(elements[index + 4] && elements[index + 4].innerText === ""){
			this.moveCell(index + 4, index);
		}else if(elements[index - 4] && elements[index - 4].innerText === ""){
			this.moveCell(index - 4, index);
		}
		this.checkSequence();
	};

	this.moveCell = function (neighboringIndex, currenIndex) {
		elements[neighboringIndex].classList.remove("empty");
		elements[neighboringIndex].innerText = elements[currenIndex].innerText;
		elements[currenIndex].innerText = "";
		elements[currenIndex].classList.add("empty");
	};

	this.checkSequence = function() {
		this.winSequence = "123456789101112131415";
		this.winSequenceToo = "159132610143711154812";
		this.currentArrayCells = "";

		for(var a = 0; a < elements.length; a++){
			this.currentArrayCells += elements[a].innerText;
		}
		if(this.currentArrayCells === this.winSequence || this.currentArrayCells === this.winSequenceToo){
			cover.classList.add("active");
			congratulation.classList.add("active");
			steps.innerText = sumSteps;
		}
	};
}