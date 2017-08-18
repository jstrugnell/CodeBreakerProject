let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if (answer.value === '' && attempt.value === '') {
        setHiddenFields();
    }

    if (validateInput(input.value)) {
        return false;
    }
    else{
        attempt+=1;
        if (getResults(input.value)) {
            setMessage("You Win!");
            showAnswer(true);
            showReplay();
        }
        else {
            if (attempt === 10) {
                setMessage("You Lose!!!");
                showAnswer(false);
                showReplay();
            } 
            else {
                setMessage("Incorrect, try again.");
            }
        }
    }
}

//implement new functions here

function showAnswer(success){
    document.getElementById("code").innerHTML = answer.value;

    if (success) {
        document.getElementById("code").className = ' success';
    } else {
        document.getElementById("code").className = ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

function getResults(input){
    var results = document.getElementById("results");
    var characterCorrectCount = 0; 
    var icons = '';
    for ( var i = 0; i < input.length; i++ ) {
      //document.write( '<img src="' + s.charAt(i) + '.png" />' );
        if (input.split('')[i] === answer.value.split('')[i]){
            icons += '<span class="glyphicon glyphicon-ok"></span>';
            characterCorrectCount += 1;
        } else if (answer.value.indexOf(input.split('')[i]) === -1) {
            icons += '<span class="glyphicon glyphicon-remove"></span>';            
        } else {
            icons += '<span class="glyphicon glyphicon-transfer"></span>';            
        }
    } 

    results.innerHTML += '<div class="row"><span class="col-md-6">' + input + '</span><span class="col-md-6">' + icons + '</span></div>';

    return characterCorrectCount === 4;
}

function setHiddenFields() {
    var randomNum = Math.floor(Math.random() * 10000);
    answer.value = ("0000" + randomNum).slice(-4);

    attempt.value = 0;
}

function validateInput(input){
    if (input.toString().length !== 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function setMessage(msg) {
    var lbl = document.getElementById("message");
    lbl.innerHTML = msg;
}