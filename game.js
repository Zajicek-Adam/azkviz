let firstLabel = document.getElementById("threatone");
let secondLabel = document.getElementById("threattwo");

let myStorage = window.localStorage;

firstLabel.innerText = myStorage.getItem("threatactorone");
secondLabel.innerText = myStorage.getItem("threatactortwo");

let otazkyAnoNe = ["Je amogus sussy wussy?", "Je amogus podezřelý?"];
let otazkyAnoNeRes = [true, false];

let otazkyDefault = ["Jaký je minimální počet pro zapnutí lobby v amongus?", "Jakým specifickým stereometrickým tvarem se vyznačuje ing phd kkt Krčmařík?"];
let otazkyDefaultRes = ["4", "koule"];

let susmoguscells = Array.prototype.slice.call(document.getElementsByClassName("cell"))
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
            CellManager(susmoguscells.indexOf(element));
        })
        element.innerHTML = (susmoguscells.indexOf(element) + 1)
        i++;
    });
    correctButton.addEventListener('click', e => {
        let _cell = document.getElementsByClassName("selected")[0];
        if (_cell) //if the document has an element by class of selected
        {
            if (!turn) {
                threatactoroneCells.push(_cell);
                susmoguscells.splice(susmoguscells.indexOf(_cell), 1);
            }
            else {
            }
        }
        _cell.removeEventListener('click', e);
    })
    wrongButton.addEventListener('click', e => {
        let _cell = document.getElementsByClassName("selected")[0];
        if (_cell) {
        }
    })
}

function TurnManager() {
    if (!turn) {
        ChangeColor(firstLabel, secondLabel);
        turn = true;
    }
    else {
        ChangeColor(secondLabel, firstLabel);
        turn = false;
    }
}
function ChangeColor(element, element2) {
    element.style.color = "rgb(234, 74, 111)";
    element.style.transform = "scale(1.5)";

    element2.style.color = "white";
    element2.style.transform = "scale(1)";
}
function CellManager(cell_index) {
    let cell = susmoguscells[cell_index];
    cell.classList.add("selected");
    if (!turn) { //Threatactorone
        if (susmoguscells.includes(cell)) { //Threatactorone kliknul na prázdné
            mogal.style.opacity = 1;
            let rnd = Math.floor(Math.random() * otazkyDefault.length);
            mogalText.innerText = otazkyDefault[rnd];
        }
        else { // černý pole

        }
    }
    else { //Threatactortwo

    }

    //if cell - nemá přidělení - zobrazí otázku - ano/ne x default
    //evaluate response - default 
    //default - either se přidělí, nebo ano/ne černota
    //ano/ne - přidělí se jednomu z hráčů

}
TurnManager();
InitField();
