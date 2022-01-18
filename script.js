// Variables //
let teams = [
  "real madrid",
  "barcelona",
  "milan",
  "inter",
  "juventus",
  "manchester united",
  "manchester city",
  "liverpool",
  "arsenal",
  "chelsea",
  "bayern munich",
];

let answer = "";
let mistakes = 0;
let guessed = [];
let wordStatus = null;
const startingMinutes = 10;
let time = startingMinutes * 60;

// Get Elements //
const countDownEl = document.getElementById("countdown");
const btn = document.getElementById("timer-btn");

// Functions //
function chooseRandomeWord() {
  answer = teams[Math.floor(Math.random() * teams.length)];
  console.log(answer);
}

function generateButtons() {
  let buttons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        ` <button class='btn' id='` +
        letter +
        `' onclick="handelGuess('` +
        letter +
        `')">` +
        letter +
        `</button> `
    )
    .join("");

  document.getElementById("buttons").innerHTML = buttons;
}

function updateTimer() {
  const min = Math.floor(time / 60);
  let sec = time % 60;

  sec = sec < 10 ? "0" + sec : sec;

  countDownEl.innerHTML = `${min}:${sec}`;
  time--;
  if (time <= 0) {
    clearInterval(updateTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  }
}

function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) =>
      guessed.indexOf(letter) >= 0 ? letter : letter.replace(/\S/g, "_ ")
    )
    .join("");
  document.getElementById("hold").value = wordStatus;
}

function handelGuess(choosenLetter) {
  guessed.indexOf(choosenLetter) === -1 ? guessed.push(choosenLetter) : null;
  document.getElementById(choosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(choosenLetter) >= 0) {
    guessedWord();
    checkGameWon();
  } else if (answer.indexOf(choosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkGameOver();
    updateHangmanPic();
  }
}

function updateMistakes() {
  document.getElementById("wrong-letter").value = mistakes;
}

function checkGameWon() {
  if (wordStatus == answer) {
    document.getElementById("buttons").innerHTML = "You Won!";
  }
}

function checkGameOver() {
  if (mistakes >= 10) {
    document.getElementById("buttons").innerHTML = "Game Over!";
  }
}

function updateHangmanPic() {
  document.getElementById("hangman-pic").src = `images/${mistakes}.jpg`;
}

// Call Back Functions //
chooseRandomeWord();
generateButtons();
updateHangmanPic();

// Event Listeners //

btn.addEventListener("click", function () {
  setInterval(updateTimer, 1000);
  guessedWord();
  updateHangmanPic();
});
