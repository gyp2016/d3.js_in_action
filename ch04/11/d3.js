
d3.csv('movies.csv', lineChart);

function lineChart(data) {

  let xScale = d3.scaleLinear()
                 .domain([1, 10])
                 .range([20, 470]);

  let yScale = d3.scaleLinear()
                 .domain([0, 60])
                 .range([480, 20]);

  let xAxis = d3.axisBottom(xScale)
                .tickSize(480)
                .tickValues(d3.range(1,11,1));

  d3.select('svg')
    .append('g')
    .attr('id', 'xAxisG')
    .call(xAxis);

  let yAxis = d3.axisRight(yScale)
                .tickSize(480);

  d3.select('svg')
    .append('g')
    .attr('id', 'yAxisG')
    .call(yAxis);

  let fillScale = d3.scaleLinear()
                    .domain([0, 5])
                    .range(['lightgray','black']);

  let n = 0;
  for (x in data[0]) {

    if (x != 'day') {
      let movieArea = d3.area()
                        .x(function(d) {
                          return xScale(d.day);
                        })
                        .y0(function(d) {
                          return yScale( simpleStack(d, x) );
                        })
                        .y1(function(d) {
                          return yScale( simpleStack(d, x) - d[x] );
                        })
                        .curve(d3.curveBasis);

      d3.select('svg')
        .append('path')
        .attr('id', x + 'Area')
        .attr('d', movieArea(data))
        .attr('fill', fillScale(n))
        .attr('stroke', 'none')
        .attr('stroke-width', 2)
        .style('opacity', .5);

      n++;
    }
  }

  function simpleStack(incomingData, incomingAttribute) {
    let newHeight = 0;

    for (x in incomingData) {
      if (x != 'day') {
        newHeight += parseInt(incomingData[x]);
        if (x == incomingAttribute) {
          break;
        }
      }
    }

    return newHeight;
  }
}
