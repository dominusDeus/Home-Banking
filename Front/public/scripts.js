async function getCurrentBalance(){
    //Grabs current balance from Database and returns it
    let fetched = await fetch("http://localhost:3000");
    let parsedResults = await fetched.json();
    return await parsedResults;
}

async function showBalanceOnScreen () {
    let divSaldo = document.querySelector("#saldo-actualizado");
    let data = await getCurrentBalance();
    divSaldo.innerHTML = data[0].saldo;

}

function modifyBalance(operation, number) {
    //Extracts or deposits the amount you pass on
    fetch('http://localhost:3000', {
        method: 'PUT',
        body: JSON.stringify({userInput: number, operation: operation}),
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        getCurrentBalance();
      });
}

function deposit() {
  //it opens the deposit screen and sets the operation to deposit
  let depositButton = document.querySelector("#depositar");
  depositButton.addEventListener("click", () => {
    showScreen("deposit");
    let input = document.querySelector("#modificar-saldo input");
    input.setAttribute("title", "deposit");
  });
}

function extract() {
  //it opens the extract screen and sets the operation to extract
  let extractButton = document.querySelector("#extraer");
  extractButton.addEventListener("click", () => {
    showScreen("extract");
    let input = document.querySelector("#modificar-saldo input");
    input.setAttribute("title", "extract");
  });
}

function submitNumber() {
    //for both operations it grabs input and calls the modify balance operation to call API
    let userInput = document.querySelector("#modificar-saldo input");
    let submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", async () => {
    let operation = document.querySelector('#depositar-extraer').getAttribute('title');
    // let userInput = document.querySelector('#modificar-saldo input');
    if (operation == "deposit") {
        if (userInput.value >0 && userInput.value <50000) {
            modifyBalance(operation, userInput.value);
            setTimeout(showBalanceOnScreen,100);
            removeScreen();
        } else {
            alert('Debes ingresar un número entre 1 y 50000');
        }
    } else if (operation == "extract") {
        let data = await getCurrentBalance();
        let currentBalance = data[0].saldo;
        if(currentBalance - userInput.value < 0){
            alert('No tiene suficiente dinero en cuenta')
        } else if ( userInput.value > 20000) {
            alert('Por su seguridad, no está permitido extraer más de ARS20.000 por operación')
        } else {
            modifyBalance(operation, userInput.value);
            setTimeout(showBalanceOnScreen,100);
            removeScreen();
        }
    }
  });
}

function showScreen (operation) {
    // Brings visible the screen to modify balance
    let depositScreen = document.querySelector('.hidden');
    depositScreen.style.visibility = 'visible';
    let depositorExtract = document.querySelector('#depositar-extraer');
    depositorExtract.setAttribute("title", operation);
    let body = document.querySelector('#wrapper');
    body.classList.add('showScreen');
    if (operation == "deposit") {
        depositorExtract.innerHTML = "depositar. Puede depositar hasta ARS50.000 por operación";
    } else if (operation == "extract"){
        depositorExtract.innerHTML = "extraer. El límite de extracción es ARS20.000 por operación";
        let inputMax = document.querySelector('#modificar-saldo input');
        inputMax.setAttribute("max", "20000");
    }
}

function removeScreen(){
    let screenToRemove = document.querySelector('#modificar-saldo');
    screenToRemove.style.visibility='hidden';
    let blurredScreen = document.querySelector('#wrapper');
    blurredScreen.classList.remove('showScreen');
}

function cancelOperation() {
    let cancelButton = document.querySelector('#cancel');
    cancelButton.addEventListener('click', ()=>{
        removeScreen();
    })
}


function init () {
    showBalanceOnScreen();
    deposit();
    extract();
    submitNumber();
    cancelOperation();
}

init();