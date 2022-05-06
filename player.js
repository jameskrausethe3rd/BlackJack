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
    const numCards = document.getElementsByClassName("playerCard").length

    const card = document.createElement("img")
    card.dataset.card = true

    pickedCard = dealCards()
    playerHand.push(getCardValue(pickedCard))

    card.src = "imgs/cards/" + pickedCard + ".png"
    card.title = pickedCard.replaceAll("_", " ")
    card.classList.add("playerCard")
    setCard(card, numCards)
    addCard(card)
    getHandValue(playerHand)
}
export function resetPlayerHand() {
    playerHand = []
}