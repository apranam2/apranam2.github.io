async function loadGraph() {
	console.log('hi');
	var data = await d3.csv('data/rookie.csv');

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	var width = 960 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var minDate = getDate(data[0]);
	var maxDate = getDate(data[data.length-1]);

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

	var y = d3.scaleLinear().domain([0,50]).range([height, 0]);

	svg.selectAll(".dot")
	  .data(data)
	  .enter().append("circle")
	  .attr("class", "dot")
	  .attr("r", 3)
	  .attr("cx", function(d) {return x(getDate(d.Dates));})
	  .attr("cy", function(d) {return y(d.PTS);})
	  .attr("fill", function(d) { if (d.Result == "L") {return "red";} else {return "blue";}});

	d3.select('svg').append('g')
	.attr('transform','translate(' + margin.left + "," + margin.top +')')
	.call(d3.axisLeft(y));

	d3.select('svg').append('g')
	.attr('transform','translate(' + margin.left + "," + (height + margin.top) +')')
	.call(d3.axisBottom(x));
}

async function getDate(d) {
        return new Date(d.Dates);
}