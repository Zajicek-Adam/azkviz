let firstLabel = document.getElementById("threatone");
let secondLabel = document.getElementById("threattwo");

let myStorage = window.localStorage;

firstLabel.innerText = myStorage.getItem("threatactorone");
secondLabel.innerText = myStorage.getItem("threatactortwo");

let otazkyAnoNe = ["Je amogus sussy wussy?", "Je amogus podezřelý?", "If you created a photo calendar, what photo would you put for November?", "Would you prefer luxury beach vacations or backpacking?", "Have you ever met a celebrity?", "What is your role in the company?", "What management style do you prefer?", "What are your favourite pizza toppings?", "Do you support any charities?", "What is your favourite local joint?","Where were you born?", "Do you enjoy rollercoasters?", "What is the best or worst roller coaster you have been on?", "Is there a dish you cook exceptionally well?", "What is a piece of technology you wish existed?", "If you could collect anything, what would it be?", "A", "B","C", "D", "E", "F", "G", "H", "AB", "WQ", "ERE", "s"];
let otazkyAnoNeRes = [true, false];

let otazkyDefault = ["Jaký je minimální počet pro zapnutí lobby v amongus?", "Jakým specifickým stereometrickým tvarem se vyznačuje ing phd kkt Krčmařík?", "What was the best compliment you've ever received?", "What's your go-to dance move?", "What's the worst movie you've ever seen?", "Do you have any nicknames?", "What is your theme song?", "Pet peeves?", "Who inspires you to be better?", "What bends your mind every time you think about it?", "Who is one of your best friends, and what do you love about them?", "What's your favorite book?", "Would you rather be stuck on a broken ski lift or a broken elevator?", "What's your favorite piece of clothing you own?", "What was your best birthday?", "What is your theme song?", "If you could choose the way you became a hero, what would the circumstances be?", " Have you been given any good advice lately?", " What's something uncomfortable but you feel everyone should experience at least once in their life?", " What types of things do you procrastinate the most on?", " Do you have a moment in your life you wish you could relive?", "If you had to name one thing that makes you stand out from others, what would that be?", "What is the best random act of kindness you've ever witnessed?", "What was the best thing you learned in the past year?", "What destination is at the top of your list to visit?", "Have you evet taken a long shot that worked out?", "What's your favorite daily routine?", "Do you have a special project you're currently working on?"];
let otazkyDefaultRes = ["4", "koule"];

let susmoguscells = Array.prototype.slice.call(document.getElementsByClassName("cell"));
let backup;
let blackCells = [];
let threatactoroneCells = [];
let threatactortwoCells = [];

let mogal = document.getElementById("mogal");
let mogalText = document.getElementById("mogal-text");

let correctButton = document.getElementById("correct");
let wrongButton = document.getElementById("wrong");

let turn = false; //false - threat actor one, true - threat actor two

function InitField() {
    let i = 0;
    susmoguscells.forEach(element => {
        element.addEventListener('click', function InitCell() {
            TurnManager();
            CellManager(backup.indexOf(element));
        })
        element.innerHTML = (backup.indexOf(element) + 1) //cislovani
        i++;
    });
    correctButton.addEventListener('click', e => {
        let _cell = document.getElementsByClassName("selected")[0];
        if (!_cell) //if the document has no element by the class of selected
            return;

        if (!turn) {
            threatactoroneCells.push(_cell);
            _cell.style.backgroundImage = "url('./img/azkviz-blue2.svg')";
            turn = true;
        }
        else {
            threatactoroneCells.push(_cell);
            _cell.style.backgroundImage = "url('./img/azkviz-orange.svg')";
            turn = false;
        }
        if (susmoguscells.includes(_cell)) {
            susmoguscells.splice(susmoguscells.indexOf(_cell), 1);
        }
        else {
            blackCells.splice(blackCells.indexOf(_cell), 1);
            _cell.classList.remove("black");
        }

        mogal.style.opacity = "0";
        _cell.style.cursor = "default";
        _cell.classList.remove("selected");
        _cell.removeEventListener('click', e);
        TurnManager();
    })
    wrongButton.addEventListener('click', e => {
        let _cell = document.getElementsByClassName("selected")[0];
        if (!_cell) //if the document has no element by the class of selected
            return;

        if (susmoguscells.includes(_cell)) {
            blackCells.push(_cell);
            _cell.classList.add("black");
            susmoguscells.splice(susmoguscells.indexOf(_cell), 1);
            turn = !turn;
        }
        else {
            _cell.classList.remove("black");
            blackCells.splice(blackCells.indexOf(_cell), 1);
            if (!turn) {
                threatactoroneCells.push(_cell);
                _cell.style.backgroundImage = "url('./img/azkviz-orange.svg')";
                turn = false;
            }
            else {
                threatactortwoCells.push(_cell);
                _cell.style.backgroundImage = "url('./img/azkviz-blue2.svg')";
                turn = true;
            }
            _cell.removeEventListener('click', e);
            _cell.style.cursor = "default";
        }
        mogal.style.opacity = "0";
        _cell.classList.remove("selected");
        TurnManager();
    })
}

function TurnManager() {
    if (!turn) {
        ChangeColor(firstLabel, secondLabel);
    }
    else {
        ChangeColor(secondLabel, firstLabel);
    }
}
function ChangeColor(element, element2) {
    element.style.color = "white";
    element.style.transform = "scale(1.5)";

    element2.style.color = "rgb(234, 74, 111)";
    element2.style.transform = "scale(1)";
}
function CellManager(cell_index) {
    let cell = backup[cell_index];
    mogal.style.opacity = 1;
    cell.classList.add("selected");
    if (susmoguscells.includes(cell)) { // Empty cell
        let rnd = Math.floor(Math.random() * otazkyDefault.length);
        mogalText.innerText = otazkyDefault[rnd];
        otazkyDefault.splice(rnd, 1);
    }
    else { // Black cell
        let rnd = Math.floor(Math.random() * otazkyAnoNe.length);
        mogalText.innerText = otazkyAnoNe[rnd];
        otazkyAnoNe.splice(rnd, 1);
    }


    //if cell - nemá přidělení - zobrazí otázku - ano/ne x default
    //default - either se přidělí, nebo ano/ne černota
    //ano/ne - přidělí se jednomu z hráčů

}
TurnManager();
backup = susmoguscells.slice();
InitField();
