// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// non è importante l’ordine con cui l’utente inserisce i numeri, basta che ne indovini il più possibile.
// BONUS:
// Inseriamo la validazione: se l’utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
// Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

// elementi input
const form = document.getElementById('answers-form');
const inputNumber = document.querySelectorAll('#input-group input');
const button = document.getElementById('button');
const countDown = document.getElementById('countdown');
const instructions = document.getElementById('instructions');
const listNumber = document.getElementById('number-list');
const messaggio = document.getElementById('message');

// Elementi della lista
const number = generateRandomNumbers(5, 1, 50);
console.log("Numeri da indovinare", number);

let items = "";

// Ciclo per inserire i numeri casuali
for (let i=0; i < 5; i++) {
    items += `<li>${number[i]}</li>`;
}

// Aggiungi gli items in output
listNumber.innerHTML = items;

// Countdown
let seconds = 10;

countDown.innerHTML = seconds;

const ContoallaRovescia = setInterval(() => {
// Se countdown arriva a zero
    if (seconds === 0) {
// Stop all'esecuzione
        clearInterval(ContoallaRovescia);
        instructions.innerHTML = "Inserisci tutti i numeri che ricordi nell'ordine che preferisci";
// Elimino il numero una volta arrivato a zero col countdown
    countDown.innerHTML = "";
// Nascondo la lista dei numeri
    listNumber.classList.add('d-none');
    } else {
    // diminuisco il conto di 1
        seconds = seconds - 1;
    // Output di countdown
    countDown.innerHTML = seconds;
    }
}, 1000);

// form
form.addEventListener('submit', (event) => {
    event.preventDefault(); //blocco l'invio dei form

// creo un array vuoto che contiene i numneri scelti dall'utente
const numeriscelti = [];

// salvo la variabile duplicato inizialmente falsa
let duplicato = false;

// Ciclo per ottenere i valori inseriti negli input
for (let i = 0; i < inputNumber.length; i++) {
    const numberValue = parseInt(inputNumber[i].value.trim());

// Controllo se numero è già presente nell'array
    if (numeriscelti.includes(numberValue)) {

// modifica il valore del duplicato in vero
duplicato = true;
break;
    }
    numeriscelti.push(numberValue)
}
    if (duplicato) {
// Mostra errore in caso di doppioni
messaggio.innerHTML = "Non puoi inserire lo stesso numero due volte";
messaggio.classList.remove('text-success');
messaggio.classList.add('text-danger');
// Evidenzia gli input duplicati
    for (let i = 0; i < inputNumber.length; i++) {
        if (numeriscelti.includes(parseInt(inputNumber[i].value.trim()))) {
            inputNumber[i].classList.add('is-invalid');  // Aggiungi la classe is-invalid
        }
    }
    } else {

// Convalido i dati con validateNumbers
const numeriIndovinati = validateNumbers(numeriscelti, number);

// Messaggio in caso di numeri indovinati
const numeriIndovinatimex = `HAI INDOVINATO ${numeriIndovinati.length} numeri: ${numeriIndovinati.join(", ")}`;
}
// Messaggio testo diventa rosso in caso di errore
    messaggio.classList.add('text-success');
    messaggio.classList.remove('text-danger');

// Se gli array sono entrambi vuoti vuol dire che sono stati indovinati tutti i numeri
if (numeriIndovinati.length > 0) {
    messaggio.innerHTML = numeriIndovinatimex;
    messaggio.classList.remove('text-danger');
    messaggio.classList.add('text-success');
} else {
    messaggio.innerHTML = "NON HAI INDOVINATO NESSUN NUMERO"
    messaggio.classList.remove('text-success');
    messaggio.classList.add('text-danger');
}
    button.disabled = true;
// resetta il form
    form.reset();
});

// funzione per numeri casuali in un range
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// funzione per numeri casuali non ripetuti
function generateRandomNumbers(totalNumbers, min, max) {
    const randomNumbers = [];

    while (randomNumbers.length < totalNumbers) {
        const numeriesimo = randomNumberRange(min, max);

        if (!randomNumbers.includes(numeriesimo)) {
            randomNumbers.push(numeriesimo);
        }
    }

    return randomNumbers;
}

// Funzione per validare l'array utente rispetto a quello generato
function validateNumbers(arraycheck, arrayverify) {
    const result = [];

//array che cancella gli elementi diversi e ritorna quelli uguali
for (let i = 0; i < arraycheck.length; i++) {

// salvo elemento iesimo
    const item = arraycheck[i];

// se l'array include elementi iesimi che non sono già stati inseriti nell'array
    if (arrayverify.includes(item) {

// salvo quegli elementi nell'array
    result.push(item);
    }
}
return result;
}



