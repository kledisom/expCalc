var numAtualPedido = localStorage.getItem('numeroPedido');

const url = "http://localhost:3390";
fetch(`${url}/read/pedido/${numAtualPedido}`)
    .then((x) => x.json())
    .then((res) => {
        list(res);
    })

function list(obj) {
    const tbody = document.querySelector("tbody");
    var tara = 0;
    var peso = 0;
    var met = 0;
    var linear = 0;

    obj.map((pedido, index) => {
        var row = tbody.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        var cell7 = row.insertCell();
        var cell8 = row.insertCell();
        var cell9 = row.insertCell();
        var cell10 = row.insertCell();
        var cell11 = row.insertCell();

        cell1.innerHTML = pedido.id;
        cell2.innerHTML = pedido.nu_pedido;
        cell3.innerHTML = pedido.nm_cliente;
        cell4.innerHTML = pedido.model;
        cell5.innerHTML = pedido.len;
        cell6.innerHTML = pedido.codigo;
        cell7.innerHTML = pedido.tara;
        cell8.innerHTML = pedido.peso;
        cell9.innerHTML = pedido.met;
        cell10.innerHTML = pedido.linear;
        cell11.innerHTML = pedido.status;

        tara += parseFloat(pedido.tara);
        peso += parseFloat(pedido.peso);
        met += parseFloat(pedido.met);
        linear += parseFloat(pedido.linear);

        if (obj.length == index + 1) {

            var rowResult = tbody.insertRow();
            var cell1 = rowResult.insertCell();
            var cell2 = rowResult.insertCell();
            var cell3 = rowResult.insertCell();
            var cell4 = rowResult.insertCell();
            var cell5 = rowResult.insertCell();
            var cell6 = rowResult.insertCell();
            var cell7 = rowResult.insertCell();
            var cell8 = rowResult.insertCell();
            var cell9 = rowResult.insertCell();
            var cell10 = rowResult.insertCell();

            cell1.innerHTML = "TOTAL";
            cell2.innerHTML = "";
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            cell6.innerHTML = "";
            cell5.innerHTML = "";
            cell7.innerHTML = tara; //tara
            cell8.innerHTML = peso; //peso
            cell9.innerHTML = met; //met
            cell10.innerHTML = ((peso - tara) / met).toFixed(3); //linear
        }

    });

};

function buscar() {
    let nuPedido = prompt('Digite o numero do pedido');

    if (nuPedido) {
        document.querySelector("tbody").innerHTML = '';

        fetch(`${url}/read/pedido/${nuPedido}`)
            .then((x) => x.json())
            .then((res) => {
                list(res);
            })
    } else {
        document.querySelector("tbody").innerHTML = '';

        fetch(`${url}/read/pedido/true`)
            .then((x) => x.json())
            .then((res) => {
                list(res);
            })
    }

};

function apagar() {
    let idPedido = prompt('Digite o id do pedido que deseja apagar');

    document.querySelector("tbody").innerHTML = '';

    if (idPedido) {
        fetch(`${url}/delete/pedido/${idPedido}`, {
            method: "DELETE"
        })
            .then((x) => x.json())
            .then((res) => {
                fetch(`${url}/read/pedido/true`)
                    .then((x) => x.json())
                    .then((res) => {
                        list(res);
                    })

            })
    } else {
        document.querySelector("tbody").innerHTML = '';

        fetch(`${url}/read/pedido/true`)
            .then((x) => x.json())
            .then((res) => {
                list(res);
            })
    }
};

function novo() {
    localStorage.setItem('numeroPedido', '');
    localStorage.setItem('nomeCliente', '');
    localStorage.setItem('model', '');
    localStorage.setItem('len', '');
    localStorage.setItem('codigo', '');
    localStorage.setItem('tara', '');

    navegar();
};

function navegar() {
    location.href = "../index.html"
}