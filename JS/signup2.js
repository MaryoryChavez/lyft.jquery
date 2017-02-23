function theName(_nameUser){
    if(_nameUser.length<3 || _nameUser.length >30){
        alert("no")
        return false;
    }else{
            localStorage.setItem("nombre",_nameUser);
            var nombre = localStorage.getItem("nombre");
        return true;
    }
}

function theMail(_emailUser){
    if(_emailUser.length<3 || _emailUser.length>50){
     alert("no")
        return false;   
    }else{
        localStorage.setItem("email",_emailUser);
        return true;
    }
}

function validate(){
    var nameUser = document.getElementById("nameUser").value;
    var emailUser = document.getElementById("emailUser").value;
    
    if(theName(nameUser)==true && theMail(emailUser)==true){
        alert("si");
        location.href = "mapa.html";
    }
    console.log(localStorage.length)
}