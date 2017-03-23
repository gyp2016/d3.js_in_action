d3.json("asia.geojson", createMap);

function createMap(countries) {

  var width = 1600;
  var height = 900;

  var aProjection = d3.geoMercator()
                      .scale(700)
                      .translate([width / 2 - 1600, height / 2 + 400]);
  var geoPath = d3.geoPath(aProjection);
  d3.select("svg")
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "countries");
};
