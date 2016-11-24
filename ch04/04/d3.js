d3.csv('boxplot.csv', scatterplot);

function scatterplot(data) {

  var xScale = d3.scaleLinear()
                 .domain([1, 8])
                 .range([20, 470]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([480, 20]);

  var yAxis = d3.axisRight(yScale)
                .ticks(8)
                .tickSize(-470);
  d3.select('svg')
    .append('g')
    .attr('transform', 'translate(470,0)')
    .attr('id', 'yAxis')
    .call(yAxis);

  var xAxis = d3.axisBottom(xScale)
                .tickSize(-470)
                .tickArguments([7, 's']);
  d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0,480)')
    .attr('id', 'xAxis')
    .call(xAxis);

  d3.select('svg')
    .selectAll('circle.median')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'median')
    .attr('r', 5)
    .attr('cx', function(d) {
      return xScale(d.day);
    })
    .attr('cy', function(d) {
      return yScale(d.median);
    })
    .style('fill', 'darkgray');

  d3.select('svg')
    .selectAll('g.box')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'box')
    .attr('transform', function(d) {
      return 'translate(' + xScale(d.day) + ',' + yScale(d.median) + ')'
    })
    .each(function(d, i) {
      d3.select(this)
        .append('rect')
        .attr('width', 20)
        .attr('x', -10)
        .attr('y', yScale(d.q3) - yScale(d.median))
        .attr('height', yScale(d.q1) - yScale(d.q3))
        .style('fill', 'white')
        .style('stroke', 'black');
    });
}
