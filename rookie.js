async function loadGraph() {
	console.log('hi');
	var data = await d3.csv('data/rookie.csv');

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	xScale = d3.scaleLinear().range([0, width]),
	//xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	yScale = d3.scaleLinear().range([height, 0]);
	//yAxis = d3.svg.axis().scale(yScale).orient("left");

	svg.selectAll(".dot")
	  .data(data)
	  .enter().append("circle")
	  .attr("class", "dot")
	  .attr("r", 3)
	  .attr("cx", function(d) {return xScale(d.Minutes)})
	  .attr("cy", function(d) {return yScale(d.PTS)})
	  .style("fill", function(d) { return color(cValue(d));});
}