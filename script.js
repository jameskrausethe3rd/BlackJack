import { 
    shuffleCards,
    resetHand} from "./card.js";
import { 
    playerTurn,
    getPlayerScore} from "./player.js";
import {
    dealerTurn,
    dealerPlay,
    flipCard} from "./dealer.js"
import {
    checkLost} from "./calc.js"

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
    flipCard()
    alert("You lose")
    endGameScreen()
}
function handleWin() {
    flipCard()
    endGameScreen()
    alert("You win")
}
function handleWash() {
    flipCard()
    alert("Wash")
    endGameScreen()
}
function endGameScreen() {
    restartButtonElem.classList.add("show")
    restartButtonElem.classList.remove("hide")
    quitButtonElem.classList.add("show")
    quitButtonElem.classList.remove("hide")
    hitButtonElem.classList.add("hide")
    hitButtonElem.classList.remove("show")
    stayButtonElem.classList.add("hide")
    stayButtonElem.classList.remove("show")
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
    flipCard()

    const win = dealerPlay()
    switch (win) {
        case 0:
            handleLost()
            break;
        case 1:
            handleWin()
            break;
        case 2:
            handleWash()
            break;
    }


}
function setButtons() {
    restartButtonElem.classList.add("hide")
    restartButtonElem.classList.remove("show")
    quitButtonElem.classList.add("hide")
    quitButtonElem.classList.remove("show")
}