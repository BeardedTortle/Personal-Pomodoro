let display = document.getElementById('display');
let displayTitle = document.getElementById('displayTitle');
let contentBox = document.getElementById('displayContent');
let cycleSlider = document.getElementById('cycleSlider');
let continueButton = document.getElementById('continueButton');
let duration = 15;

let breakTime = 0;
let timerDisplay = document.createElement('span')
let cycleCounter = 0;
let cycleCounterDisplay = document.createElement('span');
cycleCounterDisplay.setAttribute('id', 'cycleCounter')
let stopButton = document.createElement('button')
stopButton.setAttribute('id', 'stopButton')
stopButton.innerHTML = 'stop'

let pauseButton = document.createElement('button')
pauseButton.setAttribute('id', 'stopButton')
pauseButton.innerHTML = 'pause'
let isPaused = false;

let taskCounter = 0;
let taskBoard = document.createElement('div');
taskBoard.setAttribute('id', 'taskBoard');

function updateDisplay(){
  contentBox.innerHTML = '';
  displayTitle.innerHTML = '<h2>Time to Work</h2>';
  contentBox.appendChild(timerDisplay);
  contentBox.appendChild(cycleCounterDisplay);
  contentBox.appendChild(stopButton);
  contentBox.appendChild(pauseButton);
  
  stopButton.addEventListener('click', ()=>{
    timerDisplay.innerHTML = '';
  });

function displayResults() {
  let resultBox = document.createElement('div')
  let refreshButton = document.createElement('a');
  displayTitle.innerHTML = '<h2>Great Work!</h2>'
  refreshButton.innerHTML = 'Restart'
  refreshButton.setAttribute('id', 'refreshButton')
  refreshButton.setAttribute('href', 'javascript:history.go(0)')
  contentBox.innerHTML = '';
  isPaused = true;
  
  resultBox.setAttribute('id', 'resultBox');
  resultBox.innerHTML = `You have completed ${cycleCounter} cycle(s).`

  contentBox.appendChild(resultBox);
  taskBoard.innerHTML = `You completed ${taskCounter} task(s)`
  contentBox.appendChild(taskBoard);
  contentBox.appendChild(refreshButton);
  

}
  stopButton.addEventListener('click', displayResults)
  pauseButton.addEventListener('click', ()=>{
    if(isPaused == false){
      isPaused = true;
      pauseButton.innerHTML = 'Resume'
      console.log('paused')
    } else {
      isPaused = false;
      pauseButton.innerHTML = 'Pause'
      console.log('unpaused')
    }
  })
}

function setUpWorkTimer(limit){
  limit *= 60;
  timerDisplay.innerHTML = `${parseInt(limit /60, 10)}:${parseInt(limit % 60, 10)}`;
  let countdown = setInterval(()=>{
    timerDisplay.innerHTML = `${parseInt(limit /60, 10)}:${parseInt(limit % 60, 10)}`;
    if(isPaused == true) { return
    }
    if(limit > 0){
    limit--
    console.log(limit)
    }else {
      displayTitle.innerHTML= '<h2>Break Time</h2>'
      clearInterval(countdown);
      setUpBreakTimer(breakTime);
      cycleCounter++;
      cycleCounterDisplay.innerHTML = `Cycles: ${cycleCounter}`
    }
  }, 1000)
  
  console.log(limit)
}
 
function setUpBreakTimer(breakLimit){
  breakLimit *= 60;
  timerDisplay.innerHTML = `${parseInt(breakLimit /60, 10)}:${parseInt(breakLimit % 60, 10)}`;
  let countdown = setInterval(()=>{
    timerDisplay.innerHTML = `${parseInt(breakLimit /60, 10)}:${parseInt(breakLimit % 60, 10)}`;
    if(breakLimit > 0){
      breakLimit--
    console.log(breakLimit)
    }else {
      displayTitle.innerHTML= '<h2>Back To Work!</h2>'
      clearInterval(countdown);
      setUpWorkTimer(duration);
    }
  }, 1000)
  
  console.log(breakLimit)
}


function setduration(){
  
  switch(cycleSlider.value){
    case '1':
      duration = 15;
      breakTime = 5;
      break;
    case '2':
      duration = 25;
      breakTime = 5;
      break;
    case '3':
      duration = 45;
      breakTime = 10;
      break;
    default:
      break;;
  }
  console.log(duration);
}

function noTasks() {
  setUpWorkTimer(duration);
  updateDisplay();
  
}
function tasks() {
  console.log('yes')

  // keyboard support for task board

  document.addEventListener('keypress', (key)=> {
    let code = key.keyCode;
  console.log(code);
  switch(code){
    case 43:
      taskCounter++
      taskDisplay.innerText = `${taskCounter}`
      break;
    case 45:
      taskCounter--
      taskDisplay.innerText = `${taskCounter}`
      break;
    default:
      break;
  }
    
  })

  
    
  

  updateDisplay();
  let addButton = document.createElement('button')
  addButton.innerHTML = '+';
  let subButton = document.createElement('button')
  subButton.innerHTML = '-';
  let taskDisplay = document.createElement('span')
  taskDisplay.setAttribute('id', 'taskDisplay');

  taskDisplay.innerText = `${taskCounter}`
  taskBoard.appendChild(taskDisplay);
  taskBoard.appendChild(addButton);
  taskBoard.appendChild(subButton);

  addButton.addEventListener('click', ()=> {
    taskCounter++
    taskDisplay.innerText = `${taskCounter}`
  })

  subButton.addEventListener('click', ()=>{
    taskCounter--
    taskDisplay.innerText = `${taskCounter}`
  })

  contentBox.appendChild(taskBoard)
  setUpWorkTimer(duration);
  

}
function counterOption(){
  setduration()
  console.log(duration);
  displayTitle.innerHTML = '<h2>Do you need a task-counter?</h2>';
  contentBox.innerHTML = '';
  let yesButton = document.createElement('button');
  yesButton.innerHTML = 'Yes'

  let noButton = document.createElement('button');
;  noButton.innerHTML = 'No'

  contentBox.appendChild(yesButton);
  contentBox.appendChild(noButton);

  noButton.addEventListener('click', noTasks);
  yesButton.addEventListener('click', tasks);
}

window.onload = () => {
  cycleSlider.value = 1;
  setBubble(cycleSlider, bubble);
}

cycleSlider.oninput = () =>{
  setduration()
}

continueButton.addEventListener('click', counterOption);
/*
const allRanges = document.querySelectorAll(".range-wrap");

allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});
*/


const bubble = document.querySelector('.bubble');
cycleSlider.addEventListener('input', ()=> {
  setBubble(cycleSlider, bubble);
});
setBubble(cycleSlider, bubble);


function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  setduration();
  bubble.innerHTML = `${duration}<br> Minutes`;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

// slider keyboard support

document.addEventListener('keypress', key => {
  let code = key.keyCode;
  console.log(code);
  switch(code){
    case 49:
      cycleSlider.value = 1;
      setBubble(cycleSlider, bubble);
      break;
    case 50:
      cycleSlider.value = 2;
      setBubble(cycleSlider, bubble);
      break;
    case 51:
      cycleSlider.value = 3; 
      setBubble(cycleSlider, bubble);
      break;
    default:
      break;
  }
})