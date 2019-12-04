// This is a JavaScript file

$(document).on("click", "#btnEntradaInicial", function () {
  $(location).attr("href", "login.html");
});

$(document).on("click", "#btnEntradaLogin", function () {
  if (($("#loginInicial").val() == "") || ($("#senhaInicial").val() == "")) {
    navigator.notification.alert("Preencha todos os campos.");
  }
  else {
    var form_data = new FormData();
    form_data.append("nome", $("#loginInicial").val());
    form_data.append("senha", $("#senhaInicial").val());
    $.ajax({
      type: "post",
      url: "https://rentalsystempm.000webhostapp.com/php/conta/loginApp.php",
      data: form_data,
      dataType: "json",
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        if ((data == '') || (data == null)) {
          navigator.notification.alert("Acesso negado.");
          location.reload();
        }
        else {
          if (data == true) {
            $(location).attr("href", "menu.html");
          }
          else {
            navigator.notification.alert("Acesso negado.");
            location.reload();
          }
        }
      },
      error: function (data) {
        navigator.notification.alert("Acesso negado.");
        location.reload();
      }
    });
  }
});

