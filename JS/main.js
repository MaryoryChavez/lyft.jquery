    var input = document.getElementById("inputNumber");
    var dialNumber = document.getElementById("dialNumber");

    function listCountries(evt) {
        var listCountries = document.getElementById("listCountries");
        var nombre = document.getElementById("valorCount");
        for (var i = 0; i < countries.length; i++) {
            var li = document.createElement("LI");
            li.innerHTML = '<div src="" class="flag flag-' + countries[i].code.toLowerCase() + '" alt="" >' + '</div>' + '<a href="" onclick="dial(' + i + ',event)">' + countries[i].name + '</a>';

            dialNumber.innerHTML = "+51";
            nombre.innerHTML = '<div src="" class="flag flag-pe" alt=""></div>';
            listCountries.appendChild(li);
        }
        console.log(countries[0].code.toLowerCase());
        evt.preventDefault();
    }

    function dial(num, evt) {
        var nombre = document.getElementById("valorCount");
        dialNumber.innerHTML = countries[num].dial_code;
        nombre.innerHTML = '<div src="" class="flag flag-' + countries[num].code.toLowerCase() + '" alt="" >' + '</div>';
        evt.preventDefault();
    }

    function aleatoriPass() {
        var aleatory = "LAB-" + Math.round(Math.random() * (999 - 100) + parseInt(100));
        alert("Tu codigo es: " + aleatory);
        localStorage.setItem("codigo", aleatory);
        var cellphone = dialNumber.innerHTML + "" + input.value;
        localStorage.setItem("cellphone", cellphone);
        location.href = "signup2.html";
    }