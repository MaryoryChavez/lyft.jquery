var map;
var registrandoPosicion = false;
var idRegistroPosicion;
var ultimaPosicionUsuario;
var marcadorUsuario;
var mapa;
var div = document.getElementById("map");

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
    } else {
        var posicionActual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        ultimaPosicionUsuario = posicionActual;
        marcadorUsuario.setPosition(posicionActual);
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
    ['taxi2', -16.455180, -71.529413,3],
    ['taxi3',-16.457464, -71.527922,2],
    ['taxi4',-16.460479, -71.528651,1]
];

function setMarkers(map) {
    console.log('hhjh');
    var image = {
    url: 'images/car.png',
    size: new google.maps.Size(39, 75),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

    for (var i = 0; i < cars.length; i++) {
    var taxi = cars[i];
    var marker = new google.maps.Marker({
      position: {lat: taxi[1], lng: taxi[2]},
      map: map,
      icon: image,
      title: taxi[0],
      zIndex: taxi[3]
    });
  }
}

$('#btnPickup').click(nextPage);

function nextPage(){
    $('#pickup').hide();
    $('#pru').show();
}
