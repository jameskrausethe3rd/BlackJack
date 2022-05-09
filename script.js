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
import {
    setChips,
    getChips,
    setBet,
    addChips} from "./chips.js"
import { getCookie, setCookie } from "./cookies.js";

document.getElementById('start').addEventListener("click", declareBet);
document.getElementById('play').addEventListener("click", handleStart);
document.getElementById('hit').addEventListener("click", handleHit);
document.getElementById('stay').addEventListener("click", handleStay);
document.getElementById('quit').addEventListener("click", handleQuit);
document.getElementById('restart').addEventListener("click", handleRestart);
document.getElementById('bet1').addEventListener("click", () => bet(1));
document.getElementById('bet10').addEventListener("click", () => bet(10));
document.getElementById('bet50').addEventListener("click", () => bet(50));
document.getElementById('bet100').addEventListener("click", () => bet(100));


const scoreElem = document.querySelector('[data-score]')
const deckElem = document.querySelector('[data-deck]')
const wagerElem = document.querySelector('[data-wager]')
const chipsElem = document.querySelector('[data-chips]')
const betsElem = document.querySelector('[data-bets-button]')
const startScreenElem = document.querySelector('[data-start-button]')
const playButtonElem = document.querySelector('[data-play-button]')
const hitButtonElem = document.querySelector('[data-hit-button]')
const stayButtonElem = document.querySelector('[data-stay-button]')
const restartButtonElem = document.querySelector('[data-restart-button]')
const quitButtonElem = document.querySelector('[data-quit-button]')
const modalHeaderElem = document.querySelector('[data-header]')
const modalBodyElem = document.querySelector('[data-body]')
const modalFooterElem = document.querySelector('[data-footer]')

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






let flipDealerFaceDown
let totalBet

function handleStart() {
    gameScreen()
    initialDeal()
    updatePlayerScore()
    updatePlayerChips()
    flipDealerFaceDown = document.querySelector("#faceDown")
    flipNew()
}
function winnings (outcome) {
    console.log(totalBet)
    if (outcome == "win"){
        addChips(totalBet*2)
    } else if (outcome == "lose") {
        return
    } else if (outcome == "wash") {
        addChips(totalBet)
    }

}
function declareBet() {
    firstTimeUser()
    totalBet = 0
    updatePlayerChips()
    updatePlayerWager()
    betScreen()
}
function bet(bet) {
    if (getChips() < bet) {
        alert("Not enough chips")
    } else {
        totalBet = bet + totalBet
        setBet(bet)
        updatePlayerChips()
        updatePlayerWager()
    }
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
function updatePlayerChips(){
    chipsElem.textContent = getChips()
}
function updatePlayerWager() {
    wagerElem.textContent = totalBet
}
function handleLost() {
    if (flipDealerFaceDown != null) {
        flipFaceDown()
    }
    setTimeout(function() {
        displayModal("Loser!", "You lost!")
        endGameScreen()
        winnings("lose")
        updatePlayerChips()
      }, 2000);
}
function handleWin() {
    setTimeout(function() {
        displayModal("Winner!", "You are a winner!")
        endGameScreen()
        winnings("win")
        updatePlayerChips()
      }, 2000);
}
function handleWash() {
    setTimeout(function() {
        displayModal("Wash", "Game was a wash")
        endGameScreen()
        winnings("wash")
        updatePlayerChips()
      }, 2000);
}
function handleQuit(){
    location.reload(); 
}
function handleRestart(){
    enableHitStay()
    betScreen()
    resetHand()
    clearDiv()
    resetWagers()
    updatePlayerChips()
    updatePlayerWager()
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
function gameScreen() {
    scoreElem.classList.remove("hide")
    deckElem.classList.remove("hide")
    wagerElem.classList.remove("hide")
    chipsElem.classList.remove("hide")
    betsElem.classList.add("hide")
    startScreenElem.classList.add("hide")
    playButtonElem.classList.add("hide")
    hitButtonElem.classList.remove("hide")
    stayButtonElem.classList.remove("hide")
    restartButtonElem.classList.add("hide")
    quitButtonElem .classList.add("hide")
}
function betScreen() {
    scoreElem.classList.add("hide")
    deckElem.classList.add("hide")
    wagerElem.classList.remove("hide")
    chipsElem.classList.remove("hide")
    betsElem.classList.remove("hide")
    startScreenElem.classList.add("hide")
    playButtonElem.classList.remove("hide")
    hitButtonElem.classList.add("hide")
    stayButtonElem.classList.add("hide")
    restartButtonElem.classList.add("hide")
    quitButtonElem .classList.add("hide")
}
function endGameScreen() {
    scoreElem.classList.remove("hide")
    deckElem.classList.remove("hide")
    wagerElem.classList.remove("hide")
    chipsElem.classList.remove("hide")
    betsElem.classList.add("hide")
    startScreenElem.classList.add("hide")
    playButtonElem.classList.add("hide")
    hitButtonElem.classList.add("hide")
    stayButtonElem.classList.add("hide")
    restartButtonElem.classList.remove("hide")
    quitButtonElem .classList.remove("hide")
    updatePlayerChips()
    updatePlayerWager()
}
function resetWagers() {
    totalBet = 0
}
function displayModal(head, body) {
    modalHeaderElem.textContent = head
    modalBodyElem.textContent = body
    modal.style.display = "block";
}
function firstTimeUser() {
    if (getCookie("newUser") == "true") {
        console.log("Returning visitor")
        return
    } else{
        setCookie("newUser", "true")
        displayModal("You're a new user!", "You have a starting bank of 1000")
        setChips(1000)
    }  
}