import { 
    shuffleCards,
    resetHand} from "./card.js";
import { 
    playerTurn,
    getPlayerScore,
    newUserCookies,
    getWins,
    getLoss,
    getWash,
    getCurrStreak,
    getHighStreak,
    getHighWin} from "./player.js";
import {
    dealerTurn,
    dealerPlay,
    getFaceDown} from "./dealer.js"
import {
    checkLost} from "./calc.js"
import {
    setChips,
    getChips,
    getChipsVar,
    setBet,
    addChips,
    saveChip,
    setBetAll} from "./chips.js"
import { 
    getCookie,
    setCookie } from "./cookies.js";

document.getElementById('start').addEventListener("click", declareBet);
document.getElementById('play').addEventListener("click", handleStart);
document.getElementById('hit').addEventListener("click", handleHit);
document.getElementById('stay').addEventListener("click", handleStay);
document.getElementById('quit').addEventListener("click", handleQuit);
document.getElementById('dataDrop').addEventListener("click", displayStats);
document.getElementById('restart').addEventListener("click", handleRestart);
document.getElementById('bet1').addEventListener("click", () => playBet(1));
document.getElementById('bet10').addEventListener("click", () => playBet(10));
document.getElementById('bet50').addEventListener("click", () => playBet(50));
document.getElementById('bet100').addEventListener("click", () => playBet(100));
document.getElementById('betAll').addEventListener("click", () => playBet("all"));
document.getElementById("resetBet").addEventListener("click", () => resetCurrentBet())
document.getElementById("resetuserstats").addEventListener("click", () => resetUserStats())

const deckElem = document.querySelector('[data-deck]')

const scoreElem = document.querySelector('[data-score]')
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
const numBoardElem = document.querySelector('[data-num-board]')

const statsElem = document.getElementById('dataDrop')

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const statsWin = document.querySelector("[data-stats-win]")
const statsLoss = document.querySelector("[data-stats-loss]")
const statsWash = document.querySelector("[data-stats-wash]")
const statsStreak = document.querySelector("[data-stats-currstreak]")
const statsHighStreak = document.querySelector("[data-stats-highstreak]")
const statsHighWin = document.querySelector("[data-stats-highwin]")

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } if (event.target != statsElem) {
      document.querySelector('[data-drop-down]').classList.add("hide")
      document.getElementById("dataDrop").classList.remove("btnRadius")
  }
}
window.onload = function() {
    firstTimeUser()
    updateDisplayedStats()
}

let flipDealerFaceDown
let totalBet

function declareBet() {
    firstTimeUser()
    setChips(getChips())
    totalBet = 0
    updateCurrentChips()
    updateCurrentWager()
    updateDisplayedStats()
    betScreen()
}
function firstTimeUser() {
    if (getCookie("returningUser") != "true") {
        newUserCookies()
        displayModal("You're a new user!", "You have a starting bank of 1000")
    }
}
function updateCurrentChips(){
    chipsElem.textContent = "Bank: " + getChipsVar()
}
function updateCurrentWager() {
    wagerElem.textContent = "Wager: " + totalBet
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
    numBoardElem.classList.remove("hide")
}
function handleStart() {
    gameScreen()
    initialDeal()
    updatePlayerScore()
    updateCurrentChips()
    flipDealerFaceDown = document.querySelector("#faceDown")
    flipNewCard()
}
function playBet(bet) {
    if (bet == "all") {
        var c = getChips()
        totalBet = c
        setBetAll(c)
    } else{
        if (getChips() < bet) {
            alert("Not enough chips")
        } else {
            totalBet = bet + totalBet
            setBet(bet)
        }
    }
    updateCurrentChips()
    updateCurrentWager()
}
function flipNewCard() {
    setTimeout(function() {
        var flipAnim = document.querySelectorAll("#faceUp")
        flipAnim.forEach((flipAnim) => {
            flipAnim.classList.toggle("flip")
            flipAnim.setAttribute("id", "flipped")
        })
    }, 500)
}
function flipDealerCard() {
    let face = document.getElementById("faceDown").firstElementChild.lastElementChild.firstElementChild
    face.src = getFaceDown()
    setTimeout(function() {
        flipDealerFaceDown.classList.toggle("flip")
        }, 500)
}
function handleHit(){
    playerTurn()
    updatePlayerScore()
    flipNewCard()
}
function updatePlayerScore(){
    scoreElem.textContent = "Score: " + getPlayerScore()
    if (checkLost(getPlayerScore())) return handleLost()
}
function handleLost() {
    if (flipDealerFaceDown) {
        flipDealerCard()
    }
    setTimeout(function() {
        displayModal("Loser!", "You lost!")
        endGameScreen()
        updateCurrentChips()
      }, 2000);
      saveChip()
      updateSavedStats("loss")
      updateDisplayedStats()
}
function handleWin() {
    setTimeout(function() {
        displayModal("Winner!", "You are a winner!")
        endGameScreen()
        addChips(totalBet*2)
        updateCurrentChips()
        saveChip()
        updateSavedStats("win")
        updateDisplayedStats()
      }, 2000);
}
function handleWash() {
    setTimeout(function() {
        displayModal("Wash", "Game was a wash")
        endGameScreen()
        addChips(totalBet)
        updateCurrentChips()
        saveChip()
        updateSavedStats("wash")
        updateDisplayedStats()
      }, 2000);
}
function handleQuit(){
    location.reload(); 
}
function handleRestart(){
    enableHitStay()
    betScreen()
    resetHand()
    clearCardDiv()
    resetTotalBet()
    updateCurrentChips()
    updateCurrentWager()
    saveChip()
}
function handleStay(){
    disableHitStay()
    flipDealerCard()
    
    setTimeout(function(){
        const win = dealerPlay()
        flipNewCard()
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
function clearCardDiv() {
    const divs = document.querySelectorAll('[id=dealerCard]','[id=playerCard]')
    divs.forEach(element => element.remove());
}
function initialDeal() {
    shuffleCards()
    playerTurn()
    dealerTurn()
    playerTurn()
    dealerTurn()
    flipNewCard()
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
    updateCurrentChips()
    updateCurrentWager()
    updateDisplayedStats()
}
function resetTotalBet() {
    totalBet = 0
}
function displayModal(head, body) {
    modalHeaderElem.textContent = head
    modalBodyElem.textContent = body
    modal.style.display = "block";
}
function updateSavedStats (outcome) {
    var totalWins = getWins()
    var totalLoss = getLoss()
    var totalWash = getWash()
    var currStreak = getCurrStreak()
    var highestStreak = getHighStreak()
    var highestWin = getHighWin()

    if (outcome == "win"){
        console.log("setting wins")
        setCookie("wins", totalWins + 1)
        setCookie("currStreak", currStreak + 1)

        if (getCurrStreak() > highestStreak) {
            setCookie("highestStreak", getCurrStreak())
        }

        if(totalBet*2 > highestWin) {
            setCookie("highestWin", totalBet*2)
        }
    } else if (outcome == "wash") {
        setCookie("wash", totalWash + 1)
    } else if (outcome == "loss") {
        setCookie("loss", totalLoss + 1)
        setCookie("currStreak", 0)
    }
}
function updateDisplayedStats() {
    statsWin.textContent = "Wins: " + getWins()
    statsLoss.textContent = "Losses: " + getLoss()
    statsWash.textContent = "Washes: " + getWash()
    statsStreak.textContent = "Current Streak: " + getCurrStreak()
    statsHighStreak.textContent = "Max Streak: " + getHighStreak()
    statsHighWin.textContent = "Max won: " + getHighWin()
}
function displayStats () {
    document.querySelector('[data-drop-down]').classList.toggle("hide")
    document.getElementById("dataDrop").classList.toggle("btnRadius")
}
function resetCurrentBet() {
    totalBet = 0
    setChips(getChips())
    updateCurrentChips()
    updateCurrentWager()
}
function resetUserStats() {
    newUserCookies()
    updateDisplayedStats()
}