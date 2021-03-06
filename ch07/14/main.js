var PromiseWrapper = (xhr, d) => new Promise(resolve => xhr(d, p => resolve(p)));

Promise
  .all([
    PromiseWrapper(d3.json, '../world.geo.json'),
    PromiseWrapper(d3.csv, '../cities.csv')
  ])
  .then(resolve => {
    createMap(resolve[0], resolve[1]);
  });

function createMap(countries, cities) {
  var projection = d3.geoSatellite()
                     .scale(1330)
                     .translate([250, 250])
                     .rotate([-30.24, -31, -56])
                     .tilt(30)
                     .distance(1.999)
                     .clipAngle(45);

  var geoPath = d3.geoPath()
                  .projection(projection);
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
      .attr('class', 'cities')
      .attr('r', 3)
      .attr('cx', d => projection([d.x, d.y])[0])
      .attr('cy', d => projection([d.x, d.y])[1]);

  var graticule = d3.geoGraticule();

  d3.select('svg')
    .insert('path', 'path.countries')
    .datum(graticule)
      .attr('class', 'graticule line')
      .attr('d', geoPath);

  d3.select('svg')
    .insert('path', 'path.countries')
    .datum(graticule.outline)
      .attr('class', 'graticule outline')
      .attr('d', geoPath);
}
