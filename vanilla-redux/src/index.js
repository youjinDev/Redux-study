import { createStore } from "redux";

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const counter = document.querySelector(".counter");

let number = 0;
counter.innerHTML = number;

const handlePlus = () => (counter.innerHTML = ++number);
const handleMinus = () => (counter.innerHTML = --number);

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
