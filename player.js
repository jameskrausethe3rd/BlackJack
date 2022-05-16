import { 
    dealCards,
    getCardValue,
    addCard,
    setCard} from "./card.js";
import { 
    getHandValue} from "./calc.js";
import { getCookie, setCookie } from "./cookies.js";

let playerHand = []
let playerCards = []
let pickedCard

export function playerTurn() {
    createPlayerCards()
}
export function getPlayerScore (){
    return getHandValue(playerHand)
}
function createPlayerCards() {
    const numCards = document.querySelectorAll('[id=playerCard]').length
    const playerHandDiv = document.getElementById("playerHand")

    pickedCard = dealCards()
    playerHand.push(getCardValue(pickedCard))
    playerCards.push(pickedCard)
    
    const backCard = document.createElement("img")
    const frontCard = document.createElement("img")
    const cardDiv = document.createElement("div")
    const cardDivFlipCont = document.createElement("div")
    const cardDivflipper = document.createElement("div")
    const cardFront = document.createElement("div")
    const cardBack = document.createElement("div")

    cardDivFlipCont.classList.add("flip-container")
    cardDivflipper.classList.add("flipper")
    cardFront.classList.add("front")
    cardBack.classList.add("back")
    cardDiv.setAttribute('id', "playerCard")
    cardDiv.classList.add("playerCard")
    cardDivFlipCont.setAttribute('id', "faceUp")
    frontCard.src = "imgs/card.png" 
    backCard.src = "imgs/cards/" + pickedCard + ".png"
    backCard.classList.add("cardHolder")
    frontCard.title = pickedCard.replaceAll("_", " ")
    setCard(cardDiv, numCards)
    addCard(cardDiv)

    playerHandDiv.appendChild(cardDiv)
    cardDiv.appendChild(cardDivFlipCont)
    cardDivFlipCont.appendChild(cardDivflipper)
    cardDivflipper.appendChild(cardFront)
    cardFront.appendChild(frontCard)
    cardDivflipper.appendChild(cardBack)
    cardBack.appendChild(backCard)
    getHandValue(playerHand)
}
export function resetPlayerHand() {
    playerHand = []
    playerCards = []
}
export function getWins() {
    return parseInt(getCookie("wins"))
}
export function getLoss(){
    return parseInt(getCookie("loss"))
}
export function getWash(){
    return parseInt(getCookie("wash"))
}
export function getCurrStreak(){
    return parseInt(getCookie("currStreak"))
}
export function getHighStreak(){
    return parseInt(getCookie("highestStreak"))
}
export function getHighWin(){
    return parseInt(getCookie("highestWin"))
}
export function newUserCookies() {
    setCookie("wins", 0)
    setCookie("loss", 0)
    setCookie("wash", 0)
    setCookie("currStreak", 0)
    setCookie("highestStreak", 0)
    setCookie("highestWin", 0)
    setCookie("returningUser", "true")
    setCookie("chip", 1000)
}
export function getPlayerCards() {
    return playerCards;
}