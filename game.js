let firstLabel = document.getElementById("threatone");
let secondLabel = document.getElementById("threattwo");

let myStorage = window.localStorage;

firstLabel.innerText = myStorage.getItem("threatactorone");
secondLabel.innerText = myStorage.getItem("threatactortwo");

let otazkyAnoNe = ["Je amogus sussy wussy?", "Je amogus podezřelý?"];
let otazkyAnoNeRes = [true, false];

let otazkyDefault = ["Jaký je minimální počet pro zapnutí lobby v amongus?", "Jakým specifickým stereometrickým tvarem se vyznačuje ing phd kkt Krčmařík?"];
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
        console.log(backup);
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
            console.log('amogus')
            blackCells.splice(blackCells.indexOf(_cell), 1);
            if (!turn) {
                threatactoroneCells.push(_cell);
                _cell.style.backgroundImage = "url('./img/azkviz-orange.svg')";
                turn = true;
            }
            else {
                threatactortwoCells.push(_cell);
                _cell.style.backgroundImage = "url('./img/azkviz-blue2.svg')";
                turn = false;
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
    }
    else { // Black cell
        let rnd = Math.floor(Math.random() * otazkyAnoNe.length);
        mogalText.innerText = otazkyAnoNe[rnd];
    }


    //if cell - nemá přidělení - zobrazí otázku - ano/ne x default
    //default - either se přidělí, nebo ano/ne černota
    //ano/ne - přidělí se jednomu z hráčů

}
TurnManager();
backup = susmoguscells.slice();
console.log(backup);
InitField();
