d3.queue()
  .defer(d3.json, '../world.geojson')
  .defer(d3.csv, '../cities.csv')
  .await(function(error, file1, file2) {
    createMap(file1, file2);
  });

function createMap(countries, cities) {

  var width = 1600;
  var height = 900;

  var projection = d3.geoMercator()
                      .scale(300)
                      .translate([width / 2, height / 2]);
  var geoPath = d3.geoPath(projection);

  d3.select('svg')
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', geoPath)
    .style('fill', 'gray');

  d3.select('svg')
    .selectAll('circle')
    .data(cities)
    .enter()
    .append('circle')
    .style('fill', 'red')
    .attr('class', 'cities')
    .attr('r', 3)
    .attr('cx', function(d) { return projection([d.x, d.y])[0]; })
    .attr('cy', function(d) { return projection([d.x, d.y])[1]; })
};
