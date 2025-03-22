// Game Variables
let timer = 0;
let guesses = 0;
let totalMatches = 0;
let nIntervId = null;
const timeDisplay = document.getElementById("timeDisplay");
const guessesDisplay = document.getElementById("guessesDisplay");
const restartBtn = document.getElementById("restartBtn");

const gameBoard = document.getElementById("gameBoard");

// Reset Confirmation Modal Elements
const matchingGameResetModal = document.getElementById("matchingGameResetModal");
const confirmMatchingGameResetButton = document.getElementById("confirmMatchingGameReset");
const cancelMatchingGameResetButton = document.getElementById("cancelMatchingGameReset");

// Tie Symbols (Matching Pairs)
const tileSymbols = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥑", "🥕", "🍉"];
let tiles = [...tileSymbols, ...tileSymbols]; // Duplicate for pairs

// Shufle Tiles
function shuffleTiles() {
    tiles.sort(() => Math.random() - 0.5);
}

// Render Tile on Game Board
function renderTiles() {
    gameBoard.innerHTML = "";
    shuffleTiles();

    tiles.forEach((symbol, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.symbol = symbol;
        tile.dataset.index = index;
        tile.textContent = "❔"; 
        tile.addEventListener("click", handleTileClick);
        gameBoard.appendChild(tile);
    });
}

// Start Timer Function
function startTimer() {
    if (!nIntervId) {
        nIntervId = setInterval(() => {
            timer++;
            timeDisplay.textContent = timer;
        }, 1000);
    }
}

// Handle Tile Click
let flippedTiles = [];
function handleTileClick(event) {
    const tile = event.target;
    if (tile.classList.contains("matched") || flippedTiles.length === 2) return;

    tile.textContent = tile.dataset.symbol; 
    flippedTiles.push(tile);

    if (flippedTiles.length === 2) {
        guesses++;
        guessesDisplay.textContent = guesses;
        checkMatch();
    }

    startTimer(); 
}

// Check for Match
function checkMatch() {
    const [tile1, tile2] = flippedTiles;
    if (tile1.dataset.symbol === tile2.dataset.symbol) {
        totalMatches++;
        console.log(totalMatches);
        tile1.classList.add("matched");
        tile2.classList.add("matched");
        
        if (totalMatches === 8) {
            rpsWinMessage.textContent = "🎉 You won the game!";
            rpsWinModal.style.display = "flex"; // Show modal pop-up
        }
    } else {
        setTimeout(() => {
            tile1.textContent = "❔";
            tile2.textContent = "❔";
        }, 800);
    }
    flippedTiles = [];
}

// Reset Game Function
function resetMatchingGame() {
    clearInterval(nIntervId);
    nIntervId = null;
    timer = 0;
    totalMatches = 0;
    timeDisplay.textContent = 0;
    guesses = 0;
    guessesDisplay.textContent = guesses;

    // Reset board
    renderTiles();

    // Hide Reset Modal
    matchingGameResetModal.style.display = "none";
    // Hide both modals when the game resets
    rpsWinModal.style.display = "none";
    rpsResetModal.style.display = "none";
}

// Show Reset Confirmation Modal
restartBtn.addEventListener("click", () => {
    matchingGameResetModal.style.display = "flex"; // Show modal
});

// Confirm Reset
confirmMatchingGameResetButton.addEventListener("click", resetMatchingGame);

// Cancel Reset
cancelMatchingGameResetButton.addEventListener("click", () => {
    matchingGameResetModal.style.display = "none"; // Hide modal
});

// Navigate back to the home page
function goHome() {
    window.location.href = "../index.html"; 
}

// Initialize Game on Load
renderTiles();
startTimer();
// Home button and modal elements
const homeButton = document.getElementById("homeButton");
const homeConfirmModal = document.getElementById("homeConfirmModal");
const confirmHome = document.getElementById("confirmHome");
const cancelHome = document.getElementById("cancelHome");

// Show confirmation modal when home button is clicked
homeButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent immediate navigation
    homeConfirmModal.style.display = "flex";
});

// If user confirms, go to homepage
confirmHome.addEventListener("click", function () {
    window.location.href = "../index.html"; // Adjusted path for mini-games
});

// If user cancels, hide the modal
cancelHome.addEventListener("click", function () {
    homeConfirmModal.style.display = "none";
});