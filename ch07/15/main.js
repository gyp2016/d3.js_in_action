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

  mergeAt(0);

  function mergeAt(mergePoint) {
    var filteredCountries = topoCountries.objects.countries.geometries.filter(d => {
      var thisCenter = d3.geoCentroid(topojson.feature(topoCountries, d));
      return thisCenter[1] > mergePoint ? true : null;
    });

    d3.select('svg')
      .append('g')
      .datum(topojson.merge(topoCountries, filteredCountries))
      .insert('path')
      .attr('class', 'merged')
      .attr('d', geoPath);
  }
}
