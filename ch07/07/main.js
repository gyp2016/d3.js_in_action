d3.queue()
  .defer(d3.json, '../world.geo.json')
  .defer(d3.csv, '../cities.csv')
  .await(function(error, file1, file2) {
    createMap(file1, file2);
  });

function createMap(countries, cities) {

  var width = 1600;
  var height = 900;

  var projection = d3.geoMollweide()
                     .scale(300)
                     .translate([width / 2, height / 2]);
  var geoPath = d3.geoPath(projection);

  d3.select('svg')
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', geoPath)
    .attr('class', 'countries')
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
    .attr('cy', function(d) { return projection([d.x, d.y])[1]; });

  // graticule 경위선망
  var graticule = d3.geoGraticule();

  d3.select('svg')
    .append('path')
    .datum(graticule)
    .attr('class', 'graticule line')
    .attr('d', geoPath)
    .style('fill', 'none')
    .style('stroke', 'lightgray')
    .style('stroke-width', '1px');
  
  d3.select('svg')
    .append('path')
    .datum(graticule.outline)
    .attr('class', 'graticule outline')
    .attr('d', geoPath)
    .style('fill', 'none')
    .style('stroke', 'black')
    .style('stroke-width', '1px');

  // MouseEvent 상호작용성
  d3.selectAll('path.countries')
    .on('mouseover', centerBounds)
    .on('mouseout', clearCenterBounds);

  function centerBounds(d, i) {
    var thisBounds = geoPath.bounds(d);
    var thisCenter = geoPath.centroid(d);

    d3.select('svg')
      .append('rect')
      .attr('class', 'bbox')
      .attr('x', thisBounds[0][0])
      .attr('y', thisBounds[0][1])
      .attr('width', thisBounds[1][0] - thisBounds[0][0])
      .attr('height', thisBounds[1][1] - thisBounds[0][1])
      .style('fill', 'none')
      .style('stroke-dasharray', '5 5')
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .style('pointer-events', 'none');

    d3.select('svg')
      .append('circle')
      .attr('class', 'centroid')
      .attr('r', 5)
      .attr('cx', thisCenter[0])
      .attr('cy', thisCenter[1])
      .style('fill', 'red')
      .style('pointer-events', 'none');
  };

  function clearCenterBounds() {
    d3.selectAll('circle.centroid').remove();
    d3.selectAll('rect.bbox').remove();
  };
};
