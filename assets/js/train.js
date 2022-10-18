$(document).ready( function () {
  initDataTable();
  initMap();
  initActivityChart();
  initSummaryPie();
});

function initSummaryPie(){
  if ( $( "#totalsPie" ).length ) {
    var summaryData = {
      labels: [
	'Juoksu',
	'Kävely',
	'Liikkuvuus',
	'Voima'
      ],
      datasets: [{
	label: 'Vuosi 2022',
	data: [totalRun, totalWalk, totalWorkout, totalStrength],
	backgroundColor: [
	  'rgb(255, 99, 132)',
	  'rgb(54, 162, 235)',
	  'rgb(255, 205, 86)',
	  'rgb(234, 145, 86)'
	],
	hoverOffset: 4
      }],
      options: {
	responsive: true,
	maintainAspectRatio: false,
	layout: {
	  padding: {
	    top: 150,
	    bottom: 200
	  }
	}
      }
    };
    var summaryConfig = {
      type: 'pie',
      data: summaryData,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += secondsToDhms(context.parsed)
                }
                return label;
              }
            }
          }
        }
      }
    };

    const summaryChart = new Chart(
      document.getElementById('totalsPie'),
      summaryConfig
    );
    summaryChart.canvas.parentNode.style.height = '500px';
    summaryChart.canvas.parentNode.style.width = '500px';
  }
}

function initDataTable(){
  $('#myTable').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/fi.json' },
    order: [ 0, 'desc' ],
  })
}

function initMap(){
  if ( $( "p#map-start" ).length ) {
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
  }
}

function initActivityChart(){
  if ( $( "#myChart" ).length ) {

    var activityData = {
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

    var activityConfig = {
      type: 'line',
      data: activityData,
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
	},
      }
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      activityConfig
    );
  }
}

// @URL https://stackoverflow.com/a/36099084
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " päivä, " : " päivää, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " tunti, " : " tuntia, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuutti, " : " minuuttia, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " sekunti" : " sekuntia") : "";

  return (dDisplay + hDisplay + mDisplay ).replace(/,\s*$/, "")
}
