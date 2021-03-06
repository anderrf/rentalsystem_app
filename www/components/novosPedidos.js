// This is a JavaScript file

function listarNovosPedidos() {
  var status = 01;
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/listarPedidoSt.php",
    data: "status=" + status,
    dataType: "json",
    success: function (data) {
      var novoPedido = "";
      $.each(data.pedido, function (i, dados) {
        var dataPedido = (dados.dataPedido);
        var datePedido = new Date(dataPedido);
        var dataEntrega = (dados.dataEntrega);
        var dateEntrega = new Date(dataEntrega);
        if(dateEntrega.getHours() < 10){
          if(dateEntrega.getMinutes() < 10){
            var horaEntrega = "0"+dateEntrega.getHours();
            var minEntrega = "0"+dateEntrega.getMinutes();
          }
          else{
            var horaEntrega = "0"+dateEntrega.getHours();
            var minEntrega = dateEntrega.getMinutes();
          }
        }
        else{
          if(dateEntrega.getMinutes() < 10){
            var horaEntrega = dateEntrega.getHours();
            var minEntrega = "0"+dateEntrega.getMinutes();
          }
          else{
            var horaEntrega = dateEntrega.getHours();
            var minEntrega = dateEntrega.getMinutes();
          }
        }
        novoPedido += "<div class='row linha itemProd' data-toggle='modal' data-target='#modalNovoPedido' data-id='"+dados.codigo+"'><div class='col-xs-12'><label for=''><strong>Cliente:</strong><br>"+dados.cliente+"</label><br><label for=''><strong>Endereço:</strong><br>"+dados.endereco+", "+dados.numero+", "+dados.bairro+", "+dados.cidade+", "+dados.UF+"</label><br><label for=''><strong>Feito em:</strong><br>"+(datePedido.getDate()+"/"+(datePedido.getMonth() + 1)+"/"+datePedido.getFullYear())+"</label><br><label for=''><strong>Entrega: </strong><br>"+(dateEntrega.getDate()+"/"+(dateEntrega.getMonth() + 1)+"/"+dateEntrega.getFullYear()+", às "+horaEntrega+":"+minEntrega)+"</label><br><label for=''><strong>Valor:</strong><br>R$ "+dados.valor+"</label><br></div></div>";
      });
      $("#itemPedido").html(novoPedido);
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", ".itemProd", function () {
  var codigo = $(this).data('id');
  $("#hPedido").val("Pedido");
  $("#hPedido").attr("value", codigo);
  var contPedido = "";
  contPedido += "<div class='row linha'><div class='col-xs-12'><label for=''>Cliente:</label><input class='form-control' type='text' id='cliente' readonly></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Endereço:</label><input class='form-control' type='text' id='endereco' readonly></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Referência:</label><input class='form-control' type='text' id='referencia' readonly></div></div><div class='row linha'><div class='col-xs-12'><h4>Entrega:</h4><div class='row'><div class='col-xs-6'><label for=''>Data:</label><input class='form-control' type='text' id='dataEntrega' readonly></div><div class='col-xs-6'><label for=''>Horário:</label><input class='form-control' type='text' id='horaEntrega' readonly></div></div></div></div><div class='row linha'><div class='col-xs-12'><h4>Retirada:</h4><div class='row'><div class='col-xs-6'><label for=''>Data:</label><input class='form-control' type='text' id='dataRetirada' readonly></div><div class='col-xs-6'><label for=''>Horário:</label><input class='form-control' type='text' id='horaRetirada' readonly></div></div></div></div><div class='row linha'><div class='col-xs-12'><h4>Produtos:</h4><div class='row linha'><div class='col-xs-2'><label>Mesas:</label></div><div class='col-xs-5'></div><div class='col-xs-5'><input class='form-control' type='number' id='mesas' readonly></div></div><div class='row linha'><div class='col-xs-2'><label>Cadeiras:</label></div><div class='col-xs-5'></div><div class='col-xs-5'><input class='form-control' type='number' id='cadeiras' readonly></div></div><div class='row linha'><div class='col-xs-2'><label>Toalhas:</label></div><div class='col-xs-5'><input class='form-control' type='text' id='corToalha' readonly></div><div class='col-xs-5'><input class='form-control' type='number' id='toalhas' readonly></div></div></div></div><div class='row linha'><div class='col-xs-6'><label for=''>Feito em:</label><input class='form-control' type='text' id='dataPedido' readonly ></div><div class='col-xs-6'><label for=''>Valor:</label><input class='form-control' type='number' id='valor' readonly ></div></div>";
  $("#moInner").html(contPedido);
  var optPedido = "";
  optPedido += "<button type='button' class='btn btn-success' id='btnAceitarPedido'>Aceitar</button><button type='button' class='btn btn-danger' id='btnNegarPedido'>Negar</button>";
  $("#moFooter").html(optPedido);
  setModal(codigo);
});

function setModal(codigo){
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/mostrarPedidoCompleto.php",
    data: "codigo="+codigo,
    dataType: "json",
    success: function(data){
      $("#cliente").val(data.pedido.cliente);
      $("#endereco").val(data.pedido.endereco+", "+data.pedido.numero+", "+data.pedido.bairro+", "+data.pedido.cidade+", "+data.pedido.UF);
      $("#referencia").val(data.pedido.referencia);
      //Entrega
      var dataEntrega = new Date(data.pedido.dataEntrega);
      if(dataEntrega.getDate() < 10){
        var dateEntrega = "0"+dataEntrega.getDate()+"/"+(dataEntrega.getMonth()+1)+"/"+dataEntrega.getFullYear();
      }
      else{
        var dateEntrega = dataEntrega.getDate()+"/"+(dataEntrega.getMonth()+1)+"/"+dataEntrega.getFullYear();
      }
      $("#dataEntrega").val(dateEntrega);
      if(dataEntrega.getHours() < 10){
        if(dataEntrega.getMinutes() < 10){
          var horaEntrega = "0"+dataEntrega.getHours();
          var minEntrega = "0"+dataEntrega.getMinutes();
        }
        else{
          var horaEntrega = "0"+dataEntrega.getHours();
          var minEntrega = dataEntrega.getMinutes();
        }
      }
      else{
        if(dataEntrega.getMinutes() < 10){
          var horaEntrega = dataEntrega.getHours();
          var minEntrega = "0"+dataEntrega.getMinutes();
        }
        else{
          var horaEntrega = dataEntrega.getHours();
          var minEntrega = dataEntrega.getMinutes();
        }
      }
      $("#horaEntrega").val(horaEntrega+":"+minEntrega);
      //Retirada
      var dataRetirada = new Date(data.pedido.dataRetirada);
      if(dataRetirada.getDate() < 10){
        var dateRetirada = "0"+dataRetirada.getDate()+"/"+(dataRetirada.getMonth()+1)+"/"+dataRetirada.getFullYear();
      }
      else{
        var dateRetirada = dataRetirada.getDate()+"/"+(dataRetirada.getMonth()+1)+"/"+dataRetirada.getFullYear();
      }
      $("#dataRetirada").val(dateRetirada);
      if(dataRetirada.getHours() < 10){
        if(dataRetirada.getMinutes() < 10){
          var horaRetirada = "0"+dataRetirada.getHours();
          var minRetirada = "0"+dataRetirada.getMinutes();
        }
        else{
          var horaRetirada = "0"+dataRetirada.getHours();
          var minRetirada = dataRetirada.getMinutes();
        }
      }
      else{
        if(dataRetirada.getMinutes() < 10){
          var horaRetirada = dataRetirada.getHours();
          var minRetirada = "0"+dataRetirada.getMinutes();
        }
        else{
          var horaRetirada = dataRetirada.getHours();
          var minRetirada = dataRetirada.getMinutes();
        }
      }
      $("#horaRetirada").val(horaRetirada+":"+minRetirada);
      //Produtos
      $("#mesas").val(data.pedido.qt_mesas);
      $("#cadeiras").val(data.pedido.qt_cadeiras);
      if(((data.pedido.corToalha) != null) && ((data.pedido.corToalha) != '')){
        $("#corToalha").val(data.pedido.corToalha);
      }
      else{
        $("#corToalha").val("Nenhuma");
      }
      if(((data.pedido.qt_toalhas) != null) && ((data.pedido.qt_toalhas) != '')){
        $("#toalhas").val(data.pedido.qt_toalhas);
      }
      else{
        $("#toalhas").val(0);
      }
      //Pedido
      var dataPedido = data.pedido.dataPedido;
      var datePedido = new Date(dataPedido);
      if(datePedido.getDate() < 10){
        var dtPedido = "0"+datePedido.getDate()+"/"+(datePedido.getMonth()+1)+"/"+datePedido.getFullYear();
      }
      else{
        var dtPedido = datePedido.getDate()+"/"+(datePedido.getMonth()+1)+"/"+datePedido.getFullYear();
      }
      $("#dataPedido").val(dtPedido);
      $("#valor").val(data.pedido.valor);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  })
}

$(document).on("click", "#btnAceitarPedido", function () {
  var codigo = $("#hPedido").attr("value");
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/php/pedido/agendarPedido.php",
    data: "codigo="+codigo,
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnNegarPedido", function () {
  $("#hPedido").val("Deseja negar o pedido?");
  var contNegar = "";
  contNegar += "<div class='row linha'><div class='col-xs-12'><label>Informe o motivo:</label></div></div><div class='row linha'><div class='col-xs-12'><select class='form-control' id='motivoRecusa'><option value=''></option><option value='Indisponibilidade de tempo'>Indisponibilidade de tempo</option><option value='Indisponibilidade de estoque'>Indisponibilidade de estoque</option></select></div>";
  $("#moInner").html(contNegar);
  optNegar = "";
  var optNegar = "<button type='button' class='btn btn-success' data-dismiss='modal'>Voltar</button><button type='button' class='btn btn-danger' id='btnConfirmarNegar'>Negar</button>";
  $("#moFooter").html(optNegar);
});

$(document).on("click", "#btnConfirmarNegar", function () {
  var codigo = $("#hPedido").attr("value");
  var motivoRecusa = $("#motivoRecusa").val();
  if((motivoRecusa != null) && (motivoRecusa != '') && (motivoRecusa != ' ')){
    var form_data = new FormData();
    form_data.append("codigo", codigo);
    form_data.append("motivoRecusa", motivoRecusa);
    $.ajax({
      type: "post",
      url: "https://rentalsystempm.000webhostapp.com/php/pedido/recusarPedido.php",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      },
      error: function(data){
        navigator.notification.alert(data);
      }
    });
  }
  else{
    navigator.notification.alert("Informe o motivo de recusa.");
  }
  /**/
});