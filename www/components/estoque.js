// This is a JavaScript file

$(document).on("click", "#linkMenu", function()
{
  $(location).attr("href", "menu.html");
});

//Botão de confirmar cadastro
$(document).on("click", "#btnCadProd", function(){
  var prop = document.getElementById('foto').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if(jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1){
    navigator.notification.alert("Imagem inválida");
  }else{

    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("produto", $("#nomeCadProd").val());
    form_data.append("descricao", $("#descCadProd").val());
    form_data.append("quantidade", $("#quantCadProd").val());
    form_data.append("valor", $("#valorCadProd").val());

    $.ajax({
      url:"https://rentalsystempm.000webhostapp.com/estoque/cadProduto.php",
      method: "post",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
});

//Lista os produtos cadastrados na tela
function listarProduto(){
  $.ajax({
        type:"post",
        url:"https://rentalsystempm.000webhostapp.com/estoque/listarProduto.php",
        dataType:"json",
        //se der certo
        success: function(data){
            var itemProduto = "";
            $.each(data.produto,function(i,dados){
              itemProduto += 
              "<div class='row linha itemProd' data-toggle='modal' data-target='#modalProduto' data-id='"+dados.codigo+"'><div class='col-xs-3'><img class='img-responsive' src='https://rentalsystempm.000webhostapp.com/"+dados.foto+"' alt='' style='max-width: 100%; text-align: center'></div><div class='col-xs-9'><div class='row'><div class='col-xs-6'><label for=''><strong>Nome:</strong><br> "+dados.produto+"</label></div><div class='col-xs-6'><label for=''><strong>Descrição:</strong><br> "+dados.descricao+"</label></div></div><div class='row'><div class='col-xs-6'><label for=''><strong>Quantidade:</strong><br> "+dados.quantidade+"</label></div><div class='col-xs-6'><label for=''><strong>Valor:</strong><br> R$ "+dados.valor+"</label></div></div></div></div>";
            });
        $("#telaProd").html(itemProduto);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
}

function habilita(){
  $("#nomeConsProd").prop("readonly", false);
  $("#descConsProd").prop("readonly", false);
  $("#valorConsProd").prop("readonly", false);
  $("#altFoto").prop("hidden", false);
}

function desabilita(){
  $("#nomeConsProd").prop("readonly", true);
  $("#descConsProd").prop("readonly", true);
  $("#valorConsProd").prop("readonly", true);
  $("#altFoto").prop("hidden", true);
}

//Abre a modal de cadastro de produto
$(document).on("click", "#addProduto", function()
{
  document.getElementById('hProduto').textContent = "Cadastre o produto:";
  var contCadProduto = "";
  contCadProduto += "<div class='row linha'><div class='col-xs-12'><label for=''>Nome:</label><input class='form-control' type='text' id='nomeCadProd'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Descrição:</label><input class='form-control' type='text'  id='descCadProd'></div></div><div class='row linha'><div class='col-xs-6'><label for=''>Quantidade:</label><input class='form-control' type='number'  id='quantCadProd'></div><div class='col-xs-6'><label for=''>Valor (por unidade):</label><input class='form-control' type='number'  id='valorCadProd'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Foto:</label><input class='form-control' type='file' id='foto'></div></div>";
  $("#moInner").html(contCadProduto);
  var ftCadProduto = "";
  ftCadProduto += "<button type='button' class='btn btn-success' id='btnCadProd'>Cadastrar</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</button>";
  $("#moFooter").html(ftCadProduto);
});

//Abre a modal de consulta
$(document).on("click", ".itemProd", function()
{
  var codProduto = $(this).data('id');
  document.getElementById('hProduto').textContent = "Produto:";
  var contConsProduto = "";
  contConsProduto += "<div class='row linha'><div class='col-xs-12'><label for=''>Código:</label><input class='form-control' type='number' readonly id='codigoConsProd'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Nome:</label><input class='form-control' type='text' readonly id='nomeConsProd'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Descrição:</label><input class='form-control' type='text' readonly id='descConsProd'></div></div><div class='row linha'><div class='col-xs-6'><label for=''>Quantidade:</label><input class='form-control' type='number' readonly id='quantConsProd'></div><div class='col-xs-6'><label for=''>Valor (por unidade):</label><input class='form-control' type='number' readonly id='valorConsProd'></div></div><div class='row linha'><div class='col-xs-12'><label for=''>Foto:</label><img class='img-responsive' src='' alt='' id='fotoConsProd'><div id='altFoto' hidden><input class='form-control' type='file' id='novaFoto'></div></div></div>";
  $("#moInner").html(contConsProduto);
  mostrarProduto(codProduto);
  var ftConsProduto = "";
  ftConsProduto += "<button type='button' class='btn btn-success' id='btnAltQtProduto' onclick='btnAltQtProduto("+codProduto+")'>Alterar quantidade</button><button type='button' class='btn btn-primary' id='btnAltProd' onclick='btnAltProd()'>Editar</button><button type='button' class='btn btn-danger' data-toggle='modal' data-target='#modalDeletarProd' id='btnDeletarProduto' onclick='btnDeletarProduto()'>Deletar</button>";
  $("#moFooter").html(ftConsProduto);
  
  desabilita();
  
});

//Mostra as informações do produto selecionado
function mostrarProduto(codProduto){
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/estoque/mostrarProduto.php",
    data: "codProduto="+codProduto,
    dataType: "json",
    success: function(data){
      $("#codigoConsProd").val(data.produto.codigo);
      $("#nomeConsProd").val(data.produto.produto);
      $("#descConsProd").val(data.produto.descricao);
      $("#quantConsProd").val(data.produto.quantidade);
      $("#valorConsProd").val(data.produto.valor);
      $("#fotoConsProd").attr("src", "https://rentalsystempm.000webhostapp.com/"+data.produto.foto);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
}

//Botão de alteração de produto
function btnAltProd()
{
  habilita();
  var ftAlterarProduto = "";
  ftAlterarProduto += "<button type='button' class='btn btn-success' id='btnSalvarAlterar' onclick='salvarAlterar()'>Salvar</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</button>";
  $("#moFooter").html(ftAlterarProduto);
};

//Abre modal de alterar quantidade de produto
function btnAltQtProduto(codProduto){
  document.getElementById('hProduto').textContent = "Aumente/diminua a quantidade:";
  var contAltQTProduto = "";
  contAltQTProduto += "<div class='row linha'><div class='col-xs-12'><label for=''>Quantidade a ser adicionada/removida:</label><input class='form-control' type='number' min='1' max='99' maxlength='2' id='inpAltQtProduto'></div></div>";
  $("#moInner").html(contAltQTProduto);
  var ftAltQTProduto = "";
  ftAltQTProduto += "<button type='button' class='btn btn-success' id='btnAddQtProduto' onclick='addQtProduto("+codProduto+")'>Aumentar</button><button type='button' class='btn btn-warning' id='btnMinQtProduto' onclick='minQtProduto("+codProduto+")'>Diminuir</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</button>";
  $("#moFooter").html(ftAltQTProduto);
};

//Botão de aumentar quantidade de produto
function addQtProduto(codProduto){
  if($("#inpAltQtProduto").val() == ''){
  }
  else{
    var qtAddProduto = $("#inpAltQtProduto").val();
    var form_data = new FormData();
    form_data.append("codProduto", codProduto);
    form_data.append("qtAddProduto", qtAddProduto);
    $.ajax({
      type: "post",
      url:"https://rentalsystempm.000webhostapp.com/estoque/addQtProduto.php",
      data: form_data,
      contentType: false,
      cache : false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
}

//Botão de diminuir quantidade de produto
function minQtProduto(codProduto){
  if($("#inpAltQtProduto").val() == ''){
  }
  else{
    var qtAddProduto = $("#inpAltQtProduto").val();
    var form_data = new FormData();
    form_data.append("codProduto", codProduto);
    form_data.append("qtAddProduto", qtAddProduto);
    $.ajax({
      type: "post",
      url:"https://rentalsystempm.000webhostapp.com/estoque/minQtProduto.php",
      data: form_data,
      contentType: false,
      cache : false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
}

function salvarAlterar()
{
  var prop = document.getElementById('novaFoto').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if(jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1){
    navigator.notification.alert("Imagem inválida");
  }else{

    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("codProduto", $("#codigoConsProd").val());
    form_data.append("produto", $("#nomeConsProd").val());
    form_data.append("descricao", $("#descConsProd").val());
    form_data.append("valor", $("#valorConsProd").val());

    $.ajax({
      url:"https://rentalsystempm.000webhostapp.com/estoque/alterarProduto.php",
      method: "post",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
}

//Abre a modal de deletar produto
function btnDeletarProduto()
{
  var codProduto = $("#codigoConsProd").val();
  document.getElementById('hProduto').textContent = "Deseja mesmo excluir este produto?";
  var contDeletarProduto = "";
  contDeletarProduto += "<div class='row linha'><div class='col-xs-12'><label for=''>Caso sim, insira a sua senha:</label><input class='form-control' type='text' id='inpSenhaDeletarProduto'></div></div>";
  $("#moInner").html(contDeletarProduto);
  var ftDeletarProduto = "";
  ftDeletarProduto += "<button type='button' class='btn btn-success' id='btnConfirmaDeletarProduto' onclick='btnConfirmaDeletarProduto("+codProduto+")'>Deletar</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancelar</button>";
  $("#moFooter").html(ftDeletarProduto);
}

function btnConfirmaDeletarProduto(codProduto)
{
  $.ajax({
    type: "post",
    url: "https://rentalsystempm.000webhostapp.com/estoque/deletarProduto.php",
    data: "codProduto="+codProduto,
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
}