(function () {
    var $startGame = document.querySelector(".start-game");
    var $cells = document.querySelectorAll(".cell");
    var $label = document.querySelectorAll(".label");
    var $name = document.getElementById("name");
    var $spiner = document.getElementById("competitor");
    var $field = document.getElementById("field");
    var host = "https://ttt-practice.azurewebsites.net/";
    var name;
    var id;
    var label;
    var headers = new Headers();

    headers.append("Content-type", "application/json");

    $label.forEach(function (value) {
        (function (value) {
            value.addEventListener("click", choiceLabel);
        })(value);
    });

    function choiceLabel(currentLabel) {
        $label.forEach(function (value) {
            value.classList.remove("active");
        });
        currentLabel.target.classList.add("active");
        label = currentLabel.target.dataset.label;
    }

    $startGame.addEventListener("click", function () {
        startNewGame();
        checkReadyToStart();
    });

    function startNewGame() {
        $cells.forEach(function (value) {
            value.innerHTML = "";
        });
    };

    function checkReadyToStart() {
        name = $name.value;
        if (!name && !label) {
            alert("Заполните все поля!")
        } else if (!name) {
            alert("Введите имя!")
        } else if (!label) {
            alert("Выберите метку!")
        }  else {
            requestToStart();
        }
    };
    
    function requestToStart() {
        fetch(host + "/start" + "?name=" + name)
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                if (!json.ok) {
                    return;
                }
                id = json.data.id;

                if (json.data.canMove) {
                    selectCell();
                } else {
                    alert("Can't Move - нет разрешения для старта");
                }
            })
            .catch (function (error) {
                alert(error);
            });
    };

    function selectCell() {
        $field.classList.add("field");
        $cells.forEach(function (value) {
            (function (value) {
                value.addEventListener("click", requestOnMakeMove);
            })(value);
        });
    };

    function requestOnMakeMove(currentCell) {
        fetch(host + "/makeMove", {
            method: "POST",
            body: JSON.stringify({move: currentCell.target.id, id: id, name: name}),
            headers: headers
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return new Promise(function(resolve, reject) {
                if (json.reason) {
                    if (json.reason === "Can't find session") {
                        reject("Начните новую ссесию! Для этого нажмите - 'НАЧАТЬ ИГРУ'");
                    } else {
                        reject(json.reason);
                    }
                } else {
                    resolve(json);
                }
            });
        })
        .then(function (json) {
            currentCell.target.innerHTML = label;
            $spiner.classList.add("rivel");
            checkWinner(json);
            return json;
        })
        .then(function (json) {
            if (!json.data.win) {
                requestOnWaitMove(currentCell);
            }
        })
        .catch(function (error) {
            alert(error);
        });
    };

    function requestOnWaitMove(currentCell) {
        fetch(host + "/waitMove", {
            method: "POST",
            body: JSON.stringify({move: currentCell.target.id, id: id, name: name}),
            headers: headers
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            showStepServer(json.data.move);
            checkWinner(json);
        })
        .catch(function (error) {
            alert(error);
        });
    };

    function showStepServer(step) {
        if (label === "X") {
            document.getElementById(step).innerHTML = "0";
        } else {
            document.getElementById(step).innerHTML = "X";
        }
        $spiner.classList.remove("rivel");
    };

    function checkWinner(json) {
        switch (json.data.win) {
            case 0:
                alert("Вы проиграли! Хотите еще? Выберите метку и нажмите - 'Начать Игру'");
                enableReadyState();
                break;
            case 1:
                alert("ВЫ ВЫИГРАЛИ! Хотите еще? Выберите метку и нажмите - 'Начать Игру'");
                enableReadyState();
                break;
            case 2:
                alert("НИЧЬЯ");
                enableReadyState();
                break;
        }
    };

    function enableReadyState() {
        $spiner.classList.remove("rivel");
        $field.classList.remove("field");
    };
})();