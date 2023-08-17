var numAtualPedido = localStorage.getItem('numeroPedido');

const url = "http://localhost:3390";
fetch(`${url}/read/rte/true`)
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

        cell1.innerHTML = pedido.cod;
        cell2.innerHTML = pedido.largura;
        cell3.innerHTML = pedido.desc;
        cell4.innerHTML = pedido.modelo;
        cell5.innerHTML = pedido.linear;
        cell6.innerHTML = pedido.m2;
        cell7.innerHTML = pedido.oz;

        /*             tara += parseFloat(pedido.tara);
                peso += parseFloat(pedido.peso);
                met += parseFloat(pedido.met);
                linear += parseFloat(pedido.linear);
        
                if(obj.length == index+1) {
                    
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
                    cell10.innerHTML = ((peso-tara)/met).toFixed(3); //linear
                } */

    });

};

function navegar() {
    location.href = "../index.html"
}