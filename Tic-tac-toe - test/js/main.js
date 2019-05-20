var $startGame = document.querySelector(".start-game");
var $cells = document.querySelectorAll(".cell");
var $label = document.getElementsByName('label');
var $name = document.getElementById("name");
var $spiner = document.getElementById("competitor");
var $field = document.getElementById("field");
var host = "https://ttt-practice.azurewebsites.net/";
var name;
var id;
var label = "X";

$startGame.addEventListener("click", checkReadyToStart);

function checkReadyToStart() {
    name = $name.value;
    $label.forEach(function (symbol) {
        if (symbol.checked) {
            label = symbol.value;
        }
    });

    if (!name && !label) {
        alert("Заполните все поля!")
    } else if (!name) {
        alert("Введите имя!")
    } else if (!label) {
        alert("Выберите метку!")
    }  else {
        requestToStart();
    }

    $cells.forEach(function (cell) {
        cell.innerHTML = "";
        cell.classList.add("pointer");
    });
};

function requestToStart() {
    setWaitState();

    fetch(host + "/start?name=" + name)
    .then(checkResponse)
    .then(chechJson)
    .then(checkToStep)
    .catch (handleError)
    .finally(removeWaitState);
};

$cells = [].slice.apply($cells);
$cells.forEach(function (cell) {
    cell.addEventListener("click", makeMove);
});

function makeMove() {
    var index = $cells.indexOf(this);

    requestToServer({move: index, id: id, name: name}, "/makeMove")
    .then(checkResponse)
    .then(checkReason)
    .then(function (json) {
        $cells[index].innerHTML = label;

        return json;
    })
    .then(checkWinner)
    .then(waitMove)
    .catch(handleError)
};

function waitMove() {
    requestToServer({id: id, name: name}, "/waitMove")
    .then(checkResponse)
    .then(showStepServer)
    .then(checkWinner)
    .catch(handleError)
    .finally(removeWaitState);
};

function requestToServer(data, api) {
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    setWaitState();

    return fetch(host + api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers
    });
};

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response.status);
    }
};

function chechJson(json) {
    if (!json.ok) {
        return Promise.reject(json);
    }
    id = json.data.id;

    return json;
};

function checkToStep(json) {
    if (json.data.canMove) {
        $field.classList.add("field");
    } else {
        alert("Can't Move - ожидайте хода противника.");
        waitMove({id: id, name: name});
    }
};

function checkReason(json) {
    if (json.reason) {
        if (json.reason === "Can't find session") {
            return Promise.reject("Начните новую ссесию! Для этого нажмите - 'НАЧАТЬ ИГРУ'");
        } else {
            return Promise.reject(json.reason);
        }
    } else {
        return Promise.resolve(json);
    }
};

function checkWinner(json) {
    switch (json.data.win) {
        case 0:
            enableReadyState();
            return Promise.reject("Вы проиграли! Хотите еще? Выберите метку и нажмите - 'Начать Игру'");
        case 1:
            enableReadyState();
            return Promise.reject("ВЫ ВЫИГРАЛИ! Хотите еще? Выберите метку и нажмите - 'Начать Игру'");
        case 2:
            enableReadyState();
            return Promise.reject("НИЧЬЯ");
    }
};

function handleError(mistake) {
    alert(mistake);
    removeWaitState();
};

function enableReadyState() {
    $spiner.classList.remove("rivel");
    $field.classList.remove("field");

    $cells.forEach(function (cell) {
        cell.classList.remove("pointer");
    });
};

function setWaitState() {
    $spiner.classList.add("rivel");
};

function removeWaitState() {
    $spiner.classList.remove("rivel");
};

function showStepServer(json) {
    if (label === "X") {
        $cells[json.data.move].innerHTML = "0";
    } else {
        $cells[json.data.move].innerHTML = "X";
    }

    return json;
};
