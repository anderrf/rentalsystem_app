// This is a JavaScript file

function setPedidoAgendado(regPedidoAgendado)
{

  $(location).attr("href", "pedidoAgendado.html?cd_pedido="+regPedidoAgendado+"");

}

function setPedidoRealizado(regPedidoRealizado)
{

  $(location).attr("href", "pedidoRealizado.html?cd_pedido="+regPedidoRealizado+"");

}