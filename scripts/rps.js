function get_computer_choice() {
    let possible_choices = ["rock", "paper", "scissors"];
    return possible_choices[Math.floor(Math.random() * 3)];
}

player_input = "";


// player_input = "rock";
function game(pl) {
    var computer_input = get_computer_choice();
    var winner = "";
    if (pl != computer_input) {
        switch (pl) {
            case "rock":
                winner = (computer_input == "paper") ? "Computer" : "You";
                break;
            case "paper":
                winner = (computer_input == "scissors") ? "Computer" : "You";
                break;
            case "scissors":
                winner = (computer_input == "rock") ? "Computer" : "You";
                break;
        }
    }
    if (pl === computer_input) {
        winner = "Tie!";
    } else if (winner == "You") {
        winner =  "You win!";
    } else {
        winner = "Computer wins!"
    }
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").innerHTML += "<h2>You chose: " + pl + "</h2>";
    document.getElementById("result").innerHTML += "<h2>Computer chose: " + computer_input + "</h2>";
    document.getElementById("winner").textContent = winner;
}
