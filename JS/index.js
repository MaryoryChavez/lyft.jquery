$(document).ready(init);

function init() {
    $('#logIn').click(logIn);
    $('#signUp').click(signUp);
};

function logIn() {
    if (localStorage.length < 4) {
        alertify.alert("No estas registrado");
    } else {
        location.href = "mapa.html";
    }
}

function signUp() {
    if (localStorage.length < 4) {
        location.href = "signup.html";
    } else {
        alertify.alert("ya estas registrado. Inicia sesion");
    }
}