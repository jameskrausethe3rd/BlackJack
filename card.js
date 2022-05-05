import { resetDealerHand } from "./dealer.js";
import { resetPlayerHand } from "./player.js";
import {setCustomProperty} from "./updateCustomProperty.js";

const worldElem = document.querySelector("[data-world]")

var cards = generateDeck();

export function dealCards() {
    return cards.pop()
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
export function getCardValue(card) {
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
export function resetHand() {
    resetPlayerHand()
    resetDealerHand()
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
export function addCard(card) {
    worldElem.append(card)
}
export function setCard(card, numCards) {
    setCustomProperty(card, "--left", 60 - numCards*10)
}