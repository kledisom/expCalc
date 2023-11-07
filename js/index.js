const btnSave = document.querySelector('#btn-save');

document.querySelectorAll("input").forEach((campo)=>{
    campo.addEventListener("blur", () => {
        localStorage.setItem(campo.name, campo.value);
    });
});

document.querySelector('#pedido').value = localStorage.getItem('pedido');
document.querySelector('#cliente').value = localStorage.getItem('cliente');
document.querySelector('#model').value = localStorage.getItem('model');
document.querySelector('#len').value = localStorage.getItem('len');
document.querySelector('#codigo').value = localStorage.getItem('codigo');
document.querySelector('#tara').value = localStorage.getItem('tara');
document.querySelector('#defaultLinear').value = localStorage.getItem('linear');

document.querySelector('#codigo').addEventListener("blur", () => {
    let flag = document.querySelector('#codigo').value.length;
    if (flag === 8) {
        let numeroCod = document.querySelector('#codigo').value;

        const url = "https://api-expedicao.vercel.app";
        fetch(`${url}/read/rte/${numeroCod}`)
            .then((x) => x.json())
            .then((rte) => {
                document.querySelector('#model').value = rte[0].modelo;
                document.querySelector('#len').value = rte[0].largura;
                document.querySelector('#defaultLinear').value = rte[0].linear;
                localStorage.setItem('model', rte[0].modelo);
                localStorage.setItem('len', rte[0].largura);
                localStorage.setItem('linear', rte[0].linear);
                console.log(rte[0].modelo)
            })
    }
})

btnSave.addEventListener('click', (e) => {
    e.preventDefault();

    let numeroCod = document.querySelector('#codigo').value;

    const url = "https://api-expedicao.vercel.app";
    fetch(`${url}/read/rte/${numeroCod}`)
        .then((x) => x.json())
        .then((rte) => {
            calculating(parseFloat(rte[0].linear.replace(",", ".")));
            console.log(parseFloat(rte[0].linear.replace(",", ".")))
        })

});

function calculating(rte) {
    const numeroPedido = document.querySelector('#pedido').value;
    const nomeCliente = document.querySelector('#cliente').value;
    const model = document.querySelector('#model').value;
    const len = document.querySelector('#len').value;
    const codigo = document.querySelector('#codigo').value;
    const tara = document.querySelector('#tara').value;
    const peso = document.querySelector('#peso').value;
    const met = document.querySelector('#met').value;
    const display = document.querySelector('#display');

   /*  localStorage.setItem('numeroPedido', numeroPedido);
    localStorage.setItem('nomeCliente', nomeCliente); */
    /*     localStorage.setItem('model', model);
        localStorage.setItem('len', len); */
    localStorage.setItem('codigo', codigo);
    localStorage.setItem('tara', tara);


    const linear = parseFloat((peso - tara) / met).toFixed(3);

    const array = [numeroPedido, nomeCliente, model, len, codigo, tara, peso, met, linear];

    if (isNotEmpty(array[0]) && isNotEmpty(array[1]) && isNotEmpty(array[4]) && isNotEmpty(array[5]) && isNotEmpty(array[6]) && isNotEmpty(array[7])) {

        display.innerHTML = linear;

        let min = rte - 0.015;
        let max = rte + 0.015;

        console.log(min, max)

        const obj = {
            "nu_pedido": array[0],
            "nm_cliente": array[1],
            "model": array[2],
            "len": array[3],
            "codigo": array[4],
            "tara": array[5],
            "peso": array[6],
            "met": array[7],
            "linear": array[8],
            "status": (linear >= min && linear <= max) ? "aprovado" : "desaprovado"
        }

        localStorage.setItem('bd_expedicao', '');
        var bd = localStorage.getItem('bd_expedicao');


        if (bd.length > 0) {
            var arrModifie = JSON.parse(bd);
            arrModifie.push(obj);

            localStorage.setItem('bd_expedicao', JSON.stringify(arrModifie));
        } else {


            localStorage.setItem('bd_expedicao', JSON.stringify([obj]));
        }


        if (linear >= min && linear <= max) {
            display.classList.add("aproved");
            display.classList.remove("disapproved");
            //sendObj(array, "aprovado");

        } else {
            display.classList.add("disapproved");
            display.classList.remove("aproved");
            //sendObj(array, "desaprovado");
        }

        document.getElementById("peso").value = '';
        document.getElementById("met").value = '';
        eventPeso.focus();

    } else {
        alert("Por favor preencha os campos corretamente")
    }

};

function sendObj(array, status) {
    const url = "https://api-expedicao.vercel.app";

var bd = localStorage.getItem('bd_expedicao');

    var array = JSON.parse(bd);

    const obj = {
        "nu_pedido": array[0],
        "nm_cliente": array[1],
        "model": array[2],
        "len": array[3],
        "codigo": array[4],
        "tara": array[5],
        "peso": array[6],
        "met": array[7],
        "linear": array[8],
        "status": status
    }

    array.forEach((item, i) => {

        fetch(`${url}/create/pedido`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        })
            .then((x) => x.json())
            .then((res) => {
                //alert("salvo");
                console.log(res)


                document.getElementById("peso").value = '';
                document.getElementById("met").value = '';
                eventPeso.focus();

                localStorage.setItem('bd_expedicao', '');

              if (i == array.length - 1) {
                    showDialog();
                    localStorage.setItem('bd_expedicao', '');
                    setTimeout(() => { closeDialog() }, 3000)
                }

            })
    });
};

function isNotEmpty(value) {
    return value !== '';
};

function modelAndlen() {
    var numAtualPedido = localStorage.getItem('numeroPedido');

    const url = "https://api-expedicao.vercel.app";
    fetch(`${url}/read/rte/true`)
        .then((x) => x.json())
        .then((res) => {
            list(res);
        })

    function list(obj) {

        obj.map((pedido, index) => {
            let model = document.querySelector('#model');
            const opt = document.createElement('option');
            opt.value = pedido.modelo;
            opt.innerHTML = pedido.modelo;

            model.appendChild(opt);

            let larg = document.querySelector('#len');
            const opt1 = document.createElement('option');
            opt1.value = pedido.largura;
            opt1.innerHTML = pedido.largura;

            larg.appendChild(opt1);

        });

    };
}

//modelAndlen();

function navegar(path) {
    location = `./views/${path}`
}

const dialog = document.getElementById("myDialog");

function showDialog() {
    dialog.show();
}

function closeDialog() {
    dialog.close();
} 

var autoSaving = localStorage.getItem("autoSaving") || false;
console.log(autoSaving)
if (localStorage.getItem("autoSaving") === 'true') {
    document.getElementById("auto-save").style.backgroundColor = "green";
} else {
    document.getElementById("auto-save").style.backgroundColor = "#5555";
}

function autoSave() {
    let getState = localStorage.getItem("autoSaving");
    if (getState) {
        localStorage.setItem("autoSaving", autoSaving);
    } else {
        autoSaving = getState;
    }

    if (getState === 'false') {
        localStorage.setItem("autoSaving", true);
        autoSaving = true;
        document.getElementById("auto-save").style.backgroundColor = "green";
    } else {
        localStorage.setItem("autoSaving", false);
        autoSaving = false;
        document.getElementById("auto-save").style.backgroundColor = "#5555";
    }
}

const eventPeso = document.getElementById("peso");
const eventMet = document.getElementById("met");

 eventPeso.addEventListener('input', () => {
    if (eventPeso.value.length === 6) {
        eventMet.focus();
    }
});

eventMet.addEventListener('input', () => {
    if (eventMet.value.length === 6 && autoSaving == "true") {
        btnSave.click();
    } 
});
