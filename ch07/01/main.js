d3.json("../world.geo.json", createMap);

function createMap(countries) {
  
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
