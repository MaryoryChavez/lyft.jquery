$(document).ready(function () {
    $('#logIn').click(function () {
        //console.log("si");
        if (localStorage.length < 4) {
            alertify.alert("No estas registrado");
        } else {
            location.href = "mapa.html";
        }
    });
    $('#signUp').click(function () {
        if (localStorage.length < 4) {
            location.href = "signup.html";
        } else {
            alertify.alert("ya estas registrado. Inicia sesion");
        }
    });
});