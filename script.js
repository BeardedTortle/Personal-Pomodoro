let display = document.getElementById('display');
let displayTitle = document.getElementById('displayTitle');
let contentBox = document.getElementById('displayContent');
let cycleSlider = document.getElementById('cycleSlider');
let continueButton = document.getElementById('continueButton');
let duration = 0;
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
  displayTitle.innerHTML = '';
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
  limit *= 1;
  timerDisplay.innerHTML = `${parseInt(limit /60, 10)}:${parseInt(limit % 60, 10)}`;
  let countdown = setInterval(()=>{
    timerDisplay.innerHTML = `${parseInt(limit /60, 10)}:${parseInt(limit % 60, 10)}`;
    if(isPaused == true) { return
    }
    if(limit > 0){
    limit--
    console.log(limit)
    }else {
      displayTitle.innerText= 'Break Time'
      clearInterval(countdown);
      setUpBreakTimer(breakTime);
      cycleCounter++;
      cycleCounterDisplay.innerHTML = `${cycleCounter}`
    }
  }, 1000)
  
  console.log(limit)
}
 
function setUpBreakTimer(breakLimit){
  breakLimit *= 1;
  timerDisplay.innerHTML = `${parseInt(breakLimit /60, 10)}:${parseInt(breakLimit % 60, 10)}`;
  let countdown = setInterval(()=>{
    timerDisplay.innerHTML = `${parseInt(breakLimit /60, 10)}:${parseInt(breakLimit % 60, 10)}`;
    if(breakLimit > 0){
      breakLimit--
    console.log(breakLimit)
    }else {
      displayTitle.innerText= 'Back To Work!'
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


/*
cycleSlider.oninput = () =>{
  setduration()
}
*/
continueButton.addEventListener('click', counterOption);