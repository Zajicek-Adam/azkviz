firstLabel = document.getElementById('firstLabel');
secondLabel = document.getElementById('secondLabel');

firstName = document.getElementById('firstName');
secondName = document.getElementById('secondName');

myStorage = window.localStorage;

let _firstName;
let _secondName;


form = document.getElementById("form");

form.addEventListener('submit', e => {
    e.preventDefault();
    if (firstName.value == '')
        firstLabel.innerText = "Kokote";
    else
        firstLabel.innerText = "Jméno prvního hrozba herce";

    if (secondName.value == '')
        secondLabel.innerText = "Kokote";
    else
        secondLabel.innerText = "Jméno druhého hrozba herce";
    
    if(firstName.value != '' && secondName.value != '')
    {
        myStorage.setItem('threatactorone', firstName.value.toString());
        myStorage.setItem('threatactortwo', secondName.value.toString());
        window.location.href = 'game.html';
    }
})