// This is a JavaScript file

function setModal(valRegCliente)
{

  var idCliente = valRegCliente;
  $("#inpNome").val(nome);
  $("#inpTelefone").val(telefone);
  $("#inpEndereco").val(endereco);

}

function listarCliente(){

  var regCliente = "";
  regCliente += "<div class='row linha itemProd' name='regcliente' onclick='setModal(this.value)' value='' data-toggle='modal' data-target='#modalCliente'><div class='col-xs-12'><label for='' id='lblNome'>Nome:</label><br><label for='' id='lblTelefone'>Telefone:</label><br><label for='' id='lblEndereco'>Endereço:</label><br></div></div>";
  $("#telaCliente").html(regCliente);

}

$("#btnDeletar")
{

  document.getElementById('modalDeletarCliente').val() = document.getElementById('modalCliente').val();

}

$(document).on("click", "#btnPesquisarCliente", function(){



});