//getting all required elements
const start_btn =document.querySelector(".start_btn button");
const info_box =document.querySelector(".info_box");
const exit_btn =info_box.querySelector(".buttons .quit");
const continue_btn =info_box.querySelector(".buttons .restart");
const exercise_box =document.querySelector(".exercise_box");
const timeCount = exercise_box.querySelector(".timer .timer_sec");
const timeLine = exercise_box.querySelector("header .time_line");
const timeOff = exercise_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

//if Start Exercise Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //shows the info box
}
//if Exit Button Clicked
exit_btn.onclick = () => {
    window.location.href = "../../../exercise-hub.html"; //hide the info box
}
//if Continue Button Clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    exercise_box.classList.add("activeExercise"); //shows the Exercise Box
    showQuestions(0);
    queCounter(1);
    startTimer(60);
    startTimerLine(0);
}
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 60;
let widthValue = 0;
let userScore = 0;

const next_btn = exercise_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_exercise = result_box.querySelector(".buttons .restart");
const quit_exercise = result_box.querySelector(".buttons .quit");

restart_exercise.onclick = () =>{
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 60;
    widthValue = 0;
    userScore = 0;
    scoreTag = 0;
    exercise_box.classList.add("activeExercise");
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time left";
}

quit_exercise.onclick = (index) =>{
    window.location.href = "../../../exercise-hub.html";
}

// if Next Button Clicked
next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("You've Finsihed the Exercise");
        showResultBox();
    }
    
}

//getting questions and options from array
function showQuestions(Exercise1){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+  questions[Exercise1].numb+". " + questions[Exercise1].question +'</span>';
    let option_tag = '<div class = "option">' + questions[Exercise1].options[0] + '<span></span></div>'
                        + '<div class = "option">' + questions[Exercise1] .options[1] + '<span></span></div>'
                        + '<div class = "option">' + questions[Exercise1] .options[2] + '<span></span></div>'
                        + '<div class = "option">' + questions[Exercise1] .options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionselected(this)");
    }
}

let tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = ' <div class="icon cross"><i class="fas fa-times"></i></div>';
function optionselected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct!!");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Incorrect Answer!!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

      //if answer is incorrect then automatically shows the correct answer
      for(let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
    }
 //once user selected disabled all options
 for(let i = 0; i < allOptions; i++){
    option_list.children[i].classList.add("Disabled");
 }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    exercise_box.classList.remove("activeExercise"); //shows the Exercise Box
    result_box.classList.add("activeResult"); //shows the Result Box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <b> '+ userScore +' </b> out of <b> </b>'+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <b> '+ userScore +' </b> out of <b> '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <b> '+ userScore +' </b> out of <b> '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent + "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time's up";

            let correctAns =questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
              }
              for(let i = 0; i <allOptions; i++){
                option_list.children[i].classList.add("Disabled");
             }
                next_btn.style.display = "block";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 111)
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}







function queCounter(Exercise1){
    const bottom_ques_counter = exercise_box.querySelector(".total_que");
    let totalQuesCountTag =  '<span><p>'+ Exercise1  +  '</p> <p>of</p><p>'+questions.length+'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}