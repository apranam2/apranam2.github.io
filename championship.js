async function loadGraph() {
	var data = await d3.csv('data/championship.csv');

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

	var x = d3.scaleTime().domain([minDate, maxDate]).nice().range([0, width]);

	var y = d3.scaleLinear().domain([0,50]).range([height, 0]);

	var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

	svg.selectAll(".dot")
	  .data(data)
	  .enter().append("circle")
	  .attr("class", "dot")
	  .attr("r", 3)
	  .attr("cx", function(d) {return x(getDate(d));})
	  .attr("cy", function(d) {return y(d.PTS);})
	  .attr("fill", function(d) { if (d.Result == "L") {return "red";} else {return "blue";}})
	  .on("mouseover", function(d) {
	  	tooltip.transition()
	  		.duration(500)
	  		.style("opacity", 1);

	  	tooltip.html(d.Dates + "</br> Points: " + d.PTS + "</br> Assists: " + d.AST + "</br> Rebounds: " + d.REB + "</br> Steals: " + d.STL)
	  		.style("left", (d3.event.pageX - 80) + "px")
        	.style("top", (d3.event.pageY - 80) + "px");

	  })
	  .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

    svg.append("text")
    .attr("x", 215)
    .attr("y", 370)
	.text("Sprained right ankle")
	.attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

    svg.append("line")
    .attr("x1", 250)
    .attr("y1", 375)
    .attr("x2", 250)
	.attr("y2", 425)
	.attr("stroke", "black")
	.attr("stroke-width", 2);

	svg.append("text")
    .attr("x", 580)
    .attr("y", 370)
	.text("Sprained left MCL")
	.attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

    svg.append("line")
    .attr("x1", 615)
    .attr("y1", 375)
    .attr("x2", 615)
	.attr("y2", 425)
	.attr("stroke", "black")
	.attr("stroke-width", 2);

	d3.select('svg').append('g')
	.attr('transform','translate(' + margin.left + "," + margin.top +')')
	.call(d3.axisLeft(y));

	d3.select('svg').append('g')
	.attr('transform','translate(' + margin.left + "," + (height + margin.top) +')')
	.call(d3.axisBottom(x));
}

function getDate(d) {
        return new Date(d.Dates);
}