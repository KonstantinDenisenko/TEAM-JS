(function () {
    var matricesField = [
        [
            {state: 0,pos: 0},
            {state: 2,pos: 1},
            {state: 0,pos: 2},
            {state: 0,pos: 3},
            {state: 1,pos: 4},
            {state: 1,pos: 5},
            {state: 1,pos: 6},
            {state: 0,pos: 7},
            {state: 1,pos: 8},
            {state: 1,pos: 9},
            {state: 0,pos: 10},
            {state: 0,pos: 11},
            {state: 0,pos: 12},
            {state: 0,pos: 13},
            {state: 0,pos: 14},
            {state: 0,pos: 15},
            {state: 0,pos: 16},
            {state: 1,pos: 17},
            {state: 1,pos: 18},
            {state: 0,pos: 19},
            {state: 1,pos: 20},
            {state: 0,pos: 21},
            {state: 0,pos: 22},
            {state: 3,pos: 23},
            {state: 0,pos: 24}
        ],
        [
            {state: 0,pos: 0},
            {state: 0,pos: 1},
            {state: 0,pos: 2},
            {state: 0,pos: 3},
            {state: 2,pos: 4},
            {state: 0,pos: 5},
            {state: 1,pos: 6},
            {state: 0,pos: 7},
            {state: 1,pos: 8},
            {state: 1,pos: 9},
            {state: 0,pos: 10},
            {state: 1,pos: 11},
            {state: 0,pos: 12},
            {state: 0,pos: 13},
            {state: 0,pos: 14},
            {state: 0,pos: 15},
            {state: 0,pos: 16},
            {state: 1,pos: 17},
            {state: 1,pos: 18},
            {state: 0,pos: 19},
            {state: 0,pos: 20},
            {state: 0,pos: 21},
            {state: 3,pos: 22},
            {state: 1,pos: 23},
            {state: 0,pos: 24}
        ],
        [
            {state: 2,pos: 0},
            {state: 0,pos: 1},
            {state: 1,pos: 2},
            {state: 0,pos: 3},
            {state: 3,pos: 4},
            {state: 0,pos: 5},
            {state: 1,pos: 6},
            {state: 1,pos: 7},
            {state: 0,pos: 8},
            {state: 0,pos: 9},
            {state: 0,pos: 10},
            {state: 0,pos: 11},
            {state: 0,pos: 12},
            {state: 0,pos: 13},
            {state: 1,pos: 14},
            {state: 0,pos: 15},
            {state: 1,pos: 16},
            {state: 1,pos: 17},
            {state: 0,pos: 18},
            {state: 0,pos: 19},
            {state: 0,pos: 20},
            {state: 0,pos: 21},
            {state: 1,pos: 22},
            {state: 0,pos: 23},
            {state: 0,pos: 24}
        ]
    ];

    var possibleWays = [
        {step: -1, correction: 1},
        {step: 1, correction: 0},
        {step: -5},
        {step: 5}
    ];

    var $shortWay = document.getElementById("short-way");
    var $changeField = document.getElementById("change-field");
    var CLASSES = ['cell', 'wall', 'start', 'finish'];
    var currentField = 0;
    var START = 2;
    var FINISH = 3;
    var paths;

    $shortWay.addEventListener("click", findShorterWay);
    $changeField.addEventListener("click", changeFild);

    function drawField(){
        var $container = document.getElementById('maze');
        paths = [];
        $container.innerHTML = "";

        for(var i = 0; i < matricesField[currentField].length; i++) {
            var $cellEl = document.createElement('div');

            $cellEl.classList.add(CLASSES[0], CLASSES[matricesField[currentField][i].state]);
            $container.appendChild($cellEl);
        }
    };

    function checkWay(startingPoint, pathArray, wayDirection){
        var directionSteps = copyArray(pathArray);

        if ( haveFreeStep(matricesField[currentField][startingPoint.pos + wayDirection.step], pathArray, wayDirection.correction) ) {
            if ( matricesField[currentField][startingPoint.pos + wayDirection.step].state === FINISH ) {
                directionSteps.push(matricesField[currentField][startingPoint.pos + wayDirection.step]);
                paths.push(directionSteps);
            } else {
                searchWay(matricesField[currentField][startingPoint.pos + wayDirection.step], directionSteps);
            }
        }
    };

    function searchWay(startingPoint, pathArray){
        pathArray.push(startingPoint);
        for (var i = 0; i < possibleWays.length; i++) {
            checkWay(startingPoint, pathArray, possibleWays[i]);
        }
    };

    function copyArray(pathArray){
        var newArray = [];
        pathArray.forEach(function(arrayEl) {
            newArray.push(arrayEl);
        });

        return newArray;
    };

    function haveFreeStep(el, movedSteps, correction){
        if (!el || el.state === 1) {
            return false;
        }

        if (correction !== undefined && (el.pos + correction) % 5 === 0) {
            return false;
        }

        return movedSteps.every(function(currentStep){
            return currentStep.pos !== el.pos;
        });
    };

    function findShorterWay() {
        var wayArray = sortAllVariants();
        var cells = document.querySelectorAll('.cell');
        wayArray.forEach(function(arrayEl) {
            cells[arrayEl.pos].classList.add('right-way');
        });
    };

    function sortAllVariants(){
        paths.sort(function(a, b){
            if (a.length < b.length) {
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }

            return 0;
        });

        return paths[0];
    };

    function changeFild() {
        currentField++;
        if (currentField > 2) {
            currentField = 0;
        }
        drawField();
        searchWay(findStartingPoint(), []);
    };

    function findStartingPoint() {
        for (var a = 0; a < matricesField[currentField].length; a++) {
            if (matricesField[currentField][a].state === START) {
                return matricesField[currentField][a];
            }
        }
    };

    drawField();
    searchWay(findStartingPoint(), []);
})();
