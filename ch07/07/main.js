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

  var featureSize = d3.extent(countries.features, d => geoPath.area(d));
  var countryColor = d3.scaleQuantize()
                       .domain(featureSize)
                       .range(["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]);

  d3.select('svg')
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
      .attr('d', geoPath)
      .attr('class', 'countries')
      .style('fill', d => countryColor(geoPath.area(d)))
      .style('stroke', d => d3.rgb(countryColor(geoPath.area(d))).darker());

  d3.select('svg')
    .selectAll('circle')
    .data(cities)
    .enter()
    .append('circle')
      .style('fill', 'red')
      .attr('class', 'cities')
      .attr('r', 3)
      .attr('cx', d => projection([d.x, d.y])[0])
      .attr('cy', d => projection([d.x, d.y])[1]);

  d3.selectAll('path.countries')
      .on('mouseover', centerBounds)
      .on('mouseout', clearCenterBounds);

  function centerBounds(d) {
    var thisBounds = geoPath.bounds(d);
    var thisCenter = geoPath.centroid(d);

    d3.select('svg')
      .append('rect')
      .attr('class', 'bbox')
        .attr('x', thisBounds[0][0])
        .attr('y', thisBounds[0][1])
        .attr('width', thisBounds[1][0] - thisBounds[0][0])
        .attr('height', thisBounds[1][1] - thisBounds[0][1]);

    d3.select('svg')
      .append('circle')
        .attr('class', 'centroid')
        .attr('r', 5)
        .attr('cx', thisCenter[0])
        .attr('cy', thisCenter[1]);
  };

  function clearCenterBounds() {
    d3.selectAll('circle.centroid').remove();
    d3.selectAll('rect.bbox').remove();
  };
};
