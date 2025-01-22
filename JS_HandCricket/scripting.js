coins = ["HEAD", "TAIL"];
elect = ["Bat", "Bowl"];
const numToWords = {
  0: "dot",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};
user = "";
userWonToss = false;
compStart = false;
secondMatch = false;
bowl = false;
function tossNow() {
  choice = Math.floor(Math.random() * coins.length);
  this.tossStatus();
}
function tossStatus() {
  if (this.user) {
    document.getElementById("choiceErr").style.display = "none";
    document.getElementsByClassName("tossSection")[0].style.display = "none";
    document.getElementsByClassName("tossgif")[0].style.display = "flex";
    setTimeout(() => {
      document.getElementById(
        "coinChoice"
      ).innerHTML = `Its a <span class="headStatus">${coins[choice]}</span>!!`;
      if (this.user.toUpperCase() === coins[choice]) {
        this.userWonToss = true;
        document.getElementById(
          "tossResult"
        ).innerHTML = `User won the Toss!<br>Do you choose to bat or bowl?`;
        const item = document.createElement("div");
        item.className = "batbowl";
        item.innerHTML =
          '<img id="bat" src="bat.png"><img id="bowl" src="ball.png">';
        document.getElementById("tossRes").appendChild(item);
      } else {
        this.userWonToss = false;
        compChoice = Math.floor(Math.random() * elect.length);
        if (elect[compChoice] === "Bat") {
          bowl = true;
        } else {
          bowl = false;
        }
        document.getElementById(
          "tossResult"
        ).innerHTML = `Computer won the Toss!<br>Computer elected to ${elect[compChoice]} first!<br><button id="start">Start Game</button>`;
      }
      document.getElementsByClassName("tossgif")[0].style.display = "none";
    }, 5000);
  } else {
    document.getElementById("choiceErr").style.display = "block";
  }
}
function userChoice(el) {
  this.user = el.id;
}
document.body.addEventListener("click", (event) => {
  if (event.target && event.target.id === "bat") {
    bowl = false;
    var batbowl = document.querySelector(".batbowl");
    var coinchoice = document.querySelector("#coinChoice");
    document.getElementById("tossRes").removeChild(batbowl);
    document.getElementById("tossRes").removeChild(coinchoice);
    document.getElementById("tossResult").style.display = "none";
    document.getElementById(
      "tossRes"
    ).innerHTML += `<br>User chose to <span style="color: greenyellow">${event.target.id}</span> first!!<br> <button id="start">Start Game</button>`;
  }
  if (event.target && event.target.id === "bowl") {
    bowl = true;
    var batbowl = document.querySelector(".batbowl");
    var coinchoice = document.querySelector("#coinChoice");
    document.getElementById("tossRes").removeChild(batbowl);
    document.getElementById("tossRes").removeChild(coinchoice);
    document.getElementById("tossResult").style.display = "none";
    document.getElementById(
      "tossRes"
    ).innerHTML += `<br>User chose to <span style="color: greenyellow">${event.target.id}</span> first!!<br> <button id="start">Start Game</button>`;
  }
  if (event.target && event.target.id === "start") {
    document.getElementById("tossRes").style.display = "none";
    if (this.userWonToss) {
      if (bowl) {
        document.getElementById("scoreStatus1").style.display = "block";
      } else {
        document.getElementById("scoreStatus").style.display = "block";
      }
    } else {
      if (bowl) {
        document.getElementById("scoreStatus1").style.display = "block";
      } else {
        document.getElementById("scoreStatus").style.display = "block";
      }
    }
    document.getElementById("playsection").style.display = "block";
    document.getElementsByClassName("tossSection")[0].style.display = "none";
  }
  if (event.target && event.target.id === "secondInnings") {
    secondMatch = true;
    bowl = !bowl;
    document.getElementById("playsection").style.display = "block";
    if (userWonToss) {
      if (secondMatch) {
        if (!bowl) {
          document.getElementById("scoreStatus").style.display = "block";
        } else {
          document.getElementById("scoreStatus1").style.display = "block";
        }
      }
    } else {
      if (secondMatch) {
        if (!bowl) {
          document.getElementById("scoreStatus").style.display = "block";
        } else {
          document.getElementById("scoreStatus1").style.display = "block";
        }
      }
    }
    document.getElementById("scoresection").style.display = "none";
  }
  if (event.target && event.target.id === "gameover") {
    window.location.reload();
  }
});
function play(el) {
  document.getElementById("player").src = el.id + ".png";
  const comp = Math.floor(Math.random() * 7);
  document.getElementById("computer").src = numToWords[comp] + ".png";
  if (this.userWonToss) {
    if (!bowl) {
      this.checkScore(el.id, comp);
    } else {
      this.checkScore(
        numToWords[comp],
        Object.keys(numToWords).find((key) => numToWords[key] === el.id)
      );
    }
  } else {
    if (!bowl) {
      this.checkScore(el.id, comp);
    } else {
      this.checkScore(
        numToWords[comp],
        Object.keys(numToWords).find((key) => numToWords[key] === el.id)
      );
    }
  }
}
function checkScore(id, comp) {
  if (comp == 0 && id != "dot") {
    document.getElementById("choiceErr").style.display = "block";
    document.getElementById("choiceErr").innerText = "It's a Dot!";
    return;
  } else if (
    document.getElementById("player").src ===
    document.getElementById("computer").src
  ) {
    document.getElementById("choiceErr").style.display = "block";
    document.getElementById("choiceErr").innerText = "HOWZAT!! It's a Wicket!";
    if (!bowl) {
      +document.getElementById("wicket").innerText++;
      if (+document.getElementById("wicket").innerText == 3) {
        if (secondMatch) {
          this.result(
            "User",
            "scorepoint",
            "Computer",
            "scorepoint1",
            "wicket",
            "wicket1",
            "gameover",
            "Play Again!"
          );
        } else {
          this.result("User", "scorepoint", "Computer");
        }
      }
    } else {
      +document.getElementById("wicket1").innerText++;
      if (+document.getElementById("wicket1").innerText == 3) {
        if (secondMatch) {
          this.result(
            "Computer",
            "scorepoint1",
            "User",
            "scorepoint",
            "wicket1",
            "wicket",
            "gameover",
            "Play Again!"
          );
        } else {
          this.result("Computer", "scorepoint1", "User");
        }
      }
    }
  } else {
    const playerScore = Object.keys(numToWords).find(
      (key) => numToWords[key] === id
    );
    document.getElementById("choiceErr").style.display = "block";
    document.getElementById("choiceErr").innerText =
      id === "dot" ? `It's a Dot!` : `It's a ${playerScore}!`;
    if (!bowl) {
      document.getElementById("scorepoint").innerText =
        +document.getElementById("scorepoint").innerText + +playerScore;
    } else {
      document.getElementById("scorepoint1").innerText =
        +document.getElementById("scorepoint1").innerText + +playerScore;
    }
    if (secondMatch) {
      if (
        !bowl &&
        +document.getElementById("scorepoint").innerText >
          +document.getElementById("scorepoint1").innerText
      ) {
        this.result(
          "Computer",
          "scorepoint1",
          "User",
          "scorepoint",
          "wicket1",
          "wicket",
          "gameover",
          "Play Again!"
        );
      }
      if (
        bowl &&
        +document.getElementById("scorepoint1").innerText >
          +document.getElementById("scorepoint").innerText
      ) {
        this.result(
          "User",
          "scorepoint",
          "Computer",
          "scorepoint1",
          "wicket",
          "wicket1",
          "gameover",
          "Play Again!"
        );
      }
    }
  }
}
function result(
  playerName,
  scorepoint,
  player2Name,
  scorepoint2,
  wicket,
  wicket1,
  id,
  restartText
) {
  document.getElementById("playsection").style.display = "none";
  document.getElementById("choiceErr").style.display = "none";
  document.getElementById("scoresection").style.display = "flex";
  if (restartText) {
    document.getElementById(
      "scoresection"
    ).innerHTML = `<span>${playerName} - <span class="headStatus">${
      document.getElementById(scorepoint).innerText
    }/${document.getElementById(wicket).innerText}</span></span>
                    <span>${player2Name} - <span class="headStatus">${
      document.getElementById(scorepoint2).innerText
    }/${document.getElementById(wicket1).innerText}</span></span>
                    <span><span class="headStatus">${player2Name}</span> Won!</span>`;
    const secondInnings = document.createElement("button");
    secondInnings.id = id;
    secondInnings.innerHTML = restartText;
    document.getElementById("scoresection").appendChild(secondInnings);
  } else {
    document.getElementById(
      "scoresection"
    ).innerHTML = `<span>${playerName} All Out for <span class="headStatus">${
      document.getElementById(scorepoint).innerText
    }</span></span>
                    <span>${player2Name} needs <span class="headStatus">${
      +document.getElementById(scorepoint).innerText + 1
    }</span> runs to Win!</span>`;
    const secondInnings = document.createElement("button");
    secondInnings.id = "secondInnings";
    secondInnings.innerHTML = "Start 2nd Innings";
    document.getElementById("scoresection").appendChild(secondInnings);
  }
}
