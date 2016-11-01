d3.csv("cities.csv", function(error, data) {
  var min = d3.min(data, function(el) {return +el.population});
  var max = d3.max(data, function(el) {return +el.population});
  var mean = d3.mean(data, function(el) {return +el.population});
  console.log(min);
  console.log(max);
  console.log(mean);
});
