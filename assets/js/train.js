var startLocation = $("p#map-start").text();
console.log(startLocation);
var map = L.map('map').setView([61.40295, 23.63736], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
var encoded = $("p#map-polyline").text();
var polyline = L.Polyline.fromEncoded(encoded);
polyline.addTo(map);
map.fitBounds(polyline.getBounds());
