var barleyBreak = new Barleybreak(document.getElementById("game"));
barleyBreak.addEvents();

function Barleybreak(game) {
	var elements = game.querySelectorAll(".element");
	var reset = game.querySelector(".reset");
	var cover = game.querySelector(".cover");
	var congratulation = game.querySelector(".congratulation");
	var steps = game.querySelector(".steps");
	var sumSteps = 0;
    var neighborCheck = function(index) {
        if(this.verification(index + 1)){
            this.moveCell(index + 1, index);
        }else if(this.verification(index - 1)){
            this.moveCell(index - 1, index);
        }else if(this.verification(index + 4)){
            this.moveCell(index + 4, index);
        }else if(this.verification(index - 4)){
            this.moveCell(index - 4, index);
        }
        this.checkSequence();
    }.bind(this);
    var compareRandom = function() {
        return Math.random() - 0.5;
    };

	this.addEvents = function() {
		for(var a = 0; a < elements.length; a++){
			(function (a) {
				elements[a].addEventListener("click", function() {
					neighborCheck(a);
					sumSteps++;
				});
			})(a);
		}

		window.addEventListener('load', function() {
			this.mixCells();
		}.bind(this));

		reset.addEventListener("click", function() {
			this.mixCells();
		}.bind(this));

		congratulation.addEventListener("click", function() {
			cover.classList.remove("active");
			congratulation.classList.remove("active");
		});
	};

	 this.mixCells = function() {
		sumSteps = 0;
		var a;

		this.arrayCells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];

		this.arrayCells.sort(compareRandom);

		for(a = 0; a < this.arrayCells.length; a++){
			elements[a].innerText = this.arrayCells[a];
		}

		for(a = 0; a < elements.length; a++){
            elements[a].classList.remove("empty");
			if(elements[a].innerText === ""){
				elements[a].classList.add("empty");
			}
		}
	};

	this.verification = function(index) {
      return elements[index] && elements[index].innerText === "";
    };

	this.moveCell = function(neighboringIndex, currenIndex) {
		elements[neighboringIndex].classList.remove("empty");
		elements[neighboringIndex].innerText = elements[currenIndex].innerText;
		elements[currenIndex].innerText = "";
		elements[currenIndex].classList.add("empty");
	};

	this.checkSequence = function() {
		this.winSequences = [123456789101112131415, 159132610143711154812];
		this.currentArrayCells = "";

		for(var a = 0; a < elements.length; a++){
			this.currentArrayCells += elements[a].innerText;
		}
		if(this.winSequences.indexOf(+this.currentArrayCells) !== -1){
			cover.classList.add("active");
			congratulation.classList.add("active");
			steps.innerText = sumSteps;
		}
	};
}