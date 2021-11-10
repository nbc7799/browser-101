'user strict';

// 1. 플레이버튼 클릭하면 게임시작
// 2. 게임시작하면 벌레들 랜덤한 위치에 배치 + 남은시간 줄어듬
// 3. 당근클릭시 당근사라짐 + 카운터 내려감
// 4. 벌레클릭시 시간멈춤 + 실패 모달창 뜸
// 5. 리플레이버튼 클릭시 게임 재시작


const field = document.querySelector('.game__field')
const container = document.querySelector('.container')
const fieldRect = container.getBoundingClientRect();

const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')
const resultText = document.querySelector('.result-text')
const continueText = document.querySelector('.continue-text')

const playBtn = document.querySelector('.play-btn')
const stopBtn = document.querySelector('.stop-btn')
const continueBtn = document.querySelector('.continue-btn')
const resetBtn = document.querySelector('.reset-btn')

const CARROT_SIZE = 120;
//여기서 위에꺼만 대문자로 쓴이유는 절대 변하지않는 값들을 가르킬때 쓰임
let currentCarrot = 10
let currentSecond = 10;
let playTimer = undefined;
// let playTimer; vs let playTimer = undefined; 이 둘은 같은의미다
let started = false;



/* --------------------funtion 시작 --------------------*/

// - 함수 타이머: 시간10초 나타나고 일초씩 감소
function myTimer() {
    //playTimer에다 할당하는 이유는 setinterval이 게임이 끝나도 무한
    //반복하지 않게 하기위함 위에 값을 지정하지않았으니 끝나게됨
        playTimer = setInterval(() => {
            currentSecond = currentSecond -1;
            gameTimerHtml()
        if( currentSecond <= 0) {
            clearInterval(playTimer)
            modal(currentSecond)
            return;
            }
        }, 1000);  
}

function gameTimerHtml() {
    gameTimer.innerHTML = `00:${currentSecond}`
}

function stopGameTimer() {
    clearInterval(playTimer);
}
// 초기게임플레이 버튼 작동시
function initGame() {
    gameScore.classList.remove('hide')
    gameTimer.classList.remove('hide')
    container.innerHTML = '';
    gameScore.innerHTML = currentCarrot
    addItem('carrot', 10, 'img/carrot.png');
    addItem('bug', 10, 'img/bug.png');
}
// 아이템랜덤좌표로 만듬
function addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i=0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`
        item.style.top = `${y}px`
        container.appendChild(item);
        field.appendChild(container)
    }
    return container
}
// 랜덤한 숫자 생성함수
function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function startGame() {
    initGame();
    showStopBtn();
    myTimer()
    playSound(bgSound)
}

function stopGame() {
    stopGameTimer();
}

function showStopBtn() {
    playBtn.classList.add('hide')
    stopBtn.classList.remove('hide')

}

function hideStopBtn(){
    playBtn.classList.remove('hide')
    stopBtn.classList.add('hide')
}


// 모달창 시간남았을때와 시간다됐을때
function modal(currentSecond) {
    if(currentSecond <= 0){
        showLostModal();
        pauseSound(bgSound)
        playSound(bugSound)
    }else {
        showContineModal()
    }
}

function showContineModal() {
    stopModal.classList.remove('hide');
    resultModal.classList.add('hide')
    playBtn.classList.add('hide')
    stopBtn.classList.add('hide')
    continueText.innerHTML = `🥕Continue ?`
}

function showLostModal() {
    stopBtn.classList.add('hide')
    resultModal.classList.remove('hide')
    stopModal.classList.add('hide')
    resultText.innerHTML = 'You Lostㅜㅜ'
}

function showWinModal(currentCarrot) {
    stopModal.classList.add('hide')
    resultModal.classList.remove('hide')
    resultText.innerHTML = 'You win!!'
    gameScore.innerHTML = `${currentCarrot}`
}

function clickContinueBtn() {
    stopModal.classList.add('hide');
    showStopBtn();
    gameTimerHtml()
}

function clickResetBtn() {
    container.innerHTML = '';
    hideStopBtn()
    gameScore.classList.add('hide')
    gameTimer.classList.add('hide')
    resultModal.classList.add('hide')
    stopModal.classList.add('hide')
    currentSecond = 10
    gameTimerHtml()
    currentCarrot = 10
    gameScore.innerHTML = `${10}`
}

// 사운드 함수
function playSound(sound) {
    sound.currentTime = 0
    sound.play();
}
function pauseSound(sound) {
    sound.pause();
}
const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const bgSound = new Audio('./sound/bg.mp3')
const windSound = new Audio('./sound/game_win.mp3')
const stopModal = document.querySelector('.stop-modal')
const resultModal = document.querySelector('.result-modal')



/* --------------------이벤트 시작 --------------------*/


// - 플레이버튼 클릭시 아이템랜덤배치, 타이머실행
playBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    }else {
        startGame();
    }
})


// 당근,벌레클릭 이벤트 
container.addEventListener('click', (e) => {
    if(e.target.className === 'bug' && e.target.tagName === "IMG"){
        showLostModal()
        pauseSound(bgSound)
        clearInterval(playTimer)
        playSound(bugSound)
    } else if(e.target.className === 'carrot' && e.target.tagName === "IMG"){
        container.removeChild(e.target)
        currentCarrot = currentCarrot - 1
        playSound(carrotSound)
        gameScore.innerHTML = `${currentCarrot}`
    } if(currentCarrot === 0){
        clearInterval(playTimer)
        pauseSound(bgSound)
        playSound(windSound)
        showWinModal(currentCarrot)
    }
})


// 재시작 버튼 이벤트
resetBtn.addEventListener('click', () => {
    clickResetBtn()
})

// 스탑 버튼 클릭시 모달
stopBtn.addEventListener('click', () => {
    clearInterval(playTimer);
    modal(currentSecond);
    pauseSound(bgSound);
})


// - 컨티뉴버튼 클릭시
continueBtn.addEventListener('click', () => {
    clickContinueBtn();
    myTimer();
    playSound(bgSound)
})


