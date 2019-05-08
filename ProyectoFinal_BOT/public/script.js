var entrada = document.getElementById('entrada');
var chat = document.getElementById('chat');

var context = {};

var respuestasPintadasChat = (message, from) => `<div class="from-${from}"><div class="message-inner">
<p>${message}</p></div></div>`;



var ponerRespuestas = (respuestasPintadas) => {
  var div = document.createElement('div');
  div.innerHTML = respuestasPintadas;
  chat.appendChild(div);
}
//Envio de la informacion
var envioDelTexto = async (text = '') => { //Enviamos una variable llamada text
  var uri = '/respuestas/'; // a este metodo que se llama respuestas y esta en el index.js
  var response = await (await fetch (uri, { // aqui, espereamos la respuesta de Watson, la respuesta la guardamos en la viarable response
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        text,
        context,
      }),
  })).json();

    if (response.output.text) {
      context = response.context;
      var respuestasPintadas = respuestasPintadasChat(response.output.text, 'watson');
      ponerRespuestas(respuestasPintadas);
      chat.scrollTop = chat.scrollHeight;
    }

    //Corregir para display de respuestas con opcion
    else if (response.output.generic.title) {
      context = response.context;
      var respuestasPintadas = respuestasPintadasChat(response.output.generic.title, 'watson');
      ponerRespuestas(respuestasPintadas);
      chat.scrollTop = chat.scrollHeight;

    }
    // Esta condicion dependa de que ecnontro el rfc en la BD

    /*if(response.context.rfc){
      envioDelTexto('resetear password');
    }*/

}


entrada.addEventListener('keydown',(event) => {
  if(event.keyCode == 13 && entrada.value){
    envioDelTexto(entrada.value);

    var respuestasPintadas = respuestasPintadasChat(entrada.value, 'user');
    ponerRespuestas(respuestasPintadas);
    entrada.value = '';
  }
});
envioDelTexto();
