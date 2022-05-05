const worldElem = document.querySelector("[data-world]")

var cards = generateDeck();

import { 
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty } from "./updateCustomProperty.js"

let pickedCard
let playerHand = []
let dealerHand = []

function dealCards() {
    return cards.pop()
}
export function playerTurn() {
    createPlayerCards()
}
export function dealerTurn() {
    createDealerCards()
}
function createPlayerCards() {
    const numCards = document.getElementsByClassName("playerCard").length
    const card = document.createElement("img")

    card.dataset.card = true

    pickedCard = dealCards()
    playerHand.push(getCardValue(pickedCard))

    card.src = "imgs/cards/" + pickedCard + ".png"
    card.classList.add("playerCard")
    setCustomProperty(card, "--left", 50 - numCards*2)
    worldElem.append(card)
    getHandValue(playerHand)
}
function createDealerCards() {
    const numCards = document.getElementsByClassName("dealerCard").length
    const card = document.createElement("img")
    card.dataset.card = true
    pickedCard = dealCards()
    dealerHand.push(getCardValue(pickedCard))

    if (numCards == 0) {
        card.src = "imgs/card.png" 
    } else{
        card.src = "imgs/cards/" + pickedCard + ".png"
    }

    card.classList.add("dealerCard")
    setCustomProperty(card, "--left", 50 - numCards*2)
    worldElem.append(card)
    getHandValue(dealerHand)
    //console.log(dealerHand)
}

export function shuffleCards() {
    for (let i =0; i<1000; i++)
    {
        let cardidx1 = Math.floor((Math.random() * cards.length));
        let cardidx2 = Math.floor((Math.random() * cards.length));
        let t = cards[cardidx1];

        cards[cardidx1] = cards[cardidx2];
        cards[cardidx2] = t;
    }
}
function getCardValue(card) {
    var str = card.split("_")[0];
    var parsed = parseInt(str,10)

    if (isNaN(parsed)){
        switch (str) {
            case "ace":
                parsed = 11;
                break;
            case "jack":
                parsed = 10;
                break;
            case "queen":
                parsed = 10;
                break;
            case "king":
                parsed = 10;
                break;
        }
    } 
    return parsed;
}
function getHandValue(hand) {
    var total = 0

    for (let i = 0; i<hand.length; i++){
        total += hand[i]
    }
    if (total > 21 && hand.includes(11)) {
        total = total - 10
    }
    return total;
}
export function getPlayerScore (){
    return getHandValue(playerHand)
}
export function getDealerScore (){
    return getHandValue(dealerHand)
}
export function resetHand() {
    playerHand = []
    dealerHand = []
    cards = generateDeck()
    document.querySelectorAll('.playerCard').forEach(card => {
        card.remove()
    })
    document.querySelectorAll('.dealerCard').forEach(card => {
        card.remove()
    })
}
function generateDeck() {
    return [
        "10_of_clubs",
        "10_of_diamonds",
        "10_of_hearts",
        "10_of_spades",
        "2_of_clubs",
        "2_of_diamonds",
        "2_of_hearts",
        "2_of_spades",
        "3_of_clubs",
        "3_of_diamonds",
        "3_of_hearts",
        "3_of_spades",
        "4_of_clubs",
        "4_of_diamonds",
        "4_of_hearts",
        "4_of_spades",
        "5_of_clubs",
        "5_of_diamonds",
        "5_of_hearts",
        "5_of_spades",
        "6_of_clubs",
        "6_of_diamonds",
        "6_of_hearts",
        "6_of_spades",
        "7_of_clubs",
        "7_of_diamonds",
        "7_of_hearts",
        "7_of_spades",
        "8_of_clubs",
        "8_of_diamonds",
        "8_of_hearts",
        "8_of_spades",
        "9_of_clubs",
        "9_of_diamonds",
        "9_of_hearts",
        "9_of_spades",
        "ace_of_clubs",
        "ace_of_diamonds",
        "ace_of_hearts",
        "ace_of_spades",
        "jack_of_clubs",
        "jack_of_diamonds",
        "jack_of_hearts",
        "jack_of_spades",
        "king_of_clubs",
        "king_of_diamonds",
        "king_of_hearts",
        "king_of_spades",
        "queen_of_clubs",
        "queen_of_diamonds",
        "queen_of_hearts",
        "queen_of_spades",
    ]
}
export function dealerPlay() {
    while (getDealerScore() < 17){
        dealerTurn()
        checkLost(getDealerScore())
    } 
    if (getDealerScore() >= 17) {
        if (checkLost(getDealerScore())) return true;
        else{
            return compareHand()
        }
    }

}
function compareHand() {
    return getPlayerScore() > getDealerScore()
}

export function checkLost(score){
    if (score > 21){
        return true
    }
}