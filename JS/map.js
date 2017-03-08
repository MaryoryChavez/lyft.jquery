var map;
var registrandoPosicion = false;
var idRegistroPosicion;
var ultimaPosicionUsuario;
var marcadorUsuario;
var mapa;
var div = document.getElementById("map");
var dataGlobal = null;

//$(document).ready(initMap);

function initMap() {
    mapa = new google.maps.Map(div, {
        zoom: 16,
        center: new google.maps.LatLng(-16.457618, -71.529091),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    });
    registrarPosicion();
    setMarkers(mapa);
    //solicitarEstimado();
    //solicitarEstimado();
    //evt.preventDefault();
}

function registrarPosicion() {
    if (registrandoPosicion) {
        registrandoPosicion = false;
        navigator.geolocation.clearWatch(idRegistroPosicion);
        limpiarUbicacion();
    } else {
        idRegistroPosicion = navigator.geolocation.watchPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
    }
}

function exitoRegistroPosicion(position) {
    if (!registrandoPosicion) {
        registrandoPosicion = true;
        ultimaPosicionUsuario = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        marcadorUsuario = new google.maps.Marker({
            position: ultimaPosicionUsuario,
            map: mapa
        });
        direccion();
    } else {
        var posicionActual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        ultimaPosicionUsuario = posicionActual;
        marcadorUsuario.setPosition(posicionActual);
        //console.log('si');
    }
    mapa.panTo(ultimaPosicionUsuario);
}

function falloRegistroPosicion() {
    alert('No se pudo determinar la ubicación');
    limpiarUbicacion();
}

function limpiarUbicacion() {
    ultimaPosicionUsuario = new google.maps.LatLng(0, 0);
    if (marcadorUsuario) {
        marcadorUsuario.setMap(null);
        marcadorUsuario = null;
    }
}

var cars = [
  ['taxi1', -16.457618, -71.529091, 4],
    ['taxi2', -16.455180, -71.529413, 3],
    ['taxi3', -16.457464, -71.527922, 2],
    ['taxi4', -16.460479, -71.528651, 1]
];

function setMarkers(map) {
    //console.log('hhjh');
    var image = {
        url: 'images/car.png',
        size: new google.maps.Size(39, 75),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    };

    for (var i = 0; i < cars.length; i++) {
        var taxi = cars[i];
        var marker = new google.maps.Marker({
            position: {
                lat: taxi[1],
                lng: taxi[2]
            },
            map: map,
            icon: image,
            title: taxi[0],
            zIndex: taxi[3]
        });
    }
}



function direccion(){
    //solicitarEstimado();
    //$('#origenInicio').html(localStorage.getItem('origen'));
};


$("#return").click(regresar);

function regresar() {
    $('#pickup').show();
    $('#pru').hide();
}

// Set Pickup

var line = $('footer ul li:nth-child(1) a');
var lyft = $('footer ul li:nth-child(2) a');
var plus = $('footer ul li:nth-child(3) a');
var premier = $('footer ul li:nth-child(4) a');

// prueba

var tipoNum = null;


line.click(function () {
    //console.log('si');
    tipoNum = 1;
    solicitarEstimado(tipoNum);
    localStorage.setItem('carro', 'Line');
});

lyft.click(function () {
    tipoNum = 2;
    solicitarEstimado(tipoNum);
    localStorage.setItem('carro', 'Lyft');
});

plus.click(function () {
    tipoNum = 3;
    solicitarEstimado(tipoNum);
    localStorage.setItem('carro', 'Plus');
});

premier.click(function () {
    tipoNum = 4;
    solicitarEstimado(tipoNum);
    localStorage.setItem('carro', 'Premier');
    //console.log(dataGlobal.origen );
});


// Requerimiento Solicitar Estimado

function solicitarEstimado(tipoNum) {
    $.ajax({
        url: 'https://clientes.geekadvice.pe/api/estimado',
        data:{
            tipo: tipoNum,
        }
    }).success(function(_data) {
        console.log(_data);
        dataGlobal = _data;
        $('#btnPickup').click(nextPage);
    }).fail(function () {
        alert('error')
    });
}


function nextPage() {
    $('#pickup').hide();
    $('#pru').show();
    //console.log($('#nameCar'));
    $('#nameCar').html('<p>' + localStorage.getItem('carro') + '</p>' +
        '<p>Fast ride, 4 seats</p>');

    $('#precioEstimado').html('<p>' + dataGlobal.estimado.moneda + dataGlobal.estimado.min + ' - ' + dataGlobal.estimado.max + '</p>' +
        '<p>Price estimate</p>');

    $('#direccionOrigen').html('<p>' + dataGlobal.origen + '</p>');
    $('#direccionDestino').html('<p>' + dataGlobal.destino + '</p>');
}

// Next

$('#btnRequest').click(function(){
    location.href = "conductor.html";
});