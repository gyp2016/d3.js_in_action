d3.json('tweets.json', function(err, data) {
  drawPieChart(data.tweets);
});

function drawPieChart(data) {

  let nestedTweets = d3.nest()
                       .key(function(el) {
                         return el.user;
                       })
                       .entries(data);

  nestedTweets.forEach(function(el) {
    el.numTweets = el.values.length;

    el.numFavorites = d3.sum(el.values, function(d) {
      return d.favorites.length;
    });

    el.numRetweets = d3.sum(el.values, function(d) {
      return d.retweets.length;
    });
  });

  let pieChartData = d3.pie()
                   .value(function(d) {
                     return d.numTweets;
                   })(nestedTweets);

  let newArc = d3.arc()
                 .innerRadius(20)
                 .outerRadius(100);

  d3.select('svg')
    .append('g')
    .attr('transform', 'translate(250,250)')
    .selectAll('path')
    .data(pieChartData)
    .enter()
    .append('path')
    .attr('d', newArc)
    .style('fill', 'blue')
    .style('opacity', .5)
    .style('stroke', 'black')
    .style('stroke-width', '2px');
}
