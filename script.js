import { 
    shuffleCards,
    resetHand} from "./card.js";
import { 
    playerTurn,
    getPlayerScore} from "./player.js";
import {
    dealerTurn,
    dealerPlay} from "./dealer.js"
import {
    checkLost} from "./calc.js"

document.getElementById('start').addEventListener("click", handleStart);
document.getElementById('hit').addEventListener("click", handleHit);
document.getElementById('stay').addEventListener("click", handleStay);
document.getElementById('quit').addEventListener("click", handleQuit);
document.getElementById('restart').addEventListener("click", handleRestart);

const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-button]')
const hitButtonElem = document.querySelector('[data-hit-button]')
const stayButtonElem = document.querySelector('[data-stay-button]')
const restartButtonElem = document.querySelector('[data-restart-button]')
const quitButtonElem = document.querySelector('[data-quit-button]')

let flipDealerFaceDown

function handleStart() {
    startScreenElem.classList.add("hide")
    scoreElem.classList.add("show")
    scoreElem.classList.remove("hide")
    hitButtonElem.classList.add("show")
    hitButtonElem.classList.remove("hide")
    stayButtonElem.classList.add("show")
    stayButtonElem.classList.remove("hide")
    initialDeal()
    updatePlayerScore()
    flipDealerFaceDown = document.querySelector("#faceDown")
    flipNew()
}
function flipNew() {
    setTimeout(function() {
        var flipAnim = document.querySelectorAll("#faceUp")
        flipAnim.forEach((flipAnim) => {
            flipAnim.classList.toggle("flip")
            flipAnim.setAttribute("id", "flipped")
        })
    }, 500)
}
function flipFaceDown() {
    setTimeout(function() {
        flipDealerFaceDown.classList.toggle("flip")
        }, 500)
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
    if (flipDealerFaceDown != null) {
        flipFaceDown()
    }
    setTimeout(function() {
        alert("You lose")
        endGameScreen()
      }, 2000);
}
function handleWin() {
    setTimeout(function() {
        alert("You win")
        endGameScreen()
      }, 2000);
}
function handleWash() {
    setTimeout(function() {
        alert("Wash")
        endGameScreen()
      }, 2000);
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
    location.reload(); 
}
function handleRestart(){
    setButtons()
    resetHand()
    clearDiv()
    handleStart()
}
function handleStay(){
    flipFaceDown()
    
    setTimeout(function(){
        const win = dealerPlay()
        flipNew()
        switch (win) {
            case 0:
                flipDealerFaceDown = null
                handleLost()
                break;
            case 1:
                handleWin()
                break;
            case 2:
                handleWash()
                break;
        }
    },1000)
}
function setButtons() {
    restartButtonElem.classList.add("hide")
    restartButtonElem.classList.remove("show")
    quitButtonElem.classList.add("hide")
    quitButtonElem.classList.remove("show")
}
function clearDiv() {
    const divs = document.querySelectorAll('[id=card]')
    divs.forEach(element => element.remove());

}
function initialDeal() {
    shuffleCards()
    playerTurn()
    dealerTurn()
    playerTurn()
    dealerTurn()
}