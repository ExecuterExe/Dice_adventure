'use strict'
const mainScreen = document.querySelector('.main-screen')

// Цикл создания динамической сетки грид 11 на 14
for (let i = 0; i < 165; i++) {
    const cell = document.createElement('div');
    cell.classList.add('main-screen__cell', 'main-screen__cell_hidden');

    // Создаем div для нумерации
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('cell-number');
    cell.appendChild(numberDiv);

    // Создаем div для контента
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('cell-content');
    cell.appendChild(contentDiv);

    mainScreen.appendChild(cell);
}

// Построение верной последовательности
// + указание начальной и конечной клетки
// Построение верной последовательности
let cellNumber = 0;
path.forEach(({ row, col }) => {
    const cellIndex = row * 15 + col;
    const cell = mainScreen.children[cellIndex];
    cell.classList.remove('main-screen__cell_hidden');
    cell.style.gridRow = row + 1;
    cell.style.gridColumn = col + 1;

    cell.id = `CellNumber_${cellNumber}`;

    // Устанавливаем номер клетки
    const numberDiv = cell.querySelector('.cell-number');
    numberDiv.textContent = cellNumber;

    // Присваиваем определенным клеткам особое значение
    setCellClasses(cell, cellNumber)

    cellNumber++;
});

addImageCells()

const btnDice = document.getElementById('throw-dice');
const resultDice = document.getElementsByClassName('side-part__result')

let numberDiceRoll = 1;
btnDice.addEventListener('click', () => {
    btnDice.disabled = true;

    returnDefaultEventBlock()
    showNumberRoll();

    let intervalId;
    const duration = 3000;



    intervalId = setInterval(() => { showDiceProcess(6) }, 200);


    setTimeout(() => {
        clearInterval(intervalId);

        const finalResult = getRandomNumber(1, 6);
        // Показывает результат финального броска на кубике
        showFinalDiceRoll(finalResult)

        // Находим текущую позицию фишки
        changePosition(finalResult)

        identifyTypeCell()

        numberDiceRoll = ++numberDiceRoll
    }, duration);
});

function showDiceProcess(maxNumberDice) {
    const randomValue = getRandomNumber(1, maxNumberDice);

    for (let i = 1; i <= 6; i++) {
        const diceResult = document.getElementById(`dice_r_${i}`);
        diceResult.classList.add('side-part__result_hidden');
    }

    const diceResultShow = document.getElementById(`dice_r_${randomValue}`);
    diceResultShow.classList.remove('side-part__result_hidden');
};

function getRandomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function showFinalDiceRoll(finalResult) {
    for (let i = 1; i <= 6; i++) {
        const diceResult = document.getElementById(`dice_r_${i}`);
        diceResult.classList.add('side-part__result_hidden');
    }
    const diceResultShow = document.getElementById(`dice_r_${finalResult}`);
    diceResultShow.classList.remove('side-part__result_hidden');
}

function showNumberRoll() {
    const showNumberRoll = document.getElementById('side-part__number-roll');
    showNumberRoll.textContent = `n.${numberDiceRoll}`;
}

function changePosition(finalResult) {
    const currentChipPosition = document.querySelector('.main-screen__cell_chip-position');
    const currentChipPositionId = currentChipPosition.id;
    const currentChipPositionNumber = parseInt(currentChipPositionId.split('_')[1]);

    // Вычисляем новую позицию фишки
    let newChipPositionNumber = currentChipPositionNumber + finalResult;

    // Ограничиваем позицию фишки, чтобы она не выходила за границы
    if (newChipPositionNumber < 1) { // Если позиция меньше 1, устанавливаем на 1
        newChipPositionNumber = 0;
    } else if (newChipPositionNumber > 86) { // Если позиция больше 86, устанавливаем на 86
        newChipPositionNumber = 86;
    }

    const newChipPosition = document.getElementById(`CellNumber_${newChipPositionNumber}`);

    // Удаляем класс с текущей позиции
    currentChipPosition.classList.remove('main-screen__cell_chip-position');
    newChipPosition.classList.add('main-screen__cell_chip-position');
}


// присвоение отдельным клеткам особое значение
function setCellClasses(cell, cellNumber) {
    if (cellNumber === 0) {
        cell.classList.add('main-screen__cell_start', 'main-screen__cell_chip-position');
    } else if (cellNumber === 86) {
        cell.classList.add('main-screen__cell_finish');
    } else if ([2, 4, 6, 9, 11, 16, 19, 21, 23, 25, 29, 34, 38, 42, 48, 54, 60, 64, 68, 72, 77, 79, 85].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_truth');
    } else if ([1, 3, 12, 14, 17, 20, 24, 31, 37, 39, 41, 45, 47, 51, 53, 56, 58, 63, 65, 70, 75, 78, 82, 84,].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_activity');
    } else if ([7, 15, 27, 35, 43, 52, 59, 67, 80].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_luck-throw');
    }
    else if ([10, 28, 32, 44, 49, 62, 69, 74, 83].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_teleport')
    }
}

// идентифицируем клетку, на которой остановилась фишка
function identifyTypeCell() {
    const chipPosition = document.querySelector('.main-screen__cell_chip-position')

    returnDefaultEventBlock()

    if (!chipPosition.classList.contains('main-screen__cell_luck-throw') || !chipPosition.classList.contains('main-screen__cell_teleport')) {
        btnDice.disabled = false;
    }

    if (chipPosition.classList.contains('main-screen__cell_truth')) {
        doVisibleEventContent()
        showEventTruth()
    }

    if (chipPosition.classList.contains('main-screen__cell_activity')) {
        doVisibleEventContent()
        showEventActivity()
    }

    if (chipPosition.classList.contains('main-screen__cell_luck-throw')) {
        doVisibleEventContent()
        showEventLuckThrow()
    }
    if (chipPosition.classList.contains('main-screen__cell_teleport')) {
        teleportPosition()
    }
}

function doVisibleEventContent() {
    const contentEvent = document.querySelector('.side-part__text-event')
    contentEvent.classList.toggle('side-part__text-event_hidden')
}

function showEventTruth() {
    const numberTaskTruth = getRandomNumber(1, 50);
    showTitleEvent(numberTaskTruth);
    showTaskTruth(numberTaskTruth);
}

function showTitleEvent(numberTask) {
    const chipPosition = document.querySelector('.main-screen__cell_chip-position')
    const titleEvent = document.querySelector('.side-part__title-event')
    if (chipPosition.classList.contains('main-screen__cell_truth')) {
        titleEvent.textContent = `Truthium n.${numberTask}`
        titleEvent.style.color = '#69d160';
    }
    if (chipPosition.classList.contains('main-screen__cell_activity')) {
        titleEvent.textContent = `Activitium n.${numberTask}`
        titleEvent.style.color = '#869bbe';
    }
    if (chipPosition.classList.contains('main-screen__cell_luck-throw')) {
        titleEvent.textContent = `luck-throw`
        titleEvent.style.color = '#d95752';
    }
}

function showTaskTruth(numberTaskTruth) {
    const contentOfTruth = document.querySelector('.side-part__text-event')
    contentOfTruth.textContent = truthList[numberTaskTruth]
}

function returnDefaultEventBlock() {
    const titleEvent = document.querySelector('.side-part__title-event');
    titleEvent.style.color = '#184591';
    titleEvent.textContent = 'Event';

    const contentEvent = document.querySelector('.side-part__text-event');
    contentEvent == '';
    if (!contentEvent.classList.contains('side-part__text-event_hidden')) {
        contentEvent.classList.add('side-part__text-event_hidden')
    }
}

function showEventActivity() {
    const numberTaskActivity = getRandomNumber(1, 50);
    showTitleEvent(numberTaskActivity);
    showTaskActivity(numberTaskActivity);
}

function showTaskActivity(numberTask) {
    const contentOfActivity = document.querySelector('.side-part__text-event')
    contentOfActivity.textContent = activityList[numberTask]
}

function showEventLuckThrow() {
    btnDice.disabled = true;

    showTitleEvent();
    const contentEvent = document.querySelector('.side-part__text-event');
    contentEvent.textContent = '';

    // Вызываем defineChip и ждем его завершения
    defineChip().then(() => {
        changeLittlePosition()
    });
}

let correctDirection;
const directions = {
    1: "Вы идете вперед",
    2: "Вы идете назад",
};

function defineChip() {
    const titleEvent = document.querySelector('.side-part__title-event');

    return showMiniDiceRoll(2).then(() => {
        correctDirection = finalMiniRoll;
        console.log(correctDirection)
        if (correctDirection == 1) {
            titleEvent.textContent = directions[1];
            titleEvent.style.color = '#074d05';
        } else if (correctDirection == 2) {
            titleEvent.textContent = directions[2];
            titleEvent.style.color = '#8c1216';
        }
    });
}



function showMiniDiceRoll(maxDice) {
    return new Promise((resolve) => {
        let intervalDirection;
        intervalDirection = setInterval(() => {
            showDiceProcess(maxDice);
        }, 200);

        setTimeout(() => {
            clearInterval(intervalDirection);
            finalMiniRoll = getRandomNumber(1, maxDice);
            showFinalDiceRoll(finalMiniRoll);
            resolve(); // Разрешаем промис
        }, 3000);
    });
}

let finalMiniRoll = 0;

function changeLittlePosition() {
    return showMiniDiceRoll(3).then(() => {
        if (correctDirection == 1) {
            console.log(correctDirection)
            console.log(finalMiniRoll)
            changePosition(finalMiniRoll)
            identifyTypeCell()
        } if (correctDirection == 2) {
            console.log(correctDirection)
            console.log(finalMiniRoll)
            changePosition(-(finalMiniRoll))
            identifyTypeCell()
        }
    });
}


function teleportPosition() {
    const currentChipPosition = document.querySelector('.main-screen__cell_chip-position');
    const currentChipPositionId = currentChipPosition.id;
    const currentChipPositionNumber = parseInt(currentChipPositionId.split('_')[1]);

    let newChipPositionNumber;
    switch (currentChipPositionNumber) {
        case 10:
            newChipPositionNumber = 2;
            break;
        case 28:
            newChipPositionNumber = 16;
            break;
        case 32:
            newChipPositionNumber = 26;
            break;
        case 44:
            newChipPositionNumber = 34;
            break;
        case 49:
            newChipPositionNumber = 25;
            break;
        case 62:
            newChipPositionNumber = 56;
            break;
        case 69:
            newChipPositionNumber = 61;
            break;
        case 74:
            newChipPositionNumber = 66;
            break;
        case 83:
            newChipPositionNumber = 71;
            break;
        default:
            newChipPositionNumber = currentChipPositionNumber;
            break;
    }

    const newChipPosition = document.getElementById(`CellNumber_${newChipPositionNumber}`);

    currentChipPosition.classList.remove('main-screen__cell_chip-position');
    newChipPosition.classList.add('main-screen__cell_chip-position');

    identifyTypeCell()
}

function addImageToCell(cellId, imgSrc, altText) {
    const cell = document.getElementById(cellId);
    if (cell) {
        const contentDiv = cell.querySelector('.cell-content');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = altText;
        contentDiv.appendChild(img);
    }
}

function addImageCells() {
    const miniDiceCells = document.querySelectorAll('.main-screen__cell_luck-throw');
    miniDiceCells.forEach(cell => {
        const contentDiv = cell.querySelector('.cell-content');
        const img = document.createElement('img');
        img.src = 'assets/minidice.png';
        contentDiv.appendChild(img);
    });
}


addImageToCell('CellNumber_10', 'assets/arrow_down.png', 'arrow_down');
addImageToCell('CellNumber_28', 'assets/arrow_left.png', 'arrow_left');
addImageToCell('CellNumber_32', 'assets/arrow_up.png', 'arrow_up');
addImageToCell('CellNumber_44', 'assets/arrow_left.png', 'arrow_left');
addImageToCell('CellNumber_49', 'assets/arrow_left.png', 'arrow_left');
addImageToCell('CellNumber_62', 'assets/arrow_up.png', 'arrow_up');
addImageToCell('CellNumber_69', 'assets/arrow_up.png', 'arrow_up');
addImageToCell('CellNumber_74', 'assets/arrow_up.png', 'arrow_up');
addImageToCell('CellNumber_83', 'assets/arrow_up.png', 'arrow_up');


