import { 
    setCookie,
    getCookie } from "./cookies.js";

let chips

export function setChips (num) {
    chips = num;
}
export function addChips (num) {
    chips += num;
}
export function getChips () {
    return parseInt(getCookie("chip"));
}
export function setBet (bet) {
    if (bet == chips) {
        chips = 0
    } else{
        chips -= bet
    }
}
export function setBetAll() {
    chips = 0;
}
export function saveChip (){
    setCookie("chip", chips)
}
export function getChipsVar () {
    return chips
}