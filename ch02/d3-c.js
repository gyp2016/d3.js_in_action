let yScale = d3.scaleLinear().domain([0,100,500]).range([0,500]).clamp(true);

console.log(yScale(1000));

d3.select("svg")
  .selectAll("rect")
  .data([14, 68, 24500, 430, 19, 1000, 5555])
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("height", function(d) {
    return yScale(d);
  })
  .style("fill", "blue")
  .style("stroke", "red")
  .style("stroke-width", "4px")
  .style("opacity", .25)
  .attr("x", function(d,i) {
    return i * 50;
  })
  .attr("y", function(d,i) {
    return 500 - yScale(d);
  });
