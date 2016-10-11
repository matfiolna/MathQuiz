  "use strict";
var quiz = [{
  "question": "2+7?",
  "choices": ["3", "71", "9", "8"],
  "correct": "9",

}, {
  "question": "15*0.5?",
  "choices": ["7.5", "2", "30"],
  "correct": "7.5",
}, {
  "question": "Er 5*5=25?",
  "choices": ["False", "True"],
  "correct": "True",
}, {
  "question": "5*5*5?",
  "choices": ["100", "115", "125"],
  "correct": "125",
}];


// define elements
var main = document.getElementById("main");
var question = document.getElementById("question");
var choicesmain = document.getElementById("choices");
var submitBtn = document.getElementById("submit");


var current = 0;
var score = 0;
var questionask = true;

/* shuffle prototype, virkar ekki
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
*/

function askQuestion() {
  var choices = quiz[current].choices;
  var choicesHtml = "";



//bua til radio buttons
 for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + current +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

//saekja spurningar
question.textContent = "Q" + (current -1) + ". " + quiz[current].question;

//saekja moguleikar
choicesmain.innerHTML = choicesHtml;

//kalla ad function sem stilla allt i fyrsta skipti
firstTimeRun();
}

function checkAnswer() {
  //Spyrja spurningu eda halda áfram að næstu spurningu
  if (questionask) {
    questionask = false;

    // ákvarða hvaða radio button þeir smellt
    var Index;
    var userpick;
    var radios = document.getElementsByName("quiz" + current);
    for (var i = 0; i < radios.length; i++) {


      if (radios[i].checked) { // ef radio button er smellt
        userpick = radios[i].value;
      }

     if (radios[i].value == quiz[current].correct) {
        Index = i;
      }
    

    }

    
    // athuga hvort svarið er rétt eða ekki
    if (userpick == quiz[current].correct) {
      score++;
    } 
  } else { 
  //setja upp og fara i naesta spurningin
    questionask = true;
    //athuga hvort spurning er síðasta
    if (current < quiz.length - 1) {
      current++;
      askQuestion();
    } else {
      Results();
    }
  }
}


//function sem stilla allt i fyrsta skipti     
function firstTimeRun()
{
      if (current === 0) {
          submitBtn.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
        }
}



function Results() {
  main.innerHTML = "<h2>Quiz Score!</h2>" +
    "<h3>" + score + " out of " + quiz.length + " questions ";}

window.addEventListener("load", askQuestion, false);

submitBtn.addEventListener("click", checkAnswer, false);