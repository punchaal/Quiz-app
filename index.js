
'use strict';

// To begin with lets set the question number and points to 0//
let questionNumber=0;
let points = 0;

//From the start button you want the user to be directed to the first question in the quiz//
function handleStartButton() {
    $('#js-start-button').click(function () {
        nextQuestion();
    });
}

//
function nextQuestion() {
   $('.initiateQuiz').html(questionTemplate());
}

function questionTemplate() {
return `<section id = "quiz" role="main">
        <h2> ${STORE[questionNumber].question}</h2>
            <form>
                <fieldset>
                    <label>
                    <input class="option" type="radio" name="options" checked></input>
                    <span>${STORE[questionNumber].answers[0]}</span>
                    </label>
                    <label>
                    <input class="option" type="radio" name="options"></input>
                    <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                    <label>
                    <input class="option" type="radio" name="options"></input>
                    <span>${STORE[questionNumber].answers[2]}</span>
                    </label>
                    <label>
                    <input class="option" type="radio" name="options" ></input>
                    <span>${STORE[questionNumber].answers[3]}</span>
                    </label>
                    <button class="btn-primary" type="submit" class="submit-answer-button" id="submit-answer">Submit</button>
                </fieldset>
             </form>
     </section>`
}

function handleSubmitButton(){
    $('.initiateQuiz').on('click', '#submit-answer', function(event){
        event.preventDefault()
        const answer= $ ('input:checked').siblings('span')
        const userIsCorrect=checkUserAnswer(answer);
        if(userIsCorrect===true){
            generateRightFeedback()
        }else{
            generateWrongFeedback()
    }
})
}

function checkUserAnswer(answer){
    if (answer.text()===STORE[questionNumber].correctAnswer){
        changePoints();
        return true;
    } else {
        return false;
    }
}

function generateRightFeedback(){
    $('#quiz').html(`<div class="correctFeedback">
    <img src="http://www.neath-archers.co.uk/wp-content/uploads/2015/09/clipart-two-thumbs-up-happy-smiley-emoticon-512x512-eec6.png" height="100px" width="100px" alt = "thumbs up" />
    <p>Congratulations you are a genius!! The cricketing fraternity is proud of you!</p>
    <button type=button class="btn-primary" id="js-next-button">Next</button></div>`
    );
}

function generateWrongFeedback(){
    $('#quiz').html(`<div class="wrongFeedback">
    <img src="http://clipart-library.com/img/1293768.png" height="100px" width="100px" alt="thumbs down" />
    <p>Your performance on this question was quite underwhelming!! </p>
    <button type=button class="btn-primary" id="js-next-button">Next</button></div>`
    );
}

function changeQuestionNumber () {
      questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
  }

function changePoints(){
    points++;
    $('.points').text(points);
}



function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
  }

function handleNextButton(){
    $('.initiateQuiz').on('click','#js-next-button',function(){
        if(questionNumber == 9) {
            createResultsPage();
          } else {
            changeQuestionNumber();
            nextQuestion();
          }
    });
}

function createResultsPage() {
    $('#quiz').html(`
      <section id="final-page">
        <h2>Final Score: ${points} out of 10</h2>
        <button id="js-play-again-button" class="btn-primary">Play Again?</button>
      </section>
    `);
  }

  function handleRestartButton() {
    $('.initiateQuiz').on('click', '#js-play-again-button', function() {
  
      questionNumber = 0;
  
      points = -1;
  
      nextQuestion();
      changePoints();
      changeQuestionNumber();
    });
  }


function handleButtons() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
  }

 handleButtons();
