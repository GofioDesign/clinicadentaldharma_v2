/*
  A DÓNDE LLEVAN LOS BOTONES DE CITA
  ---------------------------------
  Todos los botones «Reservar cita» / «Pedir cita» de la web usan esta dirección.
  Cambia SOLO la línea CITA_URL y se cambian en todas las páginas a la vez.

  Ahora (temporal): WhatsApp con el mensaje «Hola, quiero pedir una cita.»
  Cuando Calendly vuelva a funcionar, sustituye la línea por:

    var CITA_URL = 'https://calendly.com/clinicadentaldharma/consulta';
*/
var CITA_URL = 'https://wa.me/34617878681?text=Hola%2C%20quiero%20pedir%20una%20cita.';

document.querySelectorAll('a[data-cita]').forEach(function (a) {
  a.href = CITA_URL;
});
