let display = document.getElementById('display');
let displayTitle = document.getElementById('displayTitle');
let contentBox = document.getElementById('displayContent');
let cycleSlider = document.getElementById('cycleSlider');
let continueButton = document.getElementById('continueButton');
let timer = document.createElement('div')
let timeValue = 0;

function setUpTimer(){
  let target = timeValue * 60;
  console.log(target)

  
  let countdown = setInterval((target)=>{
    target--
    console.log(target)
  }, 1000);

}


function noTasks() {
  setUpTimer();
  console.log(`no ${timeValue}`)


}
function tasks() {
  console.log('yes')
}
function counterOption(){
  console.log(timeValue);
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



cycleSlider.oninput = () =>{
  switch(cycleSlider.value){
    case '1':
      timeValue = 15;
      break;
    case '2':
      timeValue = 25;
      break;
    case '3':
      timeValue = 45;
      break;
    default:
      break;;
  }
  console.log(timeValue);
}

continueButton.addEventListener('click', counterOption);