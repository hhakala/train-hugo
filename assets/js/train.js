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

const data = {
  labels: chartdata.heartrate[0].data,
  datasets: [{
    label: 'Heart rate',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: chartdata.heartrate[1].data,
    yAxisID: 'y',
  },{
    label: 'Elevation',
    backgroundColor: 'rgb(0, 0, 0, 0.1)',
    borderColor: 'rgb(0, 0, 0, 0.1)',
    data: chartdata.altitude[1].data,
    yAxisID: 'y1',
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
      }
    }
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
