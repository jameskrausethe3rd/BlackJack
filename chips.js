import { setCookie,
getCookie } from "./cookies.js";

let chips

export function setChips (num) {
    chips = num;
    setCookie("chip", chips)
}
export function addChips (num) {
    chips += num;
    setCookie("chip", chips)
}
export function getChips () {
    return getCookie("chip");
}
export function setBet (bet) {
    chips -= bet
    setCookie("chip", chips)
}