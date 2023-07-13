// JavaScript source code
//this would be the object shape for storing the questions  
//you can change the questions to your own taste or even add more questions..
const questions = [
    {
        question: "Little interest or pleasure in doing things",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Feeling down, depressed, or hopeless",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Trouble falling or staying asleep, or sleeping too much",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Feeling tired or having little energy",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Poor appetite or overeating",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Trouble concentrating on things, such as reading the newspaper or watching television",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    },

    {
        question: "Thoughts that you would be beter off dead, or of hurting yourself",
        optionA: "Not at all",
        optionB: "Several days",
        optionC: "More than half the days",
        optionD: "Nearly every day",
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    //app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
        }
    })

    //Increases a player's score if an option is selected
    if (options[0].checked === true && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        playerScore+0
    }
    if (options[0].checked === false && options[1].checked === true && options[2].checked === false && options[3].checked == false) {
        playerScore += 2
    }
    if (options[0].checked === false && options[1].checked === false && options[2].checked === true && options[3].checked == false) {
        playerScore += 3
    }
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == true) {
        playerScore += 4
    }

    //checking if checked radio button is same as answer

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            //document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            if (option[0].checked === true && option[1].checked === false && option[2].checked === false && option[3].checked == false) {
                playerScore + 1
            }
            else if (option[0].checked === false && option[1].checked === true && option[2].checked === false && option[3].checked == false) {
                playerScore + 2
            }
            setTimeout(() => {
                questionNumber++
            }, 100)

        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            //const wrongLabelId = option.labels[0].id
            //document.getElementById(wrongLabelId).style.backgroundColor = "red"
            //document.getElementById(correctOption).style.backgroundColor = "green"
            //wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 100)
        }
    })
}


//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
            //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

    var Text = 'hello';

    function setInput(button) {
        var buttonVal = button.name,
            textbox = document.getElementById('input_' + buttonVal);
        textbox.value = SendEmail;
    }

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

window.onload = () => {
    NextQuestion(0);
}
