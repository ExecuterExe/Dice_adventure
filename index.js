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
    const contentOfTruth = document.querySelector('.side-part__text-event');
    const text = truthList[numberTaskTruth];
    contentOfTruth.textContent = text.split('\n')[0];

    showQuestionModal('truth', numberTaskTruth);
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

    // Показываем модальное окно
    showQuestionModal('activity', numberTask);
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

    // Показываем модальное окно
    showQuestionModal('letter', cellNumber);
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
    let oldModal = document.querySelector('.event-modal');
    if (oldModal) {
        oldModal.remove();
    }

    const modal = document.createElement('div');
    modal.classList.add('event-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('event-modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('event-modal-title');

    if (taskType === 'truth') {
        modalTitle.textContent = `Truthium n.${taskNumber}`;
        modalTitle.style.color = '#69d160';
    } else if (taskType === 'activity') {
        modalTitle.textContent = `Activitium n.${taskNumber}`;
        modalTitle.style.color = '#869bbe';
    }

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('event-modal-image-container');

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

    const taskText = document.createElement('div');
    taskText.classList.add('event-modal-text');
    if (taskType === 'truth') {
        taskText.textContent = truthList[taskNumber];
    } else if (taskType === 'activity') {
        taskText.textContent = activityList[taskNumber];
    }

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    if (hasImage) {
        modalContent.appendChild(imageContainer);
    }
    modalContent.appendChild(taskText);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = 'flex';
}




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
    let oldModal = document.querySelector('.event-modal');
    if (oldModal) oldModal.remove();

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

function showQuestionModal(taskType, taskNumber) {
    let oldModal = document.querySelector('.event-modal');
    if (oldModal) oldModal.remove();

    let taskText = '';
    let titleText = '';
    let titleColor = '';
    let modalClass = '';
    let icon = '';

    if (taskType === 'truth') {
        taskText = truthList[taskNumber];
        titleText = `🧠 Truthium #${taskNumber}`;
        titleColor = '#2e7d32';
        modalClass = 'truth-modal';
        icon = '❓';
    } else if (taskType === 'activity') {
        taskText = activityList[taskNumber];
        titleText = `🎭 Activitium #${taskNumber}`;
        titleColor = '#f57c00';
        modalClass = 'activity-modal';
        icon = '🎬';
    } else if (taskType === 'letter') {
        const letterData = letterCellMap[taskNumber];
        if (letterData) {
            taskText = letterData.task;
            titleText = `📚 Буква "${letterData.letter}" — ${letterData.word}`;
            titleColor = '#7b1fa2';
            modalClass = 'letter-modal';
            icon = '💡';
        }
    }

    const modal = document.createElement('div');
    modal.classList.add('event-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('event-modal-content', modalClass);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => modal.remove();

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('event-modal-icon');
    iconDiv.textContent = icon;

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('event-modal-title');
    modalTitle.textContent = titleText;
    modalTitle.style.color = titleColor;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('event-modal-task');

    if (taskType === 'truth' && taskText && taskText.includes('\n')) {
        const lines = taskText.split('\n');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('event-modal-question');
        questionDiv.textContent = lines[0];
        taskContainer.appendChild(questionDiv);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('event-modal-options');

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('event-modal-option');
                optionDiv.textContent = lines[i];
                optionsContainer.appendChild(optionDiv);
            }
        }
        taskContainer.appendChild(optionsContainer);
    } else {

        const textDiv = document.createElement('div');
        textDiv.classList.add('event-modal-text');
        textDiv.textContent = taskText || 'Задание не найдено';
        taskContainer.appendChild(textDiv);
    }


    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('event-modal-confirm');
    confirmBtn.textContent = '✓ Понятно';
    confirmBtn.onclick = () => modal.remove();

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(iconDiv);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(taskContainer);
    modalContent.appendChild(confirmBtn);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.style.display = 'flex';
}
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
        background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(24,69,145,0.9) 100%);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(8px);
    }
    
    .event-modal-content {
        background: linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%);
        padding: 50px 60px;
        border-radius: 30px;
        width: 85%;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(255,255,255,0.3),
            inset 0 1px 0 rgba(255,255,255,0.8);
        animation: modalAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    /* Крестик закрытия */
    .close-modal {
        position: absolute;
        top: 20px;
        right: 25px;
        color: #184591;
        font-size: 50px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(24, 69, 145, 0.1);
    }
    
    .close-modal:hover {
        color: #ffffff;
        background: #ff4444;
        transform: rotate(90deg);
    }
    
    /* Заголовок */
    .event-modal-title {
        font-size: 42px;
        font-weight: 800;
        margin-bottom: 35px;
        text-align: center;
        font-family: blacknort, Arial, sans-serif;
        padding: 15px 70px 15px 15px;
        border-radius: 15px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        letter-spacing: 1px;
    }
    
    /* Контейнер задания */
    .event-modal-task {
        margin-bottom: 30px;
    }
    
    /* Текст вопроса */
    .event-modal-question {
        font-size: 32px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 35px;
        color: #1a1a2e;
        font-weight: 600;
        padding: 25px;
        background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
        border-radius: 20px;
        border-left: 6px solid #184591;
    }
    
    /* Контейнер вариантов ответов */
    .event-modal-options {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }
    
    /* Вариант ответа */
    .event-modal-option {
        background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
        padding: 25px 35px;
        border-radius: 18px;
        font-size: 28px;
        font-weight: 500;
        color: #184591;
        border: 3px solid #c5d5f5;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    
    .event-modal-option:hover {
        background: linear-gradient(135deg, #184591 0%, #2a5298 100%);
        border-color: #184591;
        color: #ffffff;
        transform: translateX(15px) scale(1.02);
        box-shadow: 0 8px 25px rgba(24, 69, 145, 0.4);
    }
    
    /* Текст для activity и letter */
    .event-modal-text {
        font-size: 30px;
        line-height: 1.7;
        text-align: center;
        color: #1a1a2e;
        padding: 30px;
        background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
        border-radius: 20px;
        border: 3px dashed #ffc107;
        font-weight: 500;
    }
    
    /* Кнопка подтверждения */
    .event-modal-confirm {
        display: block;
        width: 320px;
        margin: 40px auto 0;
        padding: 22px 50px;
        background: linear-gradient(135deg, #69d160 0%, #4CAF50 50%, #45a049 100%);
        border: none;
        border-radius: 60px;
        font-size: 28px;
        font-weight: 800;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 
            0 8px 25px rgba(105, 209, 96, 0.5),
            inset 0 2px 0 rgba(255,255,255,0.3);
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    .event-modal-confirm:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 
            0 15px 35px rgba(105, 209, 96, 0.6),
            inset 0 2px 0 rgba(255,255,255,0.3);
    }
    
    .event-modal-confirm:active {
        transform: translateY(-2px) scale(1.02);
    }

    /* Стили для разных типов заданий */
    .event-modal-content.truth-modal {
        border-top: 8px solid #69d160;
    }
    
    .event-modal-content.activity-modal {
        border-top: 8px solid #ffc107;
    }
    
    .event-modal-content.letter-modal {
        border-top: 8px solid #8e44ad;
    }

    /* Иконки для типов */
    .event-modal-icon {
        font-size: 60px;
        text-align: center;
        margin-bottom: 20px;
    }

    /* Адаптивность для больших экранов */
    @media (min-width: 1400px) {
        .event-modal-content {
            max-width: 1000px;
            padding: 60px 80px;
        }
        
        .event-modal-title {
            font-size: 48px;
        }
        
        .event-modal-question {
            font-size: 36px;
        }
        
        .event-modal-option {
            font-size: 32px;
            padding: 30px 40px;
        }
        
        .event-modal-text {
            font-size: 34px;
        }
        
        .event-modal-confirm {
            font-size: 32px;
            width: 380px;
            padding: 25px 60px;
        }
    }
    
    /* Скроллбар */
    .event-modal-content::-webkit-scrollbar {
        width: 12px;
    }
    
    .event-modal-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    
    .event-modal-content::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #184591, #2a5298);
        border-radius: 10px;
    }
    `;
    document.head.appendChild(styleSheet);
}