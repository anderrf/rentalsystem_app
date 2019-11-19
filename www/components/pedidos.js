// This is a JavaScript file

function mapa(){
    var onSuccess = function (position) {
      $("#valLat").val(position.coords.latitude);
      $("#valLng").val(position.coords.longitude);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function mapa(position) {

      L.mapquest.key = '8iWALlAQQkOmV1ORrJXPkBKCBKTpdNAA';

      var map = L.mapquest.map('map', {
        center: [position.coords.latitude, position.coords.longitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: 15
      });

      L.marker([position.coords.latitude, position.coords.longitude], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup('Denver, CO').addTo(map);

      map.addControl(L.mapquest.control());
    };
    navigator.geolocation.getCurrentPosition(mapa);
  function onFail(message) {
    alert('Failed because: ' + message);
  }

  navigator.geolocation.getCurrentPosition(mapa);
};