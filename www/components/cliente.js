// This is a JavaScript file

function setModal(valRegCliente)
{
  var idCliente = valRegCliente;
  $("#inpNome").val(nome);
  $("#inpTelefone").val(telefone);
  $("#inpEndereco").val(endereco);
}

function listarCliente()
{
  var regCliente = "";
  regCliente += "<div class='row linha itemProd' name='regcliente' onclick='setModal(this.value)' value='' data-toggle='modal' data-target='#modalCliente'><div class='col-xs-12'><label for='' id='lblNome'>Nome:</label><br><label for='' id='lblTelefone'>Telefone:</label><br><label for='' id='lblEndereco'>Endereço:</label><br></div></div>";
  $("#telaCliente").html(regCliente);
}

$(document).on("click", ".itemProd", function()
{
  document.getElementById('hCliente').textContent = "Cliente:";
  var contCliente = "";
  contCliente += "<div class='row linha'><div class='col-xs-12'><label for=''>Nome:</label><input class='form-control' type='text' readonly id='inpNome'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Telefone:</label><input class='form-control' type='text' readonly id='inpTelefone'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Endereço:</label><input class='form-control' type='text' readonly id='inpEndereco'></div></div>";
  $("#moInner").html(contCliente);
  var ftCliente = "";
  ftCliente += "<button type='button' class='btn btn-danger' id='btnDeletar'>Deletar</button>";
  $("#moFooter").html(ftCliente);

});

$(document).on("click", "#btnDeletar", function()
{
  document.getElementById('hCliente').textContent = "Deseja mesmo deletar o cliente?";
  var contDeletar = "";
  contDeletar += "<div class='row linha'><div class='col-xs-12'><label for=''>Confirme a sua senha:</label><input class='form-control' type='text' id='senhaDeletarCliente'></div></div>";
  $("#moInner").html(contDeletar);
  var ftDeletar = "";
  ftDeletar += "<button type='button' class='btn btn-success' id='btnConfirmarDeletar'>Confirmar</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</span></button>";
  $("#moFooter").html(ftDeletar);
});

$(document).on("click", "#btnPesquisarCliente", function(){

});