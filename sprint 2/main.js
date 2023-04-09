// Accediendo al DOM

const submitButton = document.querySelector('#button');
const form = document.querySelector('#myForm');
const section = document.getElementById('box');
const continuar = document.getElementById('continuar');

// validacion de campos para habilitar boton submit

let isValid = {
    name: false,
    "card-number": false,
    cvc: false,
    "MM": false,
    "YY": false
};

// Accediendo al DOM (inputs, parrafo de error y tarjeta)

const inputs = {
    name: {
        txtTarjeta: 'Jane Appleseed',
        input: document.getElementById("name"),
        error: document.getElementById("p1"),
        validate: value => /^[a-zA-Z\s]+$/.test(value.trim()),
        cardField: document.getElementById('card-name'),
        errorMessage: "Invalid name"
    },
    card: {
        txtTarjeta: '1234 5678 9123 0000',
        input: document.getElementById("card-number"),
        error: document.getElementById("p2"),
        validate: value => /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value.trim()),
        cardField: document.getElementById('card-num'),
        errorMessage: "Invalid card number"
    },
    cvc: {
        txtTarjeta: '123',
        input: document.getElementById("cvc"),
        error: document.getElementById("p3"),
        validate: value => /^\d{3}$/.test(value.trim()),
        cardField: document.getElementById('card-cvc'),
        errorMessage: "Invalid cvc number"
    },
    month: {
        txtTarjeta: '00',
        input: document.getElementById("MM"),
        error: document.getElementById("p4"),
        cardField: document.getElementById('card-month'),
        validate: value =>
            /^\d{2}$/.test(value.trim()) && Number(value.trim()) > 0 && Number(value.trim()) < 13,
        errorMessage: "Invalid month"
    },
    year: {
        txtTarjeta: '00',
        input: document.getElementById("YY"),
        error: document.getElementById("p4"),
        cardField: document.getElementById('card-year'),
        validate: value => /^\d{2}$/.test(value.trim()) && Number(value.trim()) >= 23,
        errorMessage: "Invalid year"
    }
};

// LLamando funciones

Object.values(inputs).forEach(({ input, error, validate, errorMessage, cardField, txtTarjeta }) => {

    input.addEventListener("input", () =>
        validateInput(input, error, validate, errorMessage, cardField)
    );

    if (input.id === "card-number") {
        input.addEventListener("input", addSpacesToCardNumber);
    };

    input.addEventListener("change", () =>
        showError(input, error, validate, errorMessage, cardField)
    );
    input.addEventListener("keyup", () =>
        reset(input, cardField, txtTarjeta));

});

// funcion para volver al formulario luego de apretar el boton continuar en el estado de completado

continuar.addEventListener('click', function () {
    section.style.display = 'none';
    form.style.display = 'flex';
    location.reload();
});

// funcion para desplegar el estado de completado y esconder el form

form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.style.display = 'none';
    section.style.display = 'flex';

});

// funcion para resetear los valores predeterminados en la tarjeta cuando el usuario borra todo lo que escribió en el input

function reset(input, cardField, txtTarjeta) {
    console.log("entro a la funcion");
    const value = input.value.trim();
    if (value === '') {
        console.log("entro al if");
        cardField.textContent = txtTarjeta;
    }
}

// desactivar el boton submit y activarlo cuando todos los campos esten validados

submitButton.disabled = true;
form.addEventListener('input', checkFormValidity);

function checkFormValidity() {
    const isValidForm = Object.values(isValid).every(valid => valid);
    submitButton.disabled = !isValidForm;

}

// funcion para agregar espacios al numero de tarjeta

function addSpacesToCardNumber() {
    const input = document.getElementById("card-number");
    input.value = input.value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
}

// funcion para validar inputs a traves de la variable validate y activar el boton submit

function validateInput(input, error, validate, errorMessage, cardField) {
    const value = input.value;
    if (validate(value)) {
        cardField.textContent = value.toUpperCase();
        isValid[input.id] = true;
    } else {
        isValid[input.id] = false;
    }

}

// funcion para mostrar mensajes de error si el input es invalidado

function showError(input, error, validate, errorMessage, cardField) {
    const value = input.value.trim();
    if (validate(value)) {
        input.style.borderColor = 'green';
        error.textContent = '';

    } else {
        input.style.borderColor = 'red';
        error.style.color = 'red';
        error.textContent = errorMessage;

    }
}