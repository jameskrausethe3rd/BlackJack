import { 
    playerTurn,
    dealerTurn,
    shuffleCards,
    getPlayerScore,
    resetHand,
    dealerPlay,
    checkLost} from "./card.js";

document.getElementById('start').addEventListener("click", handleStart);
document.getElementById('hit').addEventListener("click", handleHit);
document.getElementById('stay').addEventListener("click", handleStay);
document.getElementById('quit').addEventListener("click", handleQuit);
document.getElementById('restart').addEventListener("click", handleRestart);

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 55

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-button]')
const hitButtonElem = document.querySelector('[data-hit-button]')
const stayButtonElem = document.querySelector('[data-stay-button]')
const restartButtonElem = document.querySelector('[data-restart-button]')
const quitButtonElem = document.querySelector('[data-quit-button]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH/WORLD_HEIGHT)
    {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
}

function handleStart() {
    startScreenElem.classList.add("hide")
    hitButtonElem.classList.add("show")
    hitButtonElem.classList.remove("hide")
    stayButtonElem.classList.add("show")
    stayButtonElem.classList.remove("hide")
    shuffleCards()
    playerTurn()
    dealerTurn()
    playerTurn()
    dealerTurn()
    updatePlayerScore()
}

function handleHit(){
    playerTurn()
    updatePlayerScore()
}
function updatePlayerScore(){
    scoreElem.textContent = getPlayerScore()
    if (checkLost(getPlayerScore())) return handleLost()
}
function handleLost() {
    alert("You lose")
    endGameScreen()
}
function handleWin() {
    alert("You win")
    endGameScreen()
}
function endGameScreen() {
    restartButtonElem.classList.add("show")
    restartButtonElem.classList.remove("hide")
    quitButtonElem.classList.add("show")
    quitButtonElem.classList.remove("hide")
}
function handleQuit(){
    console.log("Quit!")
}
function handleRestart(){
    console.log("Restart!")
    setButtons()
    resetHand()
    handleStart()
}
function handleStay(){
    console.log("Stay!")
    if (dealerPlay()) return handleWin()
    else return handleLost()

}
function setButtons() {
    restartButtonElem.classList.add("hide")
    restartButtonElem.classList.remove("show")
    quitButtonElem.classList.add("hide")
    quitButtonElem.classList.remove("show")
}