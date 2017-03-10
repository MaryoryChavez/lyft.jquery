var propina = $('#tip li');

$(document).ready(init);

function init() {
    $.ajax({
        url: 'https://clientes.geekadvice.pe/api/carrera',
    }).success(function (_data) {
        imagen(_data);
    }).fail(function () {
        alert('error');
    })
}

propina.on('click', function () {
    $(this).addClass('select').siblings().removeClass('select');
    var propinaFinal = $(this).html().substr(1);
    pago(propinaFinal);
    return false;
})

function imagen(foto) {
    $('#foto').html('<img src=' + foto.conductor.url + ' alt="">');
}

function pago(_propina) {
    $.ajax({
        url: 'https://clientes.geekadvice.pe/api/estimado?tipo=' + localStorage.getItem('tipo'),
    }).success(function (_data1) {
        var min = _data1.estimado.min;
        var max = _data1.estimado.max;
        pagoRandom(min, max, _propina)
    }).fail(function () {
        alert('error');
    })
}

function pagoRandom(min, max, _propina) {
    var random = Math.round(Math.random()* (max-min)+min);
    var total;
    if(_propina % 1 == 0){
        total = parseFloat(_propina) + random;
    }else{
        total = random;
    }
    $('#total').html('<h2>$'+total.toFixed(2)+'</h2>');
}
