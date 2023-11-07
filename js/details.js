var numAtualPedido = localStorage.getItem('pedido');

const url = "https://api-expedicao.vercel.app";
fetch(`${url}/read/pedido/${numAtualPedido}`)
    .then((x) => x.json())
    .then((res) => {
        list(res);
        filtro(res);
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
        var cell12 = row.insertCell();

        cell1.innerHTML = index + 1;
        cell2.innerHTML = pedido._id;
        cell3.innerHTML = pedido.nu_pedido;
        cell4.innerHTML = pedido.nm_cliente;
        cell5.innerHTML = pedido.model;
        cell6.innerHTML = pedido.len;
        cell7.innerHTML = pedido.codigo;
        cell8.innerHTML = pedido.tara;
        cell9.innerHTML = pedido.peso;
        cell10.innerHTML = pedido.met;
        cell11.innerHTML = pedido.linear;
        cell12.innerHTML = pedido.status;

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
            var cell11 = rowResult.insertCell();

            cell1.innerHTML = "TOTAL";
            cell2.innerHTML = "";
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            cell5.innerHTML = "";
            cell6.innerHTML = "";
            cell7.innerHTML = "";
            cell8.innerHTML = tara; //tara
            cell9.innerHTML = peso; //peso
            cell10.innerHTML = met; //met
            cell11.innerHTML = ((peso - tara) / met).toFixed(3); //linear
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
                filtro(res);
            })
    } else {
        document.querySelector("tbody").innerHTML = '';

        fetch(`${url}/read/pedido/true`)
            .then((x) => x.json())
            .then((res) => {
                list(res);
                filtro(res);
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
    localStorage.setItem('pedido', '');
    localStorage.setItem('cliente', '');
    localStorage.setItem('model', '');
    localStorage.setItem('len', '');
    localStorage.setItem('codigo', '');
    localStorage.setItem('tara', '');

    navegar();
};

function filtro(artigo) {

    artigo.forEach(data => {
        let art = data.codigo;
        var existing = false;

        document.querySelectorAll("option").forEach((result) => {
            if (result.value.includes(art)) {
                existing = true;
            };
        });

        if (existing === false) {
            let selectFiltro = document.querySelector(".filtro");
            const option = document.createElement('option');
            option.value = art;
            option.innerHTML = art;

            selectFiltro.appendChild(option);
        };


    });

};

function selectedFiltro(event) {
    let valorComparador = event.target.value;

    if (valorComparador === "todos") {

        document.querySelector('tbody').innerHTML = "";

        fetch(`${url}/read/pedido/${numAtualPedido}`)
            .then((x) => x.json())
            .then((res) => {
                list(res);
                filtro(res);
            });
    } else {
        fetch(`${url}/read/pedido/${numAtualPedido}`)
            .then((x) => x.json())
            .then((res) => {

                let resultFiltro = res.filter((x) => x.codigo == valorComparador);

                document.querySelector('tbody').innerHTML = "";

                list(resultFiltro);

            });
    };

};

function navegar() {
    location.href = "../index.html"
}
