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
                     .scale(400)
                     .translate([width / 2, height / 2])
                     .center([0, 0]);

  var geoPath = d3.geoPath()
                  .projection(projection);
  var featureData = countries.features;
  var realFeatureSize = d3.extent(featureData, d => geoPath.area(d));
  var newFeatureColor = d3.scaleQuantize()
                       .domain(realFeatureSize)
                       .range(["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]);

  d3.select('svg')
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
      .attr('d', geoPath)
      .attr('class', 'countries')
      .style('fill', d => newFeatureColor(geoPath.area(d)))
      .style('stroke', d => d3.rgb(newFeatureColor(geoPath.area(d))).darker());
  
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

  var rotateScale = d3.scaleLinear()
                      .domain([-500, 0, 500])
                      .range([-180, 0, 180]);

  var mapZoom = d3.zoom()
                  .on('zoom', zoomed);

  var zoomSettings = d3.zoomIdentity
                       .translate(800, 450)
                       .scale(400);

  d3.select('svg')
    .call(mapZoom)
    .call(mapZoom.transform, zoomSettings);
  
  function zoomed() {
    var e = d3.event;
    var currentRotate = rotateScale(e.transform.x) % 360;

    projection
      .rotate([currentRotate, 0])
      .scale(e.transform.k);

    d3.selectAll('path.graticule')
      .attr('d', geoPath);
    d3.selectAll('path.countries')
      .attr('d', geoPath);

    d3.selectAll('circle.cities')
      .each(function(d, i) {
        var projectedPoint = projection([d.x, d.y]);
        var x = parseInt(d.x) + currentRotate;
        var display = x  < 90 && x  > -90
                   || x  < -270 && x  > -450
                   || x  > 270 && x < 450
                   ? 'block' : 'none';
        d3.select(this)
          .attr('cx', projectedPoint[0])
          .attr('cy', projectedPoint[1])
          .style('display', display)
      });
  }
}
