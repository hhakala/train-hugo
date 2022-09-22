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

const labels = hrvalues[0].data

const data = {
  labels: labels,
  datasets: [{
    label: 'Heart rate',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: hrvalues[1].data,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
