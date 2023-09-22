function get_computer_choice() {
    let possible_choices = ["rock", "paper", "scissors"];
    return possible_choices[Math.floor(Math.random() * 3)];
}

player_input = "";

for (i of ["rock", "paper", "scissors"]){
    for (j of ["rock", "paper", "scissors"]){
        if (i == j) console.log("")
    }
}

// player_input = "rock";
function game(pl) {
    var computer_input = get_computer_choice();
    var winner = "";
    if (pl != computer_input) {
        if (pl == "rock" && computer_input == "paper") winner = "Computer wins!";
        if (pl == "rock" && computer_input == "scissors") winner = "You win!";
        if (pl == "rock" && computer_input == "rock") winner = "Tie";

        if (pl == "paper" && computer_input == "paper") winner = "Tie!";
        if (pl == "paper" && computer_input == "scissors") winner = "Computer wins!";
        if (pl == "paper" && computer_input == "rock") winner = "You win!";

        if (pl == "scissors" && computer_input == "paper") winner = "You win!";
        if (pl == "scissors" && computer_input == "scissors") winner = "Tie!";
        if (pl == "scissors" && computer_input == "rock") winner = "Computer wins!";
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
