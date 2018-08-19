// array of all the cards
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

// fixed variables
let moveCounter = document.querySelector(".moves");
const restartButton = document.querySelector(".restart");
const deck = document.querySelector(".deck");
const starPanel = document.querySelector(".stars");
const timer = document.querySelector(".timer");
const modal = document.querySelector(".modal");
const modalEsc = document.querySelector(".close-modal");
const newGame = document.querySelector(".play-again");

// variables that get updated
let opened = [];
let matched = [];
let seconds = 0;
let gameTimer;
let moves = 0;
let firstClick = false;

// starts game
startGame();


// Functions
// times game
function countTime() {
  gameTimer = setInterval(function() {
  seconds++;
  timer.innerHTML = seconds;
  }, 1000);
}

// stops timer
function stopTime() {
  clearInterval(gameTimer);
}

// creates deck of cards, allowing the game to start
function startGame() {
  shuffle(icons);
  for (let i = 0; i < icons.length; i++) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `<i class = "${icons[i]}" ></i>`;
  deck.appendChild(card);
  cardClicker(card);
  }
}

// adds event listener on each card
function cardClicker(card) {
  card.addEventListener("click", function() {
  card.classList.add("open", "show");
  opened.push(this);
  let firstCard = opened[0];
  let secondCard = this;
  compareCards(firstCard, secondCard);
  gameWon();
  checkClickStatus();
  })
}

// compares open cards
function compareCards(firstCard, secondCard) {
  if (opened.length === 2) {
    countMoves();
    if (secondCard.innerHTML === firstCard.innerHTML) {
      firstCard.classList.add("match");
      secondCard.classList.add("match");
      matched.push(firstCard);
      matched.push(secondCard);
      opened = [];
    } else {
      opened = [];
      setTimeout(function(){
      firstCard.classList.remove("open", "show");
      secondCard.classList.remove("open", "show");
    }, 1000);
    }
  }
};
// updates move counter
function countMoves() {
  moves++;
  moveCounter.innerHTML = moves;
  changeStars();
}

// clears current deck of cards
function clearDeck() {
  deck.innerHTML = "";
}

// assigns stars according to number of moves
function changeStars() {
  if (moves === 12) {
    starPanel.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if (moves === 20) {
    starPanel.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

// resets stars
function resetStarPanel() {
  starPanel.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
}

// links timer with the first time a card is clicked
function checkClickStatus() {
  if (firstClick === false) {
    firstClick = true;
    countTime();
  }
}

// restarts a game
function restartGame() {
  closeModal();
  clearDeck();
  startGame();
  stopTime();
  resetStarPanel();
  opened = [];
  matched = [];
  seconds = 0;
  timer.innerHTML = 0;
  moves = 0;
  moveCounter.innerHTML = 0;
  firstClick = false;
}

// shows modal box
 function showModal() {
   modal.classList.add("show-modal");

   let stars = document.querySelector(".stars").innerHTML;

   document.querySelector("#time-score").innerHTML = seconds;
   document.querySelector("#move-score").innerHTML = moves;
   document.querySelector("#star-score").innerHTML = stars;

 }

// closes modal box
function closeModal() {
  modal.classList.remove("show-modal");
}

 // pops up after the game is won
 function gameWon() {
   if (matched.length === 16) {
     setTimeout(function(){
       stopTime();
       showModal();
     }, 50);
   }
 }

// shuffles cards
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Event listeners
// event listener on restart button
  restartButton.addEventListener("click", restartGame);

// event listeners for the modal box
// event listener on the "close" sign
modalEsc.addEventListener("click", closeModal);

// event listener on the "play again" button
newGame.addEventListener("click", restartGame);

// makes modal box disappear when the space outside it is clicked
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}
