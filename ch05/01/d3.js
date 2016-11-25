d3.json('tweets.json', function(err, data) {
  histogram(data.tweets);
});

function histogram(tweetsData) {

  let xScale = d3.scaleLinear()
                 .domain([0, 5])
                 .range([0, 500]);
  let yScale = d3.scaleLinear()
                 .domain([0, 10])
                 .range([400, 0]);

  let xAxis = d3.axisBottom(xScale)
                .ticks(5);

  let historyChartData = d3.histogram()
                           .domain(xScale.domain())
                           .value(function(d) {
                             return d.favorites.length;
                           })(tweetsData);

  d3.select('svg')
    .selectAll('rect')
    .data(historyChartData)
    .enter()
    .append('rect')
    .attr('x', function(d) {
      return xScale(d.x0);
    })
    .attr('y', function(d) {
      return yScale(d.length);
    })
    .attr('width', function() {
      return xScale(historyChartData[0].x1) - 2;
    })
    .attr('height', function(d) {
      return 400 - yScale(d.length);
    })
    .style('fill', 'darkred')
    .style('stroke', 'black')
    .style('stroke-width', '1px');

  d3.select('svg')
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,400)')
    .call(xAxis);

  d3.select('g.axis')
    .selectAll('text')
    .attr('dx', 50);
}
