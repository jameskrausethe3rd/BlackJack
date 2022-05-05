import { 
    dealCards,
    getCardValue,
    addCard,
    setCard} from "./card.js";
import { 
    getHandValue,
    checkLost,
    compareHand} from "./calc.js";
import { getPlayerScore } from "./player.js";

    let dealerHand = []
    let faceDown = ""
    let pickedCard

export function dealerTurn() {
    createDealerCards()
}
export function getDealerScore (){
    return getHandValue(dealerHand)
}
function createDealerCards() {
    const numCards = document.getElementsByClassName("dealerCard").length
    const card = document.createElement("img")

    card.dataset.card = true
    pickedCard = dealCards()
    dealerHand.push(getCardValue(pickedCard))

    if (numCards == 0) {
        card.src = "imgs/card.png" 
        faceDown = "imgs/cards/" + pickedCard + ".png"
    } else{
        card.src = "imgs/cards/" + pickedCard + ".png"
    }

    card.classList.add("dealerCard")
    setCard(card, numCards)
    addCard(card)
    getHandValue(dealerHand)
}
export function dealerPlay() {
    while (getDealerScore() < 17){
        dealerTurn()
    } 
    if (getDealerScore() >= 17) {
        if (checkLost(getDealerScore())) return 1;
        else{
            return compareHand(getPlayerScore(), getDealerScore())
        }
    }

}
export function resetDealerHand() {
    dealerHand = []
}
export function flipCard() {
    document.querySelector('.dealerCard').src = faceDown;
}