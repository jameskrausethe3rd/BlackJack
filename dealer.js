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
    let flipAnim

export function dealerTurn() {
    createDealerCards()
}
export function getDealerScore (){
    return getHandValue(dealerHand)
}
function createDealerCards() {
    const numCards = document.querySelectorAll('[id=card]').length
    console.log(numCards)

    pickedCard = dealCards()
    dealerHand.push(getCardValue(pickedCard))

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
    
    cardDiv.setAttribute('id', "card")
    
    if (numCards == 0) {
        cardDiv.classList.add("dealerFaceDown")
        cardDivFlipCont.setAttribute('id', "faceDown")
        frontCard.src = "imgs/card.png" 
        backCard.src = "imgs/cards/" + pickedCard + ".png"


        
        faceDown = "imgs/cards/" + pickedCard + ".png"
        addCard(cardDiv)
    } else{
        cardDiv.classList.add("dealerCard")
        cardDivFlipCont.setAttribute('id', "faceUp")
        frontCard.src = "imgs/card.png" 
        backCard.src = "imgs/cards/" + pickedCard + ".png"
        frontCard.title = pickedCard.replaceAll("_", " ")

        setCard(cardDiv, numCards)
        addCard(cardDiv)

    }
    cardDiv.appendChild(cardDivFlipCont)
    cardDivFlipCont.appendChild(cardDivflipper)
    cardDivflipper.appendChild(cardFront)
    cardFront.appendChild(frontCard)
    cardDivflipper.appendChild(cardBack)
    cardBack.appendChild(backCard)
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
    return
}