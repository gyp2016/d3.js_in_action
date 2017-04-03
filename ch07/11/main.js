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
  var width = 1600;
  var height = 900;
  var projection = d3.geoOrthographic()
                     .scale(300)
                     .translate([width / 2, height / 2])
                     .center([0, 0]);

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
  
  d3.select('svg')
    .selectAll('cities')
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
