/* eslint-disable */

const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;

let chosenMaxValue = 100;
let currentMonsterHealth = chosenMaxValue;
let currentPlayerHealth = chosenMaxValue;

adjustHealthBars(chosenMaxValue);

function attackHandler() {
  const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= monsterDamage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw!");
  }
}

attackBtn.addEventListener("click", attackHandler);
