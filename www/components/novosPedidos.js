// This is a JavaScript file

$(document).on("click", ".itemProd", function(){
  $("#hPedido").val("Pedido");
  var contPedido = "";
  contPedido += "<div class='row linha'><div class='col-xs-12'><label for=''>Cliente:</label><input class='form-control' type='text' readonly></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Endereço:</label><input class='form-control' type='text' readonly></div></div><div class='row linha'><div class='col-xs-12'><h4>Entrega:</h4><div class='row'><div class='col-xs-6'><label for=''>Data:</label><input class='form-control' type='date' readonly></div><div class='col-xs-6'><label for=''>Horário:</label><input class='form-control' type='time' readonly></div></div></div></div><div class='row linha'><div class='col-xs-12'><h4>Retirada:</h4><div class='row'><div class='col-xs-6'><label for=''>Data:</label><input class='form-control' type='date' readonly></div><div class='col-xs-6'><label for=''>Horário:</label><input class='form-control' type='time' readonly></div></div></div></div> <div class='row linha'><div class='col-xs-12'><label for=''>Valor:</label><input class='form-control' type='number' readonly ></div></div>";
  $("#moInner").html(contPedido);
  var optPedido = "";
  optPedido += "<button type='button' class='btn btn-success' id='btnAceitarPedido'>Aceitar</button><button type='button' class='btn btn-danger' id='btnNegarPedido'>Negar</button>";
  $("#moFooter").html(optPedido);
});

$(document).on("click", "#btnAceitarPedido", function(){

});

$(document).on("click", "#btnNegarPedido", function(){
  $("#hPedido").val("Deseja negar o pedido?");
  var contNegar = "";
  contNegar += "<div class='row linha'><div class='col-xs-12'><label>Informe o motivo:</label></div></div><div class='row linha'><div class='col-xs-12'><input type='radio' name='negacao' value='estoque'>Indisponibilidade de estoque</div></div><div class='row linha'><div class='col-xs-12'><input type='radio' name='negacao' value='tempo'>Indisponibilidade de tempo</div></div>";
  $("#moInner").html(contNegar);
  optNegar = "";
  var optNegar = "<button type='button' class='btn btn-success' data-dismiss='modal'>Cancelar</button><button type='button' class='btn btn-danger' id='btnConfirmarNegar'>Negar</button>";
  $("#moFooter").html(optNegar);
});

$(document).on("click", "#btnConfirmarNegar", function(){

});