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

  let historyChart = d3.histogram();

  let histoData = historyChart(tweetsData);

  console.log(histoData);
}
