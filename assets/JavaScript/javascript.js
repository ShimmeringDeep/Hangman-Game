

var wordBank = ['Luke Skywalker', 'Han Solo', 'Greedo', 'Jabba the Hutt', 'Wookiee', 'Chewbacca', 'Kashyyk', 'Ewoks', 'Emperor Palapatine', 'Kit Fisto', 'Lando Calrissian', 'Endor', 'Death Star', 'Leia Organa', 'Mon Mothma', 'Mara Jade', 'Revan', 'Obi Wan Kenobi', 'Light Saber', 'Death Star', 'Alderaan', 'Darth Plagueis', 'Vader', 'Womp Rat', 'Power Converters', 'Uncle Owen', 'Aunt Beru', 'Sandpeople', 'Krayt Dragon', 'Sebulba', 'Elan Sleazebaggano', 'Biggs Darklighter', 'Jek Porkins', 'Cloud City', 'Sarlacc Pit', 'Boba Fett', 'Zuckuss'] //wordbark obv

var wins = 1;
var losses = 1;//declaring values for later ( = 1 because it will display in html as zero, and when it writes its first win condition i want it to start with 1


function start() {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] //declaring an array to allow keypress judging, and eliminate double keys.
    var wordToGuess = wordBank[Math.floor(Math.random() * wordBank.length)];//picks a random word
    var guessesLeft = 9; //sets or resets the users guesscount
    var toGuessLower = wordToGuess.toLowerCase() //creates a lowercase version of our wordtoguess so we can save the capitals in the original array
    var answer = []; //sets appropriate amount of blanks
    var youguessed = []; //an array to print user guesses
    for (var i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] == ' ') {
            answer[i] = ' '
        }
        else {
            answer[i] = '_'
        }//populates a string with blanks (or spaces in the case of those)
    }
    document.getElementById("answer").innerHTML = answer.join('')//makes display of string of letters reasonably ok looking
    console.log(wordToGuess) //just checking/cheating
    //nested rest of game inside keyboard event
    document.onkeyup = function (event) {
        var guess = event.key.toLowerCase(); //logs user press
        if (guess === ' ') {
            document.getElementById("feedback").innerHTML = "Space is for adventures";
            
        } //heh
        else if (!alphabet.includes(guess)) {
            document.getElementById("feedback").innerHTML = "Wise choice, that is not"
        } //stops user from guessing silly things
        else if (toGuessLower.includes(guess)) {//user guesses correctly
            for (j = 0; j < wordToGuess.length; j++) {
                //searches word for matching guesses
                if (wordToGuess[j].toLowerCase() === guess) {
                    answer[j] = wordToGuess[j]; //populates blanks
                    document.getElementById("answer").innerHTML = answer.join('');
                    document.getElementById("feedback").innerHTML = "";
                    document.getElementById("solution").innerHTML = "";
                    //no blanks left = win
                    if (!answer.includes('_')) {
                        document.getElementById("feedback").innerHTML = "Thanks to you we have crushed a Rebel Spy";
                        document.getElementById("wins").innerHTML = wins
                        wins++;
                        document.getElementById("solution").innerHTML = "The code you cracked was " + wordToGuess;
                        start();//loops game
                    }

                }
            }
        }
        //wrong guess removes that guess from the alphabet and logs it on screen
        else if (!wordToGuess.toLowerCase().includes(guess)) {
            var nope = alphabet.indexOf(guess);
            document.getElementById("guessesLeft").innerHTMl = guessesLeft
            guessesLeft--;
            youguessed.push(guess);
            alphabet.splice(nope, 1)
            document.getElementById("chosen").innerHTML ='Eliminated Letters: ' + youguessed.join(', ');
        }
        if (guessesLeft === 1) {
            document.getElementById("feedback").innerHTML = "I've got a bad feeling about this...";
        }//heh
        if (guessesLeft === 0) {
            document.getElementById("feedback").innerHTML = "We're one Rebel spy closer to losing these ... Star Wars";
            document.getElementById("losses").innerHTML = losses;
            losses++;
            document.getElementById("solution").innerHTML = "The name of your failure was " + wordToGuess
            start();// 0 guesses left is a loss, this also loops the game.
        }
    }
}





//actual games start function. removes instuctions and displays game.
document.onkeyup = function (event) {
    if ('Shift' == event.key) {
        document.getElementById("instructions").style.display = "none";
        document.getElementById("answers").style.display = "block";
        document.getElementById("scoreboard").style.display = "block";
        start();
    }
}
