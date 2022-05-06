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
    const numCards = document.querySelectorAll('[id=card]').length
    console.log(numCards)

    pickedCard = dealCards()
    dealerHand.push(getCardValue(pickedCard))

    if (numCards == 0) {
        const backCard = document.createElement("img")
        const frontCard = document.createElement("img")
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("dealerCardDiv")
        cardDiv.setAttribute('id', "card")
        const cardDivFlipCont = document.createElement("div")
        cardDivFlipCont.classList.add("flip-container")
        cardDivFlipCont.setAttribute('id', "flipCard")
        const cardDivflipper = document.createElement("div")
        cardDivflipper.classList.add("flipper")
        const cardFront = document.createElement("div")
        cardFront.classList.add("front")
        const cardBack = document.createElement("div")
        cardBack.classList.add("back")

        frontCard.src = "imgs/card.png" 
        backCard.src = "imgs/cards/" + pickedCard + ".png"

        cardDiv.appendChild(cardDivFlipCont)
        cardDivFlipCont.appendChild(cardDivflipper)
        cardDivflipper.appendChild(cardFront)
        cardFront.appendChild(frontCard)
        cardDivflipper.appendChild(cardBack)
        cardBack.appendChild(backCard)
        
        

        faceDown = "imgs/cards/" + pickedCard + ".png"
        addCard(cardDiv)
    } else{
        const card = document.createElement("img")
        card.src = "imgs/cards/" + pickedCard + ".png"
        card.title = pickedCard.replaceAll("_", " ")
        card.classList.add("dealerCard")
        card.setAttribute('id',"card")
        setCard(card, numCards)
        addCard(card)
    }
    
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