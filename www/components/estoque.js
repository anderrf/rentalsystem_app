// This is a JavaScript file

$(document).on("click", "#btnCadProd", function(){
  var prop = document.getElementById('foto').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if(jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1){
    navigator.notification.alert("Imagem inválida")
  }else{

    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("produto", $("#nomeCadProd").val());
    form_data.append("descricao", $("#descCadProd").val());
    form_data.append("quantidade", $("#quantCadProd").val());
    form_data.append("valor", $("#valorCadProd").val());

    $.ajax({
      url:"https://rentalsystempm.000webhostapp.com/cadProduto.php",
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

function listarProduto(){
  $.ajax({
        type:"post",
        url:"https://rentalsystempm.000webhostapp.com/listarProduto.php",
        dataType:"json",
        //se der certo
        success: function(data){
            var itemProduto = "";
            $.each(data.produto,function(i,dados){
              itemProduto += 
              "<div class='row linha itemProd' data-toggle='modal' data-target='#modalConProduto' value='"+dados.codigo+"'><div class='col-xs-3'><img class='img-responsive' src='https://rentalsystempm.000webhostapp.com/"+dados.foto+"' alt='' style='max-width: 100%; text-align: center'></div><div class='col-xs-9'><div class='row'><div class='col-xs-6'><label for=''><strong>Nome:</strong><br> "+dados.produto+"</label></div><div class='col-xs-6'><label for=''><strong>Descrição:</strong><br> "+dados.descricao+"</label></div></div><div class='row'><div class='col-xs-6'><label for=''><strong>Quantidade:</strong><br> "+dados.quantidade+"</label></div><div class='col-xs-6'><label for=''><strong>Valor:</strong><br> R$ "+dados.valor+"</label></div></div></div></div><hr>";
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
}

function desabilita(){
  $("#nomeConsProd").prop("readonly", true);
  $("#descConsProd").prop("readonly", true);
  $("#valorConsProd").prop("readonly", true);
}

$(document).on("click", "#btnAltProd", function(){
  habilita();
});

$("#modalConProduto").ready(function(){

});