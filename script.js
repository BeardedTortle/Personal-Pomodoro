let display = document.getElementById('display');
let displayTitle = document.getElementById('displayTitle');
let contentBox = document.getElementById('displayContent');
let cycleSlider = document.getElementById('cycleSlider');
let continueButton = document.getElementById('continueButton');
let duration = 0;

let timerDisplay = document.createElement('span')


function updateDisplay(){
  contentBox.innerHTML = '';
  displayTitle.innerHTML = '';
  contentBox.appendChild(timerDisplay)
}

function setUpTimer(){
  duration *= 1;
  timerDisplay.innerHTML = `${parseInt(duration /60, 10)}:${parseInt(duration % 60, 10)}`;
  let countdown = setInterval(()=>{
    timerDisplay.innerHTML = `${parseInt(duration /60, 10)}:${parseInt(duration % 60, 10)}`;
    if(duration > 0){
    duration--
    console.log(duration)
    }else {
      console.log('finished')
      clearInterval(countdown);
    }
  }, 1000)
  
  console.log(duration)
}
 



function setduration(){
  
  switch(cycleSlider.value){
    case '1':
      duration = 15;
      break;
    case '2':
      duration = 25;
      break;
    case '3':
      duration = 45;
      break;
    default:
      break;;
  }
  console.log(duration);
}

function noTasks() {
  setUpTimer();
  updateDisplay();
  console.log(`no ${duration}`)


}
function tasks() {
  console.log('yes')
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