(function () {
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
			if(verification(index + 1)){
				moveCell(index + 1, index);
			}else if(verification(index - 1)){
				moveCell(index - 1, index);
			}else if(verification(index + 4)){
				moveCell(index + 4, index);
			}else if(verification(index - 4)){
				moveCell(index - 4, index);
			}
			checkSequence();
		};
	
		var verification = function(index) {
			return elements[index] && elements[index].innerText === "";
		};
	
		var moveCell = function(neighboringIndex, currenIndex) {
			elements[neighboringIndex].classList.remove("empty");
			elements[neighboringIndex].innerText = elements[currenIndex].innerText;
			elements[currenIndex].innerText = "";
			elements[currenIndex].classList.add("empty");
		};
	
		var checkSequence = function() {
			var winSequences = ["123456789101112131415", "159132610143711154812"];
			var currentArrayCells = "";
	
			for(var a = 0; a < elements.length; a++){
				currentArrayCells += elements[a].innerText;
			}
			if(winSequences.indexOf(currentArrayCells) !== -1){
				showSuccess();
			}
		};
	
		var showSuccess = function () {
			cover.classList.add("active");
			congratulation.classList.add("active");
			steps.innerText = sumSteps;
		};
	
		var mixCells = function() {
			sumSteps = 0;
			var a;
			var arrayCells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];
	
			arrayCells.sort(compareRandom);
	
			for(a = 0; a < arrayCells.length; a++){
				elements[a].innerText = arrayCells[a];
			}
	
			for(a = 0; a < elements.length; a++){
				elements[a].classList.remove("empty");
				if(elements[a].innerText === ""){
					elements[a].classList.add("empty");
				}
			}
		};
	
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
				mixCells();
			});
	
			reset.addEventListener("click", function() {
				mixCells();
			});
	
			congratulation.addEventListener("click", function() {
				cover.classList.remove("active");
				congratulation.classList.remove("active");
			});
		};
	}
})();