/* eslint-disable */

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 12;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_STRONG_PLAYER_ATTACK = "STRONG_PLAYER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Max life for the game", "100");
let chosenMaxValue = parseInt(enteredValue);

if (isNaN(chosenMaxValue) || chosenMaxValue <= 0) {
  chosenMaxValue = 100;
}

let currentMonsterHealth = chosenMaxValue;
let currentPlayerHealth = chosenMaxValue;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxValue);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === LOG_EVENT_STRONG_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "PLAYER";
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "PLAYER";
  } else if (event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxValue;
  currentPlayerHealth = chosenMaxValue;
  resetGame(chosenMaxValue);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but the bonus life has saved you!");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}
// we can also reset the game with a bonus life

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_STRONG_PLAYER_ATTACK;
  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  writeToLog(
    logEvent,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxValue - HEAL_VALUE) {
    alert("You can't heal more than your initial max health!");
    healValue = chosenMaxValue - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler() {
  // for (let i = 0; i < 2; i++) {
  //   console.log("-------------");
  // }
  for (const lofEntry of battleLog) {
    console.log(battleLog[0]); // no access to index, only to the element
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
