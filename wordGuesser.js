var letters = [];
var progress = [];
var guessed = [];
var deathCount = 0;
var triesLeft = 6;

function pickRandomWord() {
	/*
	import a dictionary? scrape something?
	perhaps pick "subjects" of words you could guess

	 */
}

function makeWordArray(str) {
	// iterate through the word to pop it into an array
    var wordLength = str.length;
	for (var i = 0; i < wordLength; i++) {
		// console.log("Word started as: " + word);
    	var letter = str.slice(0, 1);
    	letters.push(letter);
    	progress.push(letter);
        // console.log(letters);
        str = str.substring(1);
      	// console.log("Word ends as: " + word);
	}
}

function storeProgress(word, length) {
	// iterate for length of word to add 
	for (var i = 0; i < length; i++) {
    	progress.push('_');
	}
	console.log(progress);
}

function makeString(array) {
	var string = '';
	for (var i = 0; i < array.length; i++) {
		string += array[i]; 
		if (array[i] == '_') {
			string += ' ';
		}
	}
	return string;
}

function makeGuess() {
	// if guessed incorrectly 5 times, DEADZONE.
	if (deathCount > 4) {
		console.log("\nOy, that's 5 wrong guesses and ya died. D: Refresh to play again!");
		playAgain();
	}
	
	//if all are guessed, DONE WOO
	if (allGuessed() == true) {
		console.log("\nYou guessed all the letters! Your word was: " + makeString(letters));
		playAgain();
	}

	letterGuess = prompt("What letter would you like to guess?", "Letter").toLowerCase();	
	
	if ((isLetter(letterGuess) == false) && (guess.length == 1)) {
		console.log("\nThat's not a single letter. Please try again!");
		makeGuess();
	}

	// check to see if the letter is already guessed so they don't duplicate tries and die early
	if (letterGuessed(letterGuess) == true) {
		console.log("\nYou already guessed that letter! It doesn't count as a death-inducing guess, so try again.");
		makeGuess();
	}
	// FINALLY you can just use the letter for a guess
	else {
		guessed.push(letterGuess);
		guessLetter(letterGuess);
	}
}

function allGuessed() {
	for (var i = 0; i < progress.length; i++) {
		if (progress[i] == '_') {
			return false;
		}
	}
	return true;
}

function isLetter(guess) {
	var onlyLetters = /^[a-zA-Z]+$/.test(guess);
	if (onlyLetters == false) {
		return false;
	}
	return true;
}

function letterGuessed(guess) {
	for (var i = 0; i < guessed.length; i++) {
		if (guessed[i] == guess) { return true;	}
	}
	return false;
}

function guessLetter(letter) {
	var foundOne = false;
	for (var i = 0; i < letters.length; i++) {
		if (letters[i] == letter) {
			if (foundOne == false) {
				console.log("\nYou've guessed a letter! '" + letter + "' is in the word.");
				foundOne = true;
			}
			// place the guessed word in the array
			progress[i] = letter;
		}
	}
	if (foundOne == true) {
		console.log("So far you've figured out: " + makeString(progress.slice(0,progress.length/2)));
		foundOne = false;
		makeGuess();
	}
	else {
		triesLeft--;
		console.log("\nI'm sorry, '" + letter + "' wasn't in the word. You have " + triesLeft + " tries left.");
		deathCount++;
		makeGuess();
	}
}

function playAgain() {
	again = prompt("Would you like to play again? Yes or no?").toLowerCase();
	if (again == 'yes') {
		playGame();
	}
	else if (again == 'no') {
		return;
	}
	else {
		console.log("That wasn't 'yes' or 'no'...");
		playAgain();
	}
}

function playGame() {
	word = prompt("Alright, guesser, don't look! Word keeper, what shall the guesser try to guess?", "Type guess here").toLowerCase();
	if (isLetter(word) == false) { playGame(); }
	storeProgress(word, word.length);
	console.log(word.length);
	makeWordArray(word);
	document.body.InnerHTML += "We've got the magic word.";
	makeGuess();
}

// event handler listens for computer randomized button
// calls pickRandomWord();
// use js to make event handler that listens for a "play game button" to be pressed 
playGame();
// form that shows up ONLY once or keep prompt?
