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
    startScreenElem.classList.toggle("hide")
    scoreElem.classList.toggle("hide")
    hitButtonElem.classList.toggle("hide")
    stayButtonElem.classList.toggle("hide")
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
    flipNew()
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
    restartButtonElem.classList.toggle("hide")
    quitButtonElem.classList.toggle("hide")
    hitButtonElem.classList.toggle("show")
    stayButtonElem.classList.toggle("show")
}
function handleQuit(){
    location.reload(); 
}
function handleRestart(){
    setButtons()
    resetHand()
    clearDiv()
    initialDeal()
    updatePlayerScore()
    flipDealerFaceDown = document.querySelector("#faceDown")
    flipNew()
}
function handleStay(){
    disableHitStay()
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
    enableHitStay()
    restartButtonElem.classList.add("hide")
    restartButtonElem.classList.remove("show")
    quitButtonElem.classList.add("hide")
    quitButtonElem.classList.remove("show")
}
function clearDiv() {
    const divs = document.querySelectorAll('[id=dealerCard]','[id=playerCard]')
    divs.forEach(element => element.remove());
}
function initialDeal() {
    shuffleCards()
    playerTurn()
    dealerTurn()
    playerTurn()
    dealerTurn()
    flipNew()
}
function disableHitStay() {
    document.getElementById('hit').removeEventListener("click", handleHit);
    document.getElementById('stay').removeEventListener("click", handleStay);  
}
function enableHitStay() {
    document.getElementById('hit').addEventListener("click", handleHit);
    document.getElementById('stay').addEventListener("click", handleStay);
}