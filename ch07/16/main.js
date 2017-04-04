var PromiseWrapper = (xhr, d) => new Promise(resolve => xhr(d, p => resolve(p)));

Promise
  .all([
    PromiseWrapper(d3.json, '../world.topo.json'),
    PromiseWrapper(d3.csv, '../cities.csv')
  ])
  .then(resolve => {
    createMap(resolve[0], resolve[1]);
  });

function createMap(topoCountries) {
  var countries = topojson.feature(topoCountries, topoCountries.objects.countries);

  var projection = d3.geoMollweide()
                     .scale(270)
                     .translate([800, 450])
                     .center([0, 0]);

  var geoPath = d3.geoPath()
                  .projection(projection);
  var featureSize = d3.extent(countries.features, d => geoPath.area(d));
  var countryColor = d3.scaleQuantize()
                      .domain(featureSize)
                      .range(["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]);

  var graticule = d3.geoGraticule();

  d3.select('svg')
    .append('path')
    .datum(graticule)
      .attr('class', 'graticule line')
      .attr('d', geoPath);

  d3.select('svg')
    .append('path')
    .datum(graticule.outline)
      .attr('class', 'graticule outline')
      .attr('d', geoPath);

  d3.select('svg')
    .selectAll('path.countries')
    .data(countries.features)
    .enter()
    .append('path')
      .attr('d', geoPath)
      .attr('class', 'countries')
      .style('fill', d => countryColor(geoPath.area(d)))
      .style('stroke', 'none');

  var neighbors = topojson.neighbors(topoCountries.objects.countries.geometries);

  d3.selectAll('path.countries')
    .on('mouseover', findNeighbors)
    .on('mouseout', clearNeighbors);

  function findNeighbors(d, i) {
    d3.select(this)
      .style('fill', '#FE9922');
    
    d3.selectAll('path.countries')
      .filter((p, q) => neighbors[i].indexOf(q) > -1)
      .style('fill', '#41A368');
  }

  function clearNeighbors() {
    d3.selectAll('path.countries')
      .style('fill', '#C4B9AC');
  }
}
