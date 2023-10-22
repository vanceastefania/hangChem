const resetButton = document.getElementById("resetButton");

class HangmanGame {
  constructor() {
    this.chemElem = ["hydrogen", "sodium", "potassium", "calcium", "iron", "oxygen", "carbon", "chlorine", "helium"];
    this.answer = "";
    this.lives = 6;
    this.mistakes = 0;
    this.guessed = [];
    this.wordState = null;
  }
// random select an element from the array
  randomWord() {
    this.answer = this.chemElem[Math.floor(Math.random() * this.chemElem.length)];

    console.log("Randomly chosen word:", this.answer);

  
  }

  generateButnAlph() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const keyboardElement = document.getElementById("keyboard");

    //keyboardElement will be cleared before generating the new alphabet buttons(for the error with restart button & button multiplied :( )
    keyboardElement.innerHTML = "";

    for (let letter of alphabet) {
      const button = document.createElement("button");
      button.classList.add("alphabet-button");
      button.id = letter;
      button.textContent = letter.toUpperCase();
      button.addEventListener("click", () => this.handleGuess(letter));
      keyboardElement.append(button);
    }}

  handleGuess(chosenLetter) {
    this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    //the logic when a letter is guessed by the player 

    if (this.answer.indexOf(chosenLetter) >= 0) {
      this.guessWord();
      this.checkIfIWon();
      document.getElementById("correctSound").play();
    } else if (this.answer.indexOf(chosenLetter) === -1) {
      this.mistakes++;
      this.updateMistakes();
      this.checkIfILost();
      this.updatePictures();
      document.getElementById("incorrectSound").play();
    }
  }

  updatePictures() {
    document.getElementById("hangchemPic").src = "./hangChemPic/" + this.mistakes + ".png";
  }

  checkIfIWon() {
    if (this.wordState === this.answer) {
      document.getElementById("keyboard").innerHTML = "<span class='win-message'> Congratulations , you made a new perfect human being! !!!</span>";
      document.getElementById("removeMsg").style.display = "none"; // remove the message
      document.getElementById("details-lives").style.display = "none"; 
      document.getElementById("hangchemPic").style.display = "none";



    }
  }

  checkIfILost() {
    if (this.mistakes === this.lives) {
      document.getElementById("wordSpot").innerHTML = "The right element was : " + this.answer;
      document.getElementById("keyboard").innerHTML = "<span class='loser-message'>You...lovely loser...HAHAHA !!!</span>";
      document.getElementById("removeMsg").style.display = "none"; // remove the message
      document.getElementById("containerGame").classList.add("destroyedLab");//add the img for losers
      document.getElementById("details-lives").style.display = "none";
      
      const audioElement = document.getElementById("loseSound");
      audioElement.play();


    }
  }

  updateMistakes() {
    document.getElementById("mistakes").innerHTML = this.mistakes;
  }

  guessWord() {
    this.wordState = "";
    //loop that iterates over each letter in the answer string
    for (let letter of this.answer) {
      
      if (this.guessed.includes(letter)) {
        this.wordState += letter;
      } else {
        this.wordState += " _ "
      }

    }
   

    document.getElementById("wordSpot").innerHTML = this.wordState;
  }

  reset() {
    this.mistakes = 0;
    this.guessed = [];
    document.getElementById("hangchemPic").src = "hangChemPic/0.png";
    

    this.randomWord();
    this.guessWord();
    this.updateMistakes();
    this.generateButnAlph();
    
    document.getElementById("containerGame").classList.remove("destroyedLab"); // Remove the lose-background 

    // Reset the background to the default background image
  document.body.style.backgroundImage = "url(./scienceLab.jpg);";

  // Display the details-lives elem.
  document.getElementById("details-lives").style.display = "block";

  document.getElementById("hangchemPic").style.display = "block";

  const audioElement = document.getElementById("loseSound");
  audioElement.pause();
  audioElement.currentTime = 0; // Reset the audio to the beginning
}

  startGame() {
    this.randomWord();
    this.generateButnAlph();
    this.guessWord();
    this.updateMistakes();
  }
}

const hangmanGame = new HangmanGame();
hangmanGame.startGame();
// const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  hangmanGame.reset();
});
