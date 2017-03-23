d3.json("asia.geojson", createMap);

function createMap(countries) {
  console.log('createMap');
  console.log(countries);
  var aProjection = d3.geoMercator();
  var geoPath = d3.geoPath(aProjection);
  d3.select("svg")
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "countries");
};
