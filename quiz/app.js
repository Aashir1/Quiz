var config = {
    apiKey: "AIzaSyCgHLBiynCPsitE3Xvu9dL_gvptznZDrXs",
    authDomain: "twitter-responsive-ui.firebaseapp.com",
    databaseURL: "https://twitter-responsive-ui.firebaseio.com",
    projectId: "twitter-responsive-ui",
    storageBucket: "twitter-responsive-ui.appspot.com",
    messagingSenderId: "690105762097"
  };
  firebase.initializeApp(config);
var auth = firebase.auth();

var questionArrayIndex = 0,
    selectedOption,
    realAnswer,
    score = 0,
    timeRemain,
    tempObj,
    quizDiv = document.getElementById('quiz'),
    nextBtn = document.getElementById('next-btn'),
    wrongAnswer
    timerDiv = document.getElementById('timer'),
    logoutBtn = document.getElementById('logout');

var questions = [{
    question: "What is first prim minister of pakistan",
    optn1: 'Nawaz sharif',
    optn2: 'Liaquat Ali Khan',
    optn3: 'Quaid E Azam',
    optn4: 'Allama Iqbal',
    answer: 'Liaquat Ali Khan'
},
{
    question: "Where is world largest mosque",
    optn1: 'Karachi',
    optn2: 'Saudia Arab',
    optn3: 'Lahore',
    optn4: 'Punjab',
    answer: 'Saudia Arab'
},
{
    question: "2 * 6 =",
    optn1: '1',
    optn2: '12',
    optn3: '6',
    optn4: '2',
    answer: '12'
},
{
    question: "HTML stands for",
    optn1: 'HTML',
    optn2: 'XHTML',
    optn3: 'HTTP',
    optn4: 'HTTPS',
    answer: 'HTML'
},
{
    question: "What is react.js",
    optn1: 'Js library',
    optn2: 'Js framwork',
    optn3: 'for designing',
    optn4: 'all the Above',
    answer: 'Js library'
},
{
    question: "What is the founder of facebook",
    optn1: 'Mard zukerberg',
    optn2: 'Satya nadella',
    optn3: 'Bill Gates',
    optn4: 'Steve Jobs',
    answer: 'Mard zukerberg'
}];

function chekRadio(){
  document.getElementById('next-btn').className = "btn btn-success";
  nextBtn.setAttribute('onClick', 'next()');
 }  

function start() {
    var timerRef = document.getElementById('timer');
    var currentTime = Date.parse(new Date());
    var duration = 1 * 60 * 1000;
    var deadline = currentTime + duration;
    updated(timerRef, new Date(deadline));
    runningTime(timerRef, new Date(deadline));
    document.getElementById('start').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline';
    document.getElementById('quiz').style.display = 'block';
    questionManipulation();
}
// console.log(document.getElementById('first').innerHTML)
function questionManipulation() {
    document.getElementById('question').innerHTML = "Q" + (questionArrayIndex + 1) + " :" + questions[questionArrayIndex].question;
    document.getElementById('first').innerHTML = questions[questionArrayIndex].optn1;
    document.getElementById('optn1').value = questions[questionArrayIndex].optn1
    document.getElementById('second').innerHTML = questions[questionArrayIndex].optn2;
    document.getElementById('optn2').value = questions[questionArrayIndex].optn2
    document.getElementById('third').innerHTML = questions[questionArrayIndex].optn3;
    document.getElementById('optn3').value = questions[questionArrayIndex].optn3
    document.getElementById('four').innerHTML = questions[questionArrayIndex].optn4;
    document.getElementById('optn4').value = questions[questionArrayIndex].optn4
}


function next() {
    try {
        realAnswer = questions[questionArrayIndex].answer;
    }
    catch (err) {
        console.log(err)
    }
    questionArrayIndex++;
    var radio = document.getElementsByName('optn');
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            selectedOption = radio[i].value;
            console.log(selectedOption);
            // document.getElementById('next-btn').className = "btn btn-success";
            break;
        }
    }
    if (selectedOption === realAnswer) {
        console.log(realAnswer);
        score++;
    }
    console.log(score)
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radio[i].checked = false;
            break;
        }
    }
    
    if (questions[questionArrayIndex] === undefined) {
        //call score function
        scoring();
        clearInterval(tempObj);
        timerDiv.parentNode.removeChild(timerDiv);
    }
    else {
        questionManipulation();
    }

    nextBtn.className = "btn btn-success disabled";
    nextBtn.removeAttribute('onClick');
}

function scoring(){
    quizDiv.parentNode.removeChild(quizDiv);
    nextBtn.parentNode.removeChild(nextBtn);
    document.getElementById('quiz')
    var percentage =((score / questions.length) * 100);
    percentage = percentage.toFixed(2);
    var result;
    if(percentage >= 65){
        result = 'Congratulation';
    }
    else{
        result = 'fail';
    }
    document.getElementById('result').innerHTML = result + "<br>" + "score: " + percentage + "%" + "<br>" + "Correct: " + score;
    
    
    auth.onAuthStateChanged(function(user){
    if(user){
        console.log(user);
        // window.location.replace("quiz/index.html");
        logoutBtn.style.display = 'block';
    } else {
        logoutBtn.style.display = 'none';
        window.location.replace('../index.html')
        console.log('no user logedin');
    }
});
    

}


logoutBtn.addEventListener('click', function(){
    firebase.auth().signOut();
});


/* **************************************** Quiz Timer **************************************** */


function remainTimeObj(deadlineTime) {
    var t = Date.parse(deadlineTime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor((t / (1000 * 60 * 60 * 24)));

    return {
        'totalTime': t,
        'minutes': minutes,
        'seconds': seconds,
        'hours': hours,
        'days': days
    }
}
function runningTime(element, deadline) {
    tempObj = setInterval(function () {
        timeRemain = remainTimeObj(deadline);
        element.innerHTML = timeRemain.minutes + " : " + ('0' + timeRemain.seconds).slice(-2);

        if (timeRemain.totalTime <= 0) {
            clearInterval(tempObj);
            scoring();
            timerDiv.parentNode.removeChild(timerDiv);
        }
    }, 1000);
}
function updated(element, deadline) {
    var timeObj = remainTimeObj(deadline);
    element.innerHTML = timeObj.minutes + " : " + ('0' + timeObj.seconds).slice(-2);
}

/* ************************************     xxxxxxxxx timer xxxxxxxx    ******************************************* */
