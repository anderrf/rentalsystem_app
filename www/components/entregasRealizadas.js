// This is a JavaScript file

var opcaoRealizado;

function verOpcaoRealizado() {
  if (opcaoRealizado == "lista") {
    $("#divLista").prop("hidden", false);
    $("#divMostra").prop("hidden", true);
    listarPedidoRealizado();
  }
  else if (opcaoRealizado == "Mostra") {
    $("#divLista").prop("hidden", true);
    $("#divMostra").prop("hidden", false);
  }
}

$(document).on("click", "#btnVoltar", function () {
  if (opcaoRealizado == "lista") {
    $(location).attr("href", "menu.html");
  }
  else if (opcaoRealizado == "Mostra") {
    location.reload();
  }
});

function listarPedidoRealizado() {
  var status = 03;
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/listarPedidoSt.php",
    data: "status=" + status,
    dataType: "json",
    success: function (data) {
      var novoPedido = "";
      $.each(data.pedido, function (i, dados) {
        var dataRetirada = (dados.dataRetirada);
        var dateRetirada = new Date(dataRetirada);
        if (dateRetirada.getHours() < 10) {
          if (dateRetirada.getMinutes() < 10) {
            var horaRetirada = "0" + dateRetirada.getHours();
            var minRetirada = "0" + dateRetirada.getMinutes();
          }
          else {
            var horaRetirada = "0" + dateRetirada.getHours();
            var minRetirada = dateRetirada.getMinutes();
          }
        }
        else {
          if (dateRetirada.getMinutes() < 10) {
            var horaRetirada = dateRetirada.getHours();
            var minRetirada = "0" + dateRetirada.getMinutes();
          }
          else {
            var horaRetirada = dateRetirada.getHours();
            var minRetirada = dateRetirada.getMinutes();
          }
        }
        novoPedido += "<div class='row linha itemProd' data-id='" + dados.codigo + "'><div class='col-xs-12'><label for=''><strong>Cliente:</strong><br>" + dados.cliente + "</label><br><label for=''><strong>Endereço:</strong><br>" + dados.endereco + ", " + dados.numero + ", " + dados.bairro + ", " + dados.cidade + ", " + dados.UF + "</label><br><label for=''><strong>Retirada: </strong><br>" + (dateRetirada.getDate() + "/" + (dateRetirada.getMonth() + 1) + "/" + dateRetirada.getFullYear() + ", às " + horaRetirada + ":" + minRetirada) + "</label><br><label for=''><strong>Valor:</strong><br>R$ " + dados.valor + "</label><br></div></div>";
      });
      $("#divLista").html(novoPedido);
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", "#btnPesquisaRealizada", function () {
  var pesquisa = $("#pesquisaRealizada").val();
  if (pesquisa.length < 3) {
    navigator.notification.alert("Conteúdo digitado é insuficiente para a pesquisa.");
  }
  else {
    var status = 03;
    var form_data = new FormData();
    form_data.append("pesquisa", pesquisa);
    form_data.append("status", status);
    $.ajax({
      type: "post",
      url: "https://rentalsystempm.000webhostapp.com/php/pedido/pesquisarPedidoApp.php",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        opcaoAgendado = "lista";
        var novoPedido = "";
        $.each(data.pedido, function (i, dados) {
          var dataRetirada = (dados.dataRetirada);
          var dateRetirada = new Date(dataRetirada);
          if (dateRetirada.getHours() < 10) {
            if (dateRetirada.getMinutes() < 10) {
              var horaRetirada = "0" + dateRetirada.getHours();
              var minRetirada = "0" + dateRetirada.getMinutes();
            }
            else {
              var horaRetirada = "0" + dateRetirada.getHours();
              var minRetirada = dateRetirada.getMinutes();
            }
          }
          else {
            if (dateRetirada.getMinutes() < 10) {
              var horaRetirada = dateRetirada.getHours();
              var minRetirada = "0" + dateRetirada.getMinutes();
            }
            else {
              var horaRetirada = dateRetirada.getHours();
              var minRetirada = dateRetirada.getMinutes();
            }
          }
          novoPedido += "<div class='row linha itemProd' data-id='" + dados.codigo + "'><div class='col-xs-12'><label for=''><strong>Cliente:</strong><br>" + dados.cliente + "</label><br><label for=''><strong>Endereço:</strong><br>" + dados.endereco + ", " + dados.numero + ", " + dados.bairro + ", " + dados.cidade + ", " + dados.UF + "</label><br><label for=''><strong>Retirada: </strong><br>" + (dateRetirada.getDate() + "/" + (dateRetirada.getMonth() + 1) + "/" + dateRetirada.getFullYear() + ", às " + horaRetirada + ":" + minRetirada) + "</label><br><label for=''><strong>Valor:</strong><br>R$ " + dados.valor + "</label><br></div></div>";
        });
        $("#divMostra").prop("hidden", true);
        $("#divLista").prop("hidden", false);
        $("#divLista").html(novoPedido);
      },
      error: function (data) {
        alert(data);
      }
    });
  }
});

$(document).on("click", ".itemProd", function () {
  var codigo = $(this).data('id');
  opcaoRealizado = "Mostra";
  verOpcaoRealizado();
  $("#hMostra").attr("value", codigo);
  setPedidoRealizado(codigo);
});

function setPedidoRealizado(codigo) {
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/mostrarPedidoCompleto.php",
    data: "codigo=" + codigo,
    dataType: "json",
    success: function (data) {
      //document.getElementById('endereco').textContent = ((data.pedido.endereco)+", "+(data.pedido.numero)+", "+(data.pedido.bairro)+", "+(data.pedido.cidade)+", "+(data.pedido.UF));
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