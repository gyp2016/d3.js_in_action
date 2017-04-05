var PromiseWrapper = (xhr, d) => new Promise(resolve => xhr(d, p => resolve(p)));

Promise
  .all([
    PromiseWrapper(d3.json, '../world.topo.json'),
    PromiseWrapper(d3.json, '../stations.json')
  ])
  .then(resolve => {
    createMap(resolve[0], resolve[1]);
  });

function createMap(topoCountries, cities) {
  var width = 1000;
  var height = 700;
  var countries = topojson.feature(topoCountries, topoCountries.objects.countries);
  var projection = d3.geoMercator()
                     .translate([800, 450])
                     .scale(400);
  var geoPath = d3.geoPath(projection);

  d3.select('svg')
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
      .attr('d', geoPath)
      .attr('class', 'countries');

  // Connects
  // var tempRoad = [];
  // cities.content.forEach( station => {
  //   var destinations = station.connectsTo.split(", ");
  //   destinations.forEach( descName => {
  //     var overlap = _.find(tempRoad, road => road.start == descName && road.end == station.city);
  //     if (!overlap) {
  //       var destination = _.find(cities.content, station => station.city == descName);
  //       if (destination) {
  //         var road = {
  //           start: station.city,
  //           x1: station.longitude,
  //           y1: station.latitude,
  //           end: destination.city,
  //           x2: destination.longitude,
  //           y2: destination.latitude
  //         };
  //         tempRoad.push(road);
  //       }
  //     }
  //   });
  // });

  // d3.select('svg')
  //   .selectAll('line')
  //   .data(tempRoad)
  //   .enter()
  //   .append('line')
  //   .attr('x1', d => projection([d.x1, d.y1])[0])
  //   .attr('y1', d => projection([d.x1, d.y1])[1])
  //   .attr('x2', d => projection([d.x2, d.y2])[0])
  //   .attr('y2', d => projection([d.x2, d.y2])[1])
  //     .style('stroke', '#3d330f')
  //     .style('stroke-width', '3px');

  // Stations
  d3.select('svg')
    .selectAll('circle')
    .data(cities.content)
    .enter()
    .append('circle')
      .attr('class', 'cities')
      .attr('r', 5)
      .attr('cx', d => projection([d.longitude, d.latitude])[0])
      .attr('cy', d => projection([d.longitude, d.latitude])[1])
      .on('click', selectedCity)
      .on('mouseover', displayCityName)
      .on('mouseout', clearCityName);

  function selectedCity(d) {
    var selected = d3.select(this).classed('active');
    if (selected) return;

    d3.selectAll('circle.cities')
      .classed('active', false);

    d3.select(this)
      .classed('active', true);

    console.log(d3.values(d));

    d3.selectAll('td.data')
      .data(d3.values(d))
      .html(function(p) {
        return p;
      });
  }

  function displayCityName(d) {
    d3.select('svg')
      .append('text')
      .attr('class', 'city')
      .attr('text-anchor', 'middle')
      .attr('x', projection([d.longitude, d.latitude])[0])
      .attr('y', projection([d.longitude, d.latitude])[1] - 10)
      .text(d.city);
  }

  function clearCityName() {
    d3.selectAll('text.city').remove();
  }

  d3.text('resources/modal.html', function(data) {
    d3.select('div.container')
      .append('div')
      .attr('id', 'modal')
      .html(data);
  });

  var mapZoom = d3.zoom()
                  .scaleExtent([400, 1600])
                  .on('zoom', zoomed);
  var zoomSettings = d3.zoomIdentity
                       .translate(800, 450)
                       .scale(400);
  d3.select('svg')
    .call(mapZoom)
    .call(mapZoom.transform, zoomSettings)
    .on('wheel.zoom', null)
    .on('dblclick.zoom', null);

  function zoomed() {
    console.log('zoomed start');
    projection.translate([d3.event.transform.x, d3.event.transform.y])
              .scale(d3.event.transform.k);

    d3.selectAll('path.countries')
      .attr('d', geoPath);

    d3.selectAll('circle.cities')
      .attr('cx', d => projection([d.longitude, d.latitude])[0])
      .attr('cy', d => projection([d.longitude, d.latitude])[1]);
    console.log('zoomed end');
  }

  d3.select('div.controls')
    .append('button')
    .attr('class', 'btn btn-outline-primary')
    .on('click', () => { zoomButton('in')})
    .html('Zoom In');
  d3.select('div.controls')
    .append('button')
    .attr('class', 'btn btn-outline-primary')
    .on('click', () => { zoomButton('out')})
    .html('Zoom Out');

  function zoomButton(zoomDirection) {
    var width = 1600;
    var height = 900;
    var oldX = projection.translate()[0];
    var oldY = projection.translate()[1];
    if (zoomDirection == 'in') {
      var newZoom = projection.scale() * 2;
      var newX = ((oldX - (width / 2)) * 2) + width / 2;
      var newY = ((oldY - (height / 2)) * 2) + height / 2;
    }
    else if (zoomDirection == 'out') {
      var newZoom = projection.scale() * .5;
      var newX = ((oldX - (width / 2)) * .5) + width / 2;
      var newY = ((oldY - (height / 2)) * .5) + height / 2;
    }
    var newZoomSettings = d3.zoomIdentity
                            .translate(newX, newY)
                            .scale(newZoom);
    d3.select('svg')
      .transition()
      .duration(500)
      .call(mapZoom.transform, newZoomSettings);
  }
};
