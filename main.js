// 1. 플레이버튼 클릭하면 게임시작
// 2. 게임시작하면 벌레들 랜덤한 위치에 배치 + 남은시간 줄어듬
// 3. 당근클릭시 당근사라짐 + 카운터 올라감
// 4. 벌레클릭시 시간멈춤 + 실패 모달창 뜸
// 5. 리플레이버튼 클릭시 게임 재시작


// - 함수 캐릭터배치 {
// 	변수에 이미지 할당
// 	innerHtml로 li 많이 만들어놓고 각각 ,xy좌표만 랜덤으로 배치하게하면?
// function itemsRandom() => {
    
// }


// - 함수 타이머 {
// 	시간10초 나타나고 일초씩 감소
// 	시간api이용?
// 	셋타임아웃써서 10초뒤에 리플레이 모달나타나게, 클래스이용

const remainTime = document.querySelector('.remaining-time')
let currentSecond = 5;
let playTimer 
const resultText = document.querySelector('.result-text')
function myTimer() {
        playTimer = setInterval(() => {
            currentSecond = currentSecond -1;
            remainTime.innerHTML = `00:${currentSecond}`
        if( currentSecond <= 0) {
            clearInterval(playTimer)
            Modal.classList.remove('hide')
            currentSecond = 5;
            resultText.innerHTML = 'You Lostㅠㅠ'
        }}, 1000);
        
    }

// - 리플레이버튼.이벤리스너 클릭시
const replayBtn = document.querySelector('.replay-btn')

replayBtn.addEventListener('click', () => {
    Modal.classList.add('hide');
    playBtn.classList.add('hide')
    stopBtn.classList.remove('hide')
    // itemsRandom();
    myTimer()

    remainTime.innerHTML = `00:${currentSecond}`
})

// 멈추기 버튼 클릭시 모달
const stopBtn = document.querySelector('.stop-btn')

stopBtn.addEventListener('click', () => {
    Modal.classList.remove('hide');
    playBtn.classList.add('hide')
    stopBtn.classList.add('hide')
    clearInterval(playTimer)
    resultText.innerHTML = `🥕REPLAY ?`
})

// - 플레이버튼.이벤리스너( 클릭 , 함수=> {
// 	캐릭터랜덤배치 함수 호출
// 	타이머함수호출
// }
const playBtn = document.querySelector('.play-btn')

playBtn.addEventListener('click', () => {
    itemsRandom();
    // Timer();
    // targetClick()
})


//  -타겟.이벤리스너 ( 클릭 , 함수() => {
// 	if( 타겟.벌레 === 실패) {
// 	you lost modal 호출
// 	} else {
// 	you win modal 호출
// }
const targetContainer = document.querySelector('.target-container')
const Modal = document.querySelector('.modal')
targetContainer.addEventListener('click', (e) => {
    if(e.target.className === 'bug'){
        Modal.classList.remove('hide')
    }
})


