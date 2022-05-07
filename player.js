import { 
    dealCards,
    getCardValue,
    addCard,
    setCard} from "./card.js";
import { 
    getHandValue} from "./calc.js";

let playerHand = []
let pickedCard

export function playerTurn() {
    createPlayerCards()
}
export function getPlayerScore (){
    return getHandValue(playerHand)
}
function createPlayerCards() {
    const numCards = document.querySelectorAll('[id=playerCard]').length
    console.log(numCards)

    pickedCard = dealCards()
    playerHand.push(getCardValue(pickedCard))

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
    frontCard.title = pickedCard.replaceAll("_", " ")
    setCard(cardDiv, numCards)
    addCard(cardDiv)

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
}