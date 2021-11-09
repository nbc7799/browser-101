// 1. 플레이버튼 클릭하면 게임시작
// 2. 게임시작하면 벌레들 랜덤한 위치에 배치 + 남은시간 줄어듬
// 3. 당근클릭시 당근사라짐 + 카운터 올라감
// 4. 벌레클릭시 시간멈춤 + 실패 모달창 뜸
// 5. 리플레이버튼 클릭시 게임 재시작



'user strict';

// - 함수 타이머 {
// 	시간10초 나타나고 일초씩 감소
// 	셋타임아웃써서 10초뒤에 리플레이 모달나타나게, 클래스이용

const remainTime = document.querySelector('.remaining-time')
let currentSecond = 10;
let playTimer 
const resultText = document.querySelector('.result-text')
const continueText = document.querySelector('.continue-text')

function myTimer() {
        playTimer = setInterval(() => {
            currentSecond = currentSecond -1;
            remainTime.innerHTML = `00:0${currentSecond}`
        if( currentSecond <= 0) {
            clearInterval(playTimer)
            modal(currentSecond)
        }
    }, 1000);
        
    }

// - 플레이버튼 클릭시 아이템랜덤배치, 타이머실행
const playBtn = document.querySelector('.play-btn')
playBtn.addEventListener('click', () => {
    playBtn.classList.add('hide')
    stopBtn.classList.remove('hide')
    initGame()
    myTimer()
})



// 스탑 버튼 클릭시 모달
const stopBtn = document.querySelector('.stop-btn')
stopBtn.addEventListener('click', () => {
    stopModal.classList.remove('hide');
    resultModal.classList.add('hide')
    playBtn.classList.add('hide')
    stopBtn.classList.add('hide')
    clearInterval(playTimer)
    modal(currentSecond)
})


// - 리플레이버튼.이벤리스너 클릭시
const continueBtn = document.querySelector('.continue-btn')
const resetBtn = document.querySelector('.reset-btn')
continueBtn.addEventListener('click', () => {
    stopModal.classList.add('hide');
    playBtn.classList.add('hide')
    stopBtn.classList.remove('hide')
    myTimer()
    remainTime.innerHTML = `00:${currentSecond}`
})

// resetBtn.addEventListener('click', ()=> {

// })

// - 함수 벌레당근배치(플레이버튼시,재시작시) {
const field = document.querySelector('.field')

const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 120;


//벌레와 당근을 생성한뒤 field에 추가해줌
function initGame() {
    addItem('carrot', 10, 'img/carrot.png');
    addItem('bug', 10, 'img/bug.png');
}

const container = document.querySelector('.container')

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

// 당근,벌레클릭 이벤트 

const catched = document.querySelector('.catched')
let currentCarrot = 10

field.addEventListener('click', (e) => {
    if(e.target.className === 'bug' && e.target.tagName === "IMG"){
        stopModal.classList.add('hide')
        stopBtn.classList.add('hide')
        resultModal.classList.remove('hide')
        resultText.innerHTML = `You Lostㅠㅠ`
        clearInterval(playTimer)
        
    } else if(e.target.className === 'carrot' && e.target.tagName === "IMG"){
        container.removeChild(e.target)
        currentCarrot = currentCarrot - 1
        catched.innerHTML = `${currentCarrot}`
    } if(currentCarrot === 0){
        clearInterval(playTimer)
        reModal(currentCarrot)
    }
})

const stopModal = document.querySelector('.stop-modal')
const resultModal = document.querySelector('.result-modal')

//resultModal
function reModal(currentCarrot) {
    stopModal.classList.add('hide')
    resultModal.classList.remove('hide')
    resultText.innerHTML = 'You win!!'
    catched.innerHTML = `${currentCarrot}`
    // else if(currentSecond <= 10 && resultText.innerHTML === `You win!!`) {
    //     resetBtn.addEventListener('click', ()=>{
    //         initGame();
    //         myTimer();
    //         remainTime.innerHTML = `00:${currentSecond}`
    //     })
    // }
}

// 모달창 시간남았을때와 시간다됐을때
function modal(currentSecond) {
    if(currentSecond <= 0){
        stopBtn.classList.add('hide')
        resultModal.classList.remove('hide')
        stopModal.classList.add('hide')
        resultText.innerHTML = 'You Lostㅜㅜ'
    }else if(currentSecond <= 10){
       stopModal.classList.remove('hide')
       resultModal.classList.add('hide')
       continueText.innerHTML = `🥕Continue ?`
    }
}

resetBtn.addEventListener('click', () => {
    console.dir(container)
    container.innerHTML = ''
    playBtn.classList.remove('hide')
    stopBtn.classList.add('hide')
    resultModal.classList.add('hide')
    stopModal.classList.add('hide')
    currentSecond = 10
    remainTime.innerHTML = `00:${10}`
    currentCarrot = 10
    catched.innerHTML = `${10}`
})

// function items() {
//     for(let i=0; i < 20; i++){
//         data.push('아이템' + i);
//         console.log(data)
//     }
//     for(let i=0; i<data.length; i++) {
//        const item = creatItem(data[i])
//        targetContainer.appendChild(item)
//     }
// }

// function creatItem(i) {
//     const bug = document.createElement('img')
//     bug.setAttribute('class', 'bug')
//     bug.setAttribute('src',`img/bug.png`)
//     const carrot = document.createElement('img')
//     carrot.setAttribute('class', 'carrot')
//     carrot.setAttribute('src',`img/carrot.png`)
// }



// function itemsRandom(){
//     const x = bug.getBoundingClientRect().left
//     const y = bug.getBoundingClientRect().top
    
//     console.log(x, y)
//     // const numbers = Math.floor(Math.random()*20)
//     // console.log(numbers)
// }



