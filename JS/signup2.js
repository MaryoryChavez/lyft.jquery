$("#boton").click(validate);

function theName(_nameUser){
    if(_nameUser.length<3 || _nameUser.length >30){
        alertify.alert("Debes ingresar tus datos")
        return false;
    }else{
            localStorage.setItem("nombre",_nameUser);
            var nombre = localStorage.getItem("nombre");
        return true;
    }
}

function theMail(_emailUser){
    if(_emailUser.length<3 || _emailUser.length>50){
     alertify.alert("Debes ingresar tus datos")
        return false;   
    }else{
        localStorage.setItem("email",_emailUser);
        return true;
    }
}

function validate(){
    var nameUser = $("#nameUser").val();
    var emailUser = $("#emailUser").val();
    
    if(theName(nameUser)==true && theMail(emailUser)==true){
        alertify.alert("Datos guardados correctamente");
        location.href = "mapa.html";
    }
    console.log(localStorage.length)
}