// This is a JavaScript file

var opcaoAgendado;

$(document).on("click", "#btnVoltar", function () {
  if (opcaoAgendado == "lista") {
    $(location).attr("href", "menu.html");
  }
  else if (opcaoAgendado == "Mostra") {
    location.reload();
  }
});

function listarPedidoAgendado() {
  var status = 02;
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/listarPedidoSt.php",
    data: "status=" + status,
    dataType: "json",
    success: function (data) {
      var novoPedido = "";
      $.each(data.pedido, function (i, dados) {
        var dataEntrega = (dados.dataEntrega);
        var dateEntrega = new Date(dataEntrega);
        if (dateEntrega.getHours() < 10) {
          if (dateEntrega.getMinutes() < 10) {
            var horaEntrega = "0" + dateEntrega.getHours();
            var minEntrega = "0" + dateEntrega.getMinutes();
          }
          else {
            var horaEntrega = "0" + dateEntrega.getHours();
            var minEntrega = dateEntrega.getMinutes();
          }
        }
        else {
          if (dateEntrega.getMinutes() < 10) {
            var horaEntrega = dateEntrega.getHours();
            var minEntrega = "0" + dateEntrega.getMinutes();
          }
          else {
            var horaEntrega = dateEntrega.getHours();
            var minEntrega = dateEntrega.getMinutes();
          }
        }
        novoPedido += "<div class='row linha itemProd' data-id='" + dados.codigo + "'><div class='col-xs-12'><label for=''><strong>Cliente:</strong><br>" + dados.cliente + "</label><br><label for=''><strong>Endereço:</strong><br>" + dados.endereco + ", " + dados.numero + ", " + dados.bairro + ", " + dados.cidade + ", " + dados.UF + "</label><br><label for=''><strong>Entrega: </strong><br>" + (dateEntrega.getDate() + "/" + (dateEntrega.getMonth() + 1) + "/" + dateEntrega.getFullYear() + ", às " + horaEntrega + ":" + minEntrega) + "</label><br><label for=''><strong>Valor:</strong><br>R$ " + dados.valor + "</label><br></div></div>";
      });
      $("#divAgendada").html(novoPedido);
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", ".itemProd", function () {
  var codigo = $(this).data('id');
  opcaoAgendado = "Mostra";
  mostrarPedido();
  $("#hMostra").attr("value", codigo);
  setPedidoAgendado(codigo);
});

function mostrarPedido(){
  var pedido = "<div class='row linha'><div class='col-xs-12'><h3 id='hMostra' value=''>Informações do pedido</h3></div></div><div class='row linha'><div class='col-xs-12'><p><strong>Endereço:</strong></p><p id='endereco'></p></div></div><div class='row linha'><div class='col-xs-12'><p><strong>Referência:</strong></p><p id='referencia'></p></div></div><div class='row linha'><div class='col-xs-12'><p><strong>Cliente</strong>:</p><p id='cliente'></p></div></div><div class='row linha'><div class='col-xs-12'><h4>Entrega:</h4><div class='col-xs-6'><p><strong>Data:</strong></p><p id='dataEntrega'></p></div><div class='col-xs-6'><p><strong>Horário:</strong></p><p id='horaEntrega'></p></div></div></div><div class='row linha'><div class='col-xs-12'><h4>Retirada:</h4><div class='col-xs-6'><p><strong>Data:</strong></p><p id='dataRetirada'></p></div><div class='col-xs-6'><p><strong>Horário:</strong></p><p id='horaRetirada'></p></div></div></div><div class='row linha'><div class='col-md-12'><h4>Produtos:</h4><table><tr><th>Mesas</th><td></td><td><label id='qt_mesas'></label></td></tr><tr><th>Cadeiras</th><td></td><td><label id='qt_cadeiras'></label></td></tr><tr><th>Toalhas</th><td><label id='corToalha'></label></td><td><label id='qt_toalhas'></label></td></tr></table></div></div><div class='row linha'><div class='col-xs-6'><p><strong>Feito em:</strong></p><p id='dataPedido'></p></div><div class='col-xs-6'><p><strong>Valor:</strong></p><p id='valor'></p></div></div><div class='row linha'><div class='col-xs-12'><div id='map'><script src='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js'></script><link type='text/css' rel='stylesheet' href='https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css' /></div></div></div><div class='row linha'><div class='col-xs-6'></div><div class='col-xs-6'><button class='btn btn-success btn-block' id='btnConcluir'>Concluir pedido</button></div></div>";
  $("#divAgendada").html(pedido);
}

function setPedidoAgendado(codigo) {
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/mostrarPedidoCompleto.php",
    data: "codigo=" + codigo,
    dataType: "json",
    success: function(data) {
      document.getElementById('endereco').textContent = (data.pedido.endereco + ", " + data.pedido.numero + ", " + data.pedido.bairro + ", " + data.pedido.cidade + ", " + data.pedido.UF);
      document.getElementById('referencia').textContent = (data.pedido.referencia);
      document.getElementById('cliente').textContent = (data.pedido.cliente);
      //Entrega
      var dataEntrega = new Date(data.pedido.dataEntrega);
      //data
      if (dataEntrega.getDate() < 10) {
        if ((dataEntrega.getMonth() + 1) < 10) {
          document.getElementById('dataEntrega').textContent = ("0" + dataEntrega.getDate() + "/0" + (dataEntrega.getMonth() + 1) + "/" + dataEntrega.getFullYear());
        }
        else {
          document.getElementById('dataEntrega').textContent = ("0" + dataEntrega.getDate() + "/" + (dataEntrega.getMonth() + 1) + "/" + dataEntrega.getFullYear());
        }
      }
      else {
        if ((dataEntrega.getMonth() + 1) < 10) {
          document.getElementById('dataEntrega').textContent = (dataEntrega.getDate() + "/0" + (dataEntrega.getMonth() + 1) + "/" + dataEntrega.getFullYear());
        }
        else {
          document.getElementById('dataEntrega').textContent = (dataEntrega.getDate() + "/" + (dataEntrega.getMonth() + 1) + "/" + dataEntrega.getFullYear());
        }
      }
      //hora
      if (dataEntrega.getHours() < 10) {
        if (dataEntrega.getMinutes() < 10) {
          document.getElementById('horaEntrega').textContent = ("0" + dataEntrega.getHours() + ":0" + dataEntrega.getMinutes());
        }
        else {
          document.getElementById('horaEntrega').textContent = ("0" + dataEntrega.getHours() + ":" + dataEntrega.getMinutes());
        }
      }
      else {
        if (dataEntrega.getMinutes() < 10) {
          document.getElementById('horaEntrega').textContent = (dataEntrega.getHours() + ":0" + dataEntrega.getMinutes());
        }
        else {
          document.getElementById('horaEntrega').textContent = (dataEntrega.getHours() + ":" + dataEntrega.getMinutes());
        }
      }
      //Retirada
      var dataRetirada = new Date(data.pedido.dataRetirada);
      //data
      if (dataRetirada.getDate() < 10) {
        if ((dataRetirada.getMonth() + 1) < 10) {
          document.getElementById('dataRetirada').textContent = ("0" + dataRetirada.getDate() + "/0" + (dataRetirada.getMonth() + 1) + "/" + dataRetirada.getFullYear());
        }
        else {
          document.getElementById('dataRetirada').textContent = ("0" + dataRetirada.getDate() + "/" + (dataRetirada.getMonth() + 1) + "/" + dataRetirada.getFullYear());
        }
      }
      else {
        if ((dataRetirada.getMonth() + 1) < 10) {
          document.getElementById('dataRetirada').textContent = (dataRetirada.getDate() + "/0" + (dataRetirada.getMonth() + 1) + "/" + dataRetirada.getFullYear());
        }
        else {
          document.getElementById('dataRetirada').textContent = (dataRetirada.getDate() + "/" + (dataRetirada.getMonth() + 1) + "/" + dataRetirada.getFullYear());
        }
      }
      //hora
      if (dataRetirada.getHours() < 10) {
        if (dataRetirada.getMinutes() < 10) {
          document.getElementById('horaRetirada').textContent = ("0" + dataRetirada.getHours() + ":0" + dataRetirada.getMinutes());
        }
        else {
          document.getElementById('horaRetirada').textContent = ("0" + dataRetirada.getHours() + ":" + dataRetirada.getMinutes());
        }
      }
      else {
        if (dataRetirada.getMinutes() < 10) {
          document.getElementById('horaRetirada').textContent = (dataRetirada.getHours() + ":0" + dataRetirada.getMinutes());
        }
        else {
          document.getElementById('horaRetirada').textContent = (dataRetirada.getHours() + ":" + dataRetirada.getMinutes());
        }
      }
      //Produtos
      document.getElementById('qt_mesas').textContent = (data.pedido.qt_mesas);
      document.getElementById('qt_cadeiras').textContent = (data.pedido.qt_cadeiras);
      if (((data.pedido.corToalha) != null) && ((data.pedido.corToalha) != '')) {
        document.getElementById('corToalha').textContent = (data.pedido.corToalha);
      }
      else {
        document.getElementById('corToalha').textContent = "Nenhuma";
      }
      if (((data.pedido.qt_toalhas) != null) && ((data.pedido.qt_toalhas) != '')) {
        document.getElementById('qt_toalhas').textContent = (data.pedido.qt_toalhas);
      }
      else {
        document.getElementById('qt_toalhas').textContent = "0";
      }
      //Pedido
      var dataPedido = new Date(data.pedido.dataPedido);
      if (dataPedido.getDate() < 10) {
        if ((dataPedido.getMonth() + 1) < 10) {
          document.getElementById('dataPedido').textContent = ("0" + dataPedido.getDate() + "/0" + (dataPedido.getMonth() + 1) + "/" + dataPedido.getFullYear());
        }
        else {
          document.getElementById('dataPedido').textContent = ("0" + dataPedido.getDate() + "/" + (dataPedido.getMonth() + 1) + "/" + dataPedido.getFullYear());
        }
      }
      else {
        if ((dataPedido.getMonth() + 1) < 10) {
          document.getElementById('dataPedido').textContent = (dataPedido.getDate() + "/0" + (dataPedido.getMonth() + 1) + "/" + dataPedido.getFullYear());
        }
        else {
          document.getElementById('dataPedido').textContent = (dataPedido.getDate() + "/" + (dataPedido.getMonth() + 1) + "/" + dataPedido.getFullYear());
        }
      }
      //valor
      document.getElementById('valor').textContent = "R$ " + (data.pedido.valor);
      //mapa
      var numero = (data.pedido.numero);
      var endereco = (data.pedido.endereco);
      var bairro = (data.pedido.bairro)
      var cidade = (data.pedido.cidade);
      var UF = (data.pedido.UF);
      mapa(numero, endereco, bairro, cidade, UF);
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", "#btnConcluir", function () {
  var codigo = $("#hMostra").attr("value");
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/concluirPedido.php",
    data: "codigo=" + codigo,
    success: function (data) {
      navigator.notification.alert(data);
      location.reload();
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  })
});

function mapa(numero, endereco, bairro, cidade, UF) {
  L.mapquest.key = '8iWALlAQQkOmV1ORrJXPkBKCBKTpdNAA';

  var map = L.mapquest.map('map', {
    center: [0, 0],
    layers: L.mapquest.tileLayer('map'),
    zoom: 15
  });
  
  L.mapquest.directions().route({
    start: {street: '496 Rua São Miguel', neighborhood: 'Agenor de Campos', city: 'Mongaguá', state: 'São Paulo', country: 'Brazil'},
    end: {street: (numero+' '+endereco), neighborhood: (bairro), city: (cidade), state: (UF), country: 'Brazil'}
  });
  
  /*
  L.mapquest.geocoding().geocode(local);
  */
  /*
  var onSuccess = function (position) {
    $("#valLat").val(position.coords.latitude);
    $("#valLng").val(position.coords.longitude);
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  function mapa(position) {

    L.mapquest.key = '8iWALlAQQkOmV1ORrJXPkBKCBKTpdNAA';

    var map = L.mapquest.map('map', {
      center: [0, 0],
      layers: L.mapquest.tileLayer('map'),
      zoom: 15
    });
    L.mapquest.geocoding().geocode(document.getElementById('endereco').textContent);

    L.marker([position.coords.latitude, position.coords.longitude], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    }).bindPopup('Denver, CO').addTo(map);

    map.addControl(L.mapquest.control());
  };
  navigator.geolocation.getCurrentPosition(mapa);
  function onFail(message) {
    alert('Failed because: ' + message);
  }

  navigator.geolocation.getCurrentPosition(mapa);
  */
}