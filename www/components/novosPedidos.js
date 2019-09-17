// This is a JavaScript file

$(document).on("click", "#btnAceitarPedido", function(){

});

$(document).on("click", "#btnNegarPedido", function(){
  $("#moInner").prop("hidden", true);
  var negacao = "<div class='row linha'><div class='col-xs-12'><label>Acrescente o motivo da negação do pedido:</label></div></div> <div class='row linha'><div class='col-xs-12'><input type='radio' name='motivo' value='material'>Falta de material<br><input type='radio' name='motivo' value='horario'>Indisponibilidade de horário<br></div></div>";
  $("#moBody").html(negacao);
  $("#btnAceitarPedido").prop("hidden", true);
  $("#btnNegarPedido").prop("hidden", true);
  var confirmarNegar = "<button type='button' class='btn btn-danger' id='btnConfirmarNegar'><span class='glyphicon glyphicon-remove-circle'></span></button>";
  $("#moFooter").html(confirmarNegar);
});

$("#modalNovoPedido").modal('hide', function(){
  $(location).attr("href", "menu.html");
});

$(document).on("click", "#btnConfirmarNegar", function(){

});