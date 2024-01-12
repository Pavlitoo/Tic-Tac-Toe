// Выбираем все элементы с классом "box" и сохраняем их в переменной "boxes"
let boxes = document.querySelectorAll(".box");

// Инициализация игровых переменных
let turn = "X"; // Текущий игрок (начинает с "X")
let isGameOver = false; // Флаг окончания игры

// Проходим по каждому элементу "box"
boxes.forEach(e => {
    // Устанавливаем innerHTML каждого элемента в пустую строку
    e.innerHTML = "";

    // Добавляем слушатель события клика к каждому элементу "box"
    e.addEventListener("click", () => {
        // Проверяем, что игра не закончена и ячейка пуста
        if (!isGameOver && e.innerHTML === "") {
            // Устанавливаем innerHTML кликнутой ячейки в символ текущего игрока
            e.innerHTML = turn;

            // Проверяем на победу или ничью, затем меняем ход
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });
});

// Функция смены хода текущего игрока и обновления индикатора хода
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Функция проверки на победу
function cheakWin() {
    // Условия победы в виде массива массивов
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Перебор всех условий победы
    for (let i = 0; i < winConditions.length; i++) {
        // Получение значений трех ячеек по текущему условию
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Проверка на равенство и не пустоту, если true - игра заканчивается
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline";

            // Подсветка ячеек, приводивших к победе
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#196cb9";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

// Функция проверки на ничью
function cheakDraw() {
    // Если игра не закончена, проверяем наличие пустых ячеек
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        // Если все ячейки заняты, объявляем ничью и заканчиваем игру
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Добавление слушателя события клика к кнопке "Play Again"
document.querySelector("#play-again").addEventListener("click", () => {
    // Сброс флага окончания игры, смена хода на "X", сброс стилей и текста
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Сброс innerHTML и стилей каждой ячейки
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
