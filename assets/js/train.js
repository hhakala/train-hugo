$(document).ready( function () {
  $('#myTable').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/fi.json' },
    order: [ 0, 'desc' ],
  })
});

var startLocation = $("p#map-start").text();
var map = L.map('map').setView([61.40295, 23.63736], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
var encoded = $("p#map-polyline").text();
var polyline = L.Polyline.fromEncoded(encoded);
polyline.addTo(map);
map.fitBounds(polyline.getBounds());

const decimation = {
  enabled: true,
  algorithm: 'lttb',
};

const actions = [
  {
    name: 'LTTB decimation (50 samples)',
    handler(chart) {
      chart.options.plugins.decimation.algorithm = 'lttb';
      chart.options.plugins.decimation.enabled = true;
      chart.options.plugins.decimation.samples = 50;
      chart.update();
    }
  }
];

const data = {
  labels: chartdata.heartrate[0].data,
  datasets: [{
    label: 'Syke',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: chartdata.heartrate[1].data,
    yAxisID: 'y',
  },{
    label: 'Korkeus',
    backgroundColor: 'rgb(201, 203, 207)',
    borderColor: 'rgb(201, 203, 207)',
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
	autoSkip: true,
      },
      y1: {
	type: 'linear',
	display: true,
	position: 'right',
	autoSkip: true,
      }
    },
    plugins: {
      decimation: decimation,
    },
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
