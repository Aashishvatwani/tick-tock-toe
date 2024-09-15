let blocks = document.querySelectorAll(".block"); // Use querySelectorAll for selecting multiple elements
let msgcon = document.querySelector(".msgcontainer");
let ng = document.querySelector("#New-Game");
let replay = document.querySelector("#replay");
let winnering = document.querySelector("#Winner");

let turn0 = true;
let count = 0; // Added variable to keep track of moves

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableboxes();
    msgcon.classList.add("hide"); // Fixed classlist to classList (capital L)
};

blocks.forEach((block, index) => {
    block.addEventListener("click", () => { // Fixed 'addeventListener' to 'addEventListener'
        if (turn0) {
            block.innerText = "O"; // Changed "0" to "O" for better visual representation
            turn0 = false;
        } else {
            block.style.color="rgb(0,0,128)";
            block.innerText = "X";
            turn0 = true;
            
        }
        block.disabled = true;
        count++;
        let isWinner = checkwinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    winnering.innerText = 'Game was a Draw.';
    msgcon.classList.remove("hide");
    disableboxes();
};

const disableboxes = () => {
    blocks.forEach(block => {
        block.disabled = true;
    });
};

const enableboxes = () => {
    blocks.forEach(block => {
        block.disabled = false;
        block.innerText = "";
    });
};

const showwinner = (winner) => {
    winnering.innerText = `Congratulation,\nThe winner is ${winner}`; // Corrected template literal
    msgcon.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = blocks[pattern[0]].innerText;
        let pos2 = blocks[pattern[1]].innerText;
        let pos3 = blocks[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showwinner(pos1);
                return true;
            }
        }
    }
    return false;
};

replay.addEventListener("click", resetGame); // Fixed 'addeventlistener' to 'addEventListener'
ng.addEventListener("click", resetGame); // Fixed 'addeventlistener' to 'addEventListener'
