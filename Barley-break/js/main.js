var games = document.querySelectorAll(".game");
var barleyBreak = new Barleybreak(games[0]);
barleyBreak.addEvents();

function Barleybreak(game) {
	this.elements = game.querySelectorAll(".element");
	this.reset = game.querySelector(".reset");
	this.cover = game.querySelector(".cover");
	this.congratulation = game.querySelector(".congratulation");
	this.steps = game.querySelector(".steps");
	this.sumSteps = 0;

	this.addEvents = function () {
		for(var a = 0; a < this.elements.length; a++){
			(function (a) {
				this.elements[a].addEventListener("click", function (e) {
					this.neighborCheck(a);
					this.sumSteps++;
				}.bind(this));
			}.bind(this))(a);
		}

		window.addEventListener('load', function () {
			this.mixCells();
		}.bind(this));

		this.reset.addEventListener("click", function () {
			this.mixCells();
		}.bind(this));

		this.congratulation.addEventListener("click", function () {
			this.cover.classList.remove("active");
			this.congratulation.classList.remove("active");
		}.bind(this));
	};

	 this.mixCells = function() {
		this.sumSteps = 0;

		for(var a = 0; a < this.elements.length; a++){
			if(this.elements[a].innerText === ""){
				this.elements[a].classList.remove("empty");
			}
		}
		this.arrayCells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];

		function compareRandom(a, b) {
			return Math.random() - 0.5;
		}
		this.arrayCells.sort(compareRandom);

		for(var i = 0; i < this.arrayCells.length; i++){
			this.elements[i].innerText = this.arrayCells[i];
		}

		for(var q = 0; q < this.elements.length; q++){
			if(this.elements[q].innerText === ""){
				this.elements[q].classList.toggle("empty");
			}
		}
	};

	this.neighborCheck = function(index) {
		if(this.elements[index + 1] && this.elements[index + 1].innerText === ""){
			this.moveCell(index + 1, index);
		}else if(this.elements[index - 1] && this.elements[index - 1].innerText === ""){
			this.moveCell(index - 1, index);
		}else if(this.elements[index + 4] && this.elements[index + 4].innerText === ""){
			this.moveCell(index + 4, index);
		}else if(this.elements[index - 4] && this.elements[index - 4].innerText === ""){
			this.moveCell(index - 4, index);
		}
		this.checkSequence();
	};

	this.moveCell = function (neighboringIndex, currenIndex) {
		this.elements[neighboringIndex].classList.remove("empty");
		this.elements[neighboringIndex].innerText = this.elements[currenIndex].innerText;
		this.elements[currenIndex].innerText = "";
		this.elements[currenIndex].classList.add("empty");
	};

	this.checkSequence = function() {
		this.sequence = "123456789101112131415";
		this.currentArrayCells = "";

		for(var a = 0; a < this.elements.length; a++){
			this.currentArrayCells += this.elements[a].innerText;
		}
		if(this.currentArrayCells === this.sequence){
			this.cover.classList.add("active");
			this.congratulation.classList.add("active");
			this.steps.innerText = this.sumSteps;
		}
	};
}