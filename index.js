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
addLetterCells();
const btnDice = document.getElementById('throw-dice');
const resultDice = document.getElementsByClassName('side-part__result')

let numberDiceRoll = 1;
btnDice.addEventListener('click', () => {
    btnDice.disabled = true;

    returnDefaultEventBlock()
    showNumberRoll();

    let intervalId;
    const duration = 1000;



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
    } else if ([2, 5, 8, 11, 13, 15, 18, 22, 25, 29, 34, 42, 48, 54, 60, 64, 68, 72, 77, 79].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_truth');
    } else if ([3, 14, 17, 20, 24, 31, 37, 39, 41, 45, 47, 51, 53, 56, 58, 63, 65, 70, 75, 78, 82, 84,].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_activity');
    } else if ([7, 15, 27, 35, 43, 52, 59, 67, 80].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_luck-throw');
    }
    else if ([10, 28, 32, 44, 49, 62, 69, 74, 83].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_teleport')
    } else if ([1, 4, 6, 9, 12, 16, 19, 21, 23, 26, 30, 33, 36, 38, 40, 46, 50, 55, 57, 61, 66, 71, 73, 76, 81, 85].includes(cellNumber)) {
        cell.classList.add('main-screen__cell_letter');
    }

}

// идентифицируем клетку, на которой остановилась фишка
function identifyTypeCell() {
    const chipPosition = document.querySelector('.main-screen__cell_chip-position');
    returnDefaultEventBlock();

    if (!chipPosition.classList.contains('main-screen__cell_luck-throw') || !chipPosition.classList.contains('main-screen__cell_teleport')) {
        btnDice.disabled = false;
    }

    if (chipPosition.classList.contains('main-screen__cell_truth')) {
        doVisibleEventContent();
        const numberTaskTruth = getRandomNumber(1, 40);
        showTitleEvent(numberTaskTruth);
        showTaskTruth(numberTaskTruth);
        // Модальное окно вызывается внутри showTaskTruth
    }

    if (chipPosition.classList.contains('main-screen__cell_activity')) {
        doVisibleEventContent();
        const numberTaskActivity = getRandomNumber(1, 40);
        showTitleEvent(numberTaskActivity);
        showTaskActivity(numberTaskActivity);
        // Модальное окно вызывается внутри showTaskActivity
    }

    if (chipPosition.classList.contains('main-screen__cell_luck-throw')) {
        doVisibleEventContent();
        showEventLuckThrow();
    }

    if (chipPosition.classList.contains('main-screen__cell_teleport')) {
        teleportPosition();
    }

    if (chipPosition.classList.contains('main-screen__cell_letter')) {
        doVisibleEventContent();
        showEventLetter();
        // Убедитесь, что здесь вызывается showEventLetter
    }
}


function doVisibleEventContent() {
    const contentEvent = document.querySelector('.side-part__text-event')
    contentEvent.classList.toggle('side-part__text-event_hidden')
}

function showEventTruth() {
    const numberTaskTruth = getRandomNumber(1, 40);
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
    // Показываем информацию в боковом блоке
    const contentOfTruth = document.querySelector('.side-part__text-event');
    contentOfTruth.textContent = truthList[numberTaskTruth];

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
    const numberTaskActivity = getRandomNumber(1, 40);
    showTitleEvent(numberTaskActivity);
    showTaskActivity(numberTaskActivity);
}

function showTaskActivity(numberTask) {
    // Показываем информацию в боковом блоке
    const contentOfActivity = document.querySelector('.side-part__text-event');
    contentOfActivity.textContent = activityList[numberTask];


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

function showEventLetter() {
    const chipPosition = document.querySelector('.main-screen__cell_chip-position');
    const cellNumber = parseInt(chipPosition.id.split('_')[1]);

    const letterData = letterCellMap[cellNumber];
    if (!letterData) return;

    const { letter, word, task } = letterData;

    // Показываем в боковом блоке
    const titleEvent = document.querySelector('.side-part__title-event');
    const contentEvent = document.querySelector('.side-part__text-event');

    titleEvent.textContent = `Буква ${letter} — ${word}`;
    titleEvent.style.color = '#8e44ad';

    contentEvent.textContent = task;


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



// Функция для отображения модального окна с заданием и картинкой
function showEventModal(taskType, taskNumber) {
    const truthImagesMap = {
        1: 'assets/truth1.jpg',
        2: 'assets/truth2.jpg',
        3: 'assets/truth3.jpg',
        // ...
    };

    const activityImagesMap = {
        1: 'assets/activity1.jpg',
        2: 'assets/activity2.jpg',
        3: 'assets/activity3.jpg',
        // ...
    };


    console.log(`Показываю модальное окно: ${taskType} #${taskNumber}`);
    // Удаляем предыдущее модальное окно, если оно существует
    let oldModal = document.querySelector('.event-modal');
    if (oldModal) {
        oldModal.remove();
    }

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.classList.add('event-modal');

    // Создаем контейнер для контента
    const modalContent = document.createElement('div');
    modalContent.classList.add('event-modal-content');

    // Добавляем крестик для закрытия
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    // Создаем заголовок в зависимости от типа задания
    const modalTitle = document.createElement('div');
    modalTitle.classList.add('event-modal-title');

    if (taskType === 'truth') {
        modalTitle.textContent = `Truthium n.${taskNumber}`;
        modalTitle.style.color = '#69d160';
    } else if (taskType === 'activity') {
        modalTitle.textContent = `Activitium n.${taskNumber}`;
        modalTitle.style.color = '#869bbe';
    }

    // Создаем контейнер для изображения (если есть)
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('event-modal-image-container');

    // Проверяем наличие изображения и добавляем его
    let hasImage = false;
    if (taskType === 'truth' && truthImagesMap[taskNumber]) {
        const img = document.createElement('img');
        img.src = truthImagesMap[taskNumber];
        img.classList.add('event-modal-image');
        imageContainer.appendChild(img);
        hasImage = true;
    } else if (taskType === 'activity' && activityImagesMap[taskNumber]) {
        const img = document.createElement('img');
        img.src = activityImagesMap[taskNumber];
        img.classList.add('event-modal-image');
        imageContainer.appendChild(img);
        hasImage = true;
    }

    // Создаем текст задания
    const taskText = document.createElement('div');
    taskText.classList.add('event-modal-text');
    if (taskType === 'truth') {
        taskText.textContent = truthList[taskNumber];
    } else if (taskType === 'activity') {
        taskText.textContent = activityList[taskNumber];
    }

    // Собираем всё в модальное окно
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    if (hasImage) {
        modalContent.appendChild(imageContainer);
    }
    modalContent.appendChild(taskText);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Показываем модальное окно
    modal.style.display = 'flex';
}

// Модифицируем функции показа заданий/вопросов
function showTaskTruth(numberTaskTruth) {
    // Показываем информацию в обычном блоке
    const contentOfTruth = document.querySelector('.side-part__text-event');
    contentOfTruth.textContent = truthList[numberTaskTruth];

}

function showTaskActivity(numberTask) {
    // Показываем информацию в обычном блоке
    const contentOfActivity = document.querySelector('.side-part__text-event');
    contentOfActivity.textContent = activityList[numberTask];


}

// Добавляем стили для модального окна
function addModalStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
    .event-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    
    .event-modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      width: 80%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .close-modal {
      position: absolute;
      top: 10px;
      right: 15px;
      color: #184591;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
    }
    
    .event-modal-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 15px;
      text-align: center;
      font-family: blacknort;
    }
    
    .event-modal-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    
    .event-modal-image {
      max-width: 100%;
      max-height: 300px;
      border-radius: 5px;
    }
    
    .event-modal-text {
      font-size: 18px;
      line-height: 1.5;
      text-align: center;
    }
  `;
    document.head.appendChild(styleSheet);
}

// Вызываем функцию добавления стилей при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    addModalStyles();
});

function addLetterCells() {
    Object.keys(letterCellMap).forEach(cellNumStr => {
        const cellId = `CellNumber_${cellNumStr}`;
        const cell = document.getElementById(cellId);
        if (cell) {
            const contentDiv = cell.querySelector('.cell-content');

            const letterSpan = document.createElement('span');
            letterSpan.textContent = letterCellMap[cellNumStr].letter;
            letterSpan.classList.add('letter-cell-label');

            contentDiv.appendChild(letterSpan);
        }
    });
}

function showEventLetterModal(letter, word, task) {
    // Удаление прошлого модального окна
    let oldModal = document.querySelector('.event-modal');
    if (oldModal) oldModal.remove();

    // Создание нового модального окна
    const modal = document.createElement('div');
    modal.classList.add('event-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('event-modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => modal.remove();

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('event-modal-title');
    modalTitle.textContent = `Буква "${letter}" — ${word}`;
    modalTitle.style.color = '#8e44ad';

    const taskText = document.createElement('div');
    taskText.classList.add('event-modal-text');
    taskText.textContent = task;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(taskText);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

