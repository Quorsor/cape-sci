const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const exitButton = document.getElementById('exit-btn')
const displayQuestion = document.getElementById('question-text')
const header = document.getElementById('header')
const headerText = document.getElementById('header-text')
const defaultText = document.getElementById('default')

const time = document.getElementById('time')

const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const button4 = document.getElementById('button4')

const showBut = document.getElementById('button-disp')

let cur_que = 0;
let score = 0;
var timeLimit = 0; // time limit in seconds
var currentTime = 60; // current time in seconds
var timerInterval; // reference to the setInterval function

// function to display the current time
function updateTimer() {
  document.getElementById("time").innerHTML = currentTime;
}

// function to start the timer
function startTimer() {
  timerInterval = setInterval(function() {
    currentTime--;
    updateTimer();
    if (currentTime <= timeLimit) {
      clearInterval(timerInterval);
      // quiz is over, show the results
      finished();
    }
  }, 1000); // update timer every 1000 milliseconds (1 second)
}

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', nextQue)
exitButton.addEventListener('click', exit)

function startQuiz() {
    score = 0;
    currentTime = 60;
    cur_que = 0;
    startButton.classList.add('hide')
    nextButton.classList.remove('hide')
    exitButton.classList.remove('hide')
    cur_que++;
    startTimer();
    showQue(cur_que);
}

function nextQue() {
    if (cur_que == 5) {
        finished();
    }
    else {
        cur_que++;
        showQue(cur_que);
    }
}

function exit() {
    finished()
}

function to_overview() {
    cur_que = 0;
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    exitButton.classList.add('hide');
    header.classList.add('hide');
    displayQuestion.classList.add('hide');
    defaultText.classList.remove('hide');
    showBut.classList.add('hide');


}

function finished() {
    cur_que = 0;
    startButton.innerText = "Wanna Try Again?";
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    exitButton.classList.add('hide');
    header.classList.add('hide');
    showBut.classList.add('hide');

    displayQuestion.innerText = "You got a score of: " + score;


}

function checkAnswer(button) {
    if (button.textContent === questions[cur_que].correct) {
      // the selected answer is correct
      score++;
      console.log("correct");
      nextQue();
    }
    else {
        console.log("wrong");
    }
}

function showQue(queNum) {
    defaultText.classList.add('hide');
    header.classList.remove('hide');
    headerText.innerText = "Question " + queNum;
    displayQuestion.innerText = questions[queNum].question;
    showBut.classList.remove('hide');
    if (currentTime > 0) {
/*     questions[queNum].answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('choice-button')
        button.classList.add('Button-text')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }) */
/*     button1.innerText = questions[queNum].answers[0].text
    button1.addEventListener('click', selectAnswer(0))
    button2.innerText = questions[queNum].answers[1].text
    button2.addEventListener('click', selectAnswer(1))
    button3.innerText = questions[queNum].answers[2].text
    button3.addEventListener('click', selectAnswer(2))
    button4.innerText = questions[queNum].answers[3].text
    button4.addEventListener('click', selectAnswer(3)) */
/*     if (questions[queNum].answers[1].correct) {
        button1.dataset.correct = answers.correct
    }
    if (questions[queNum].answers[2].correct) {
        button2.dataset.correct = answers.correct
    }
    if (questions[queNum].answers[3].correct) {
        button3.dataset.correct = answers.correct
    }
    if (questions[queNum].answers[4].correct) {
        button4.dataset.correct = answers.correct
    } */
    button1.innerText = questions[queNum].answers[0].text
    button2.innerText = questions[queNum].answers[1].text
    button3.innerText = questions[queNum].answers[2].text
    button4.innerText = questions[queNum].answers[3].text
    var buttons = [button1,button2,button3,button4]
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
          checkAnswer(this);
        });
    }}
}
