var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainer = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById('answer-buttons')
var leaderboardButton = document.getElementById('leader-btn')
var leaderboard = document.getElementById('leaderboard')
var leaderboardLink = document.getElementById('leaderboard-link')
var timeEl = document.getElementById('time')
var formName = document.getElementById('name-form')
var formSubmit = document.getElementById('form-submit')
var leaderboardUl = document.getElementById('leaderboard-ul')
var secondsLeft = 30;



var questions = [
   {
     question: 'What will select an element by its ID',
     answers: [
       { text: 'document.querySelectorAll', correct: false, answer: true },
       { text: 'document.querySelector', correct: false, answer: true },
       { text: 'element.classList.add', correct: false, answer: true },
       { text: 'document.getElementById', correct: true, answer: true }
     ]
   },
   {
     question: 'What calls a function?',
     answers: [
       { text: 'functionName()', correct: true, answer: true },
       { text: 'callFunction.functionName()', correct: false, answer: true },
       { text: 'getFunctionByHorse(functionName)', correct: false, answer: true },
       { text: 'functionName(call)', correct: false, answer: true }
     ]
   },
   {
     question: 'JavaScript is a ______',
     answers: [
       { text: 'transit system', correct: false, answer: true },
       { text: 'markup language', correct: false, answer: true },
       { text: 'coding language', correct: true, answer: true },
       { text: 'lie', correct: false }
     ]
   },
   {
     question: 'What event listener will accept a click',
     answers: [
       { text: 'findclick', correct: false, answer: true },
       { text: 'click', correct: true, answer: true },
       { text: 'listenfor', correct: false, answer: true},
       { text: 'clickand', correct: false, answer: true}
     ]
   }
]
 
startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
 currentQuestion++
 setNextQuestion()
})
 
leaderboardButton.addEventListener('click', viewLeaderboard);

leaderboardLink.addEventListener('click', viewLeaderboard);

formSubmit.addEventListener('click', getScore);


 
let shuffledQuestions, currentQuestion
 
function startGame () {
   startButton.classList.add("hide");
   nextButton.classList.remove("hide");
   questionContainer.classList.remove("hide");
   shuffledQuestions = questions.sort(() => Math.random() - .5);
   currentQuestion = 0
   setNextQuestion()
   setTime()
   leaderboard.classList.add("hide");
   console.log(leaderboard.classList);
}
 
function setNextQuestion() {
   reset()
   showQuestion(shuffledQuestions[currentQuestion])
   nextButton.disabled = true
}
 
function reset() {
   while (answerButtonsElement.firstChild) {
       answerButtonsElement.removeChild(answerButtonsElement.firstChild)
     }
}
 
 
function showQuestion(question) {
   questionElement.innerText = question.question
   question.answers.forEach(answer => {
     var button = document.createElement('button')
     button.innerText = answer.text
     button.classList.add('btn')
     if (answer.correct) {
       button.dataset.correct = answer.correct
     }
     button.addEventListener('click', selectAnswer)
     answerButtonsElement.appendChild(button)}
     )
}
 
function selectAnswer(event) {
   var selectedAnswer = event.target;
   var correct = selectedAnswer.dataset.correct
   var isAnswer = selectedAnswer.dataset.answer

   if (!correct) {
       secondsLeft = secondsLeft - 5
   
    }
    if (correct) {
        nextButton.disabled = false
    } 

   if (shuffledQuestions.length <= currentQuestion + 1){
       leaderboardButton.classList.remove('hide')
       nextButton.classList.add('hide')
   }
   console.log(currentQuestion)
}

function setTime() {
    // Sets interval in variable
    secondsLeft = 30;
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = 'Time: ' + secondsLeft;
  
      if(secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        viewLeaderboard()
      }
    }, 1000);
}
function viewLeaderboard() {
  questionContainer.classList.add('hide');
  leaderboard.classList.remove('hide');
  startButton.classList.remove('hide');
  startButton.innerHTML = "Restart";
  nextButton.classList.add('hide')
}

var userList = []

function getScore() {
    resetScore()
    var user = {
        name: formName.value,
        score: secondsLeft,
    }


    userList = userList.concat(user)
    var sortedlist = userList.sort(function (a, b) {
        return b.score - a.score;
    });

    userList = sortedlist
    console.log(userList)
     uploadScore()
}

function uploadScore() {
    for(var i =0; i < userList.length; i++) {
        var listItem = document.createElement('li')
        listItem.innerText = `${userList[i].name} - Score ${userList[i].score}`

        leaderboardUl.appendChild(listItem)
    }
        
}

function resetScore() {
    while (leaderboardUl.firstChild) {
        leaderboardUl.removeChild(leaderboardUl.firstChild)
      }
}