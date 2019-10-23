// This is a JavaScript file

function listarCliente() {
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/cliente/listarClienteBasico.php",
    dataType: "json",
    success: function (data) {
      var regCliente = "";
      $.each(data.cliente, function (i, dados) {
        regCliente += "<div class='row linha itemProd' name='regcliente' data-id='" + dados.codigo + "' data-toggle='modal' data-target='#modalCliente'><div class='col-xs-12'><label for='' id='lblNome'><strong>Nome: </strong><br>" + dados.nome + "</label><br><label for='' id='lblTelefone'><strong>Telefone: </strong><br>" + dados.telefone + "</label><br><label for='' id='lblEndereco'><strong>Endereço: </strong><br>" + dados.endereco + "</label><br><label for='' id='lblEmail'><strong>E-mail: </strong><br>" + dados.email + "</label><br></div></div>";
      });
      $("#telaCliente").html(regCliente);
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", ".itemProd", function () {
  var codCliente = $(this).data('id');
  document.getElementById('hCliente').textContent = "Cliente:";
  var contCliente = "";
  contCliente += "<div class='row linha'><div class='col-xs-12'><label for=''>Nome:</label><input class='form-control' type='text' readonly id='inpNome'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Telefone:</label><input class='form-control' type='text' readonly id='inpTelefone'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Endereço:</label><input class='form-control' type='text' readonly id='inpEndereco'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>E-mail:</label><input class='form-control' type='text' readonly id='inpEmail'></div></div>";
  $("#moInner").html(contCliente);
  var ftCliente = "";
  ftCliente += "<button type='button' class='btn btn-danger' id='btnDeletar' onclick='modDeletar(" + codCliente + ")'>Deletar</button>";
  $("#moFooter").html(ftCliente);
  setModal(codCliente);
});

function setModal(codCliente) {
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/cliente/mostrarClienteBasico.php",
    data: "codCliente=" + codCliente,
    dataType: "json",
    success: function (data) {
      $("#inpNome").val(data.cliente.nome);
      $("#inpTelefone").val(data.cliente.telefone);
      $("#inpEndereco").val(data.cliente.endereco);
      $("#inpEmail").val(data.cliente.email);
    },
    error: function (data) {

    }
  });
}

function modDeletar(codCliente) {
  document.getElementById('hCliente').textContent = "Deseja mesmo deletar o cliente?";
  var contDeletar = "";
  contDeletar += "<div class='row linha'><div class='col-xs-12'><label for=''>Confirme a sua senha:</label><input class='form-control' type='text' id='senhaDeletarCliente'></div></div>";
  $("#moInner").html(contDeletar);
  var ftDeletar = "";
  ftDeletar += "<button type='button' class='btn btn-success' id='btnConfirmarDeletar' onclick='confirmarDeletar(" + codCliente + ")'>Confirmar</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</span></button>";
  $("#moFooter").html(ftDeletar);
};

function confirmarDeletar(codCliente) {
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/cliente/desabilitarCliente.php",
    data: "codigo=" + codCliente,
    success: function (data) {
      location.reload();
    },
    error: function (data) {
      navigator.notification.alert(data);
    }
  });
}

$(document).on("click", "#btnPesquisarCliente", function () {
  var pesquisa = $("#inpPesquisarCliente").val();
  if (pesquisa.length > 3) {
    $.ajax({
      type: "post",
      url: "https://rentalsystempm.000webhostapp.com/cliente/pesquisarClienteBasico.php",
      data: "pesquisa=" + pesquisa,
      dataType: "json",
      success: function (data) {
        var regCliente = "";
        $.each(data.cliente, function (i, dados) {
          regCliente += "<div class='row linha itemProd' name='regcliente' data-id='" + dados.codigo + "' data-toggle='modal' data-target='#modalCliente'><div class='col-xs-12'><label for='' id='lblNome'><strong>Nome: </strong><br>" + dados.nome + "</label><br><label for='' id='lblTelefone'><strong>Telefone: </strong><br>" + dados.telefone + "</label><br><label for='' id='lblEndereco'><strong>Endereço: </strong><br>" + dados.endereco + "</label><br><label for='' id='lblEmail'><strong>E-mail: </strong><br>" + dados.email + "</label><br></div></div>";
        });
        $("#telaCliente").html(regCliente);
      },
      error: function (data) {
        navigator.notification.alert(data);
      }
    });
  }
  else {
    navigator.notification.alert("Conteúdo digitado é insuficiente para a pesquisa.")
  }

});