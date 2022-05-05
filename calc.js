export function getHandValue(hand) {
    var total = 0

    for (let i = 0; i<hand.length; i++){
        total += hand[i]
    }
    if (total > 21 && hand.includes(11)) {
        total = total - 10
    }
    return total;
}
export function compareHand(player, dealer) {
    if (player > dealer) {
        return 1
    } else if (player < dealer) {
        return 0
    } else if (dealer == player) {
        return 2
    }
}
export function checkLost(score){
    if (score > 21){
        return true
    }
}