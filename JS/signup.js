var dialNumber = $("#dialNumber");
$(document).ready(cargarLista);
$("#boton").click(guardarDatos);

function cargarLista() {
    //console.log("si");
    for (var i = 0; i < countries.length; i++) {
        var liText = '<div src="" class="flag flag-' + countries[i].code.toLowerCase() + '" alt="" >' + '</div>' + '<a href="" onclick="dial(' + i + ',event)">' + countries[i].name + '</a>';

        dialNumber.html("+51");
        $("#valorCount").html('<div src="" class="flag flag-pe" alt=""></div>');
        $("#listCountries").append('<li>' + liText + '</li>');
    }
};

function dial(num, evt) {
    dialNumber.html(countries[num].dial_code);
    $('#valorCount').html('<div src="" class="flag flag-' + countries[num].code.toLowerCase() + '" alt="" >' + '</div>');
    evt.preventDefault();
}

function guardarDatos() {
    var inputNumber = $('#inputNumber');
    var aleatory = "LAB-" + Math.round(Math.random() * (999 - 100) + parseInt(100));
    if (inputNumber.val().length == 0) {
        alertify.alert("Debes confirmar tu número telefonico");
    } else {
        alertify.alert("Tu codigo es: " + aleatory);

        $("#alertify-ok").click(function () {
            var cellphone = dialNumber.html() + "" + $('#inputNumber').val();
            localStorage.setItem("codigo", aleatory);
            localStorage.setItem("cellphone", cellphone);
            location.href = "signup2.html";
        });
    }
};