const colorschemes = ["#ff6961","#ffb480","#f8f38d","#42d6a4","#08cad1","#59adf6","#9d94ff","#c780e8"]
const screen = [window.innerWidth,window.innerHeight];
const datas={
    "Python": 45.36,
    "HTML": 112,
    "CSS": 102,
    "PHP": 87,
    "C#": 65,
    "SQL": 55,
    "JS": 92,
    "VB.Net": 36,
    "Git": 100,
    "Batch": 35,
    "Bash": 55,
    "Powershell": 25,
    "Unreal Engine":64,
    "CI/CD": 50,
    "Kafka":8
}

// set the dimensions and margins of the graph
var margin = {top: 2, right: 2, bottom: 2, left: 2},
  width = screen[0] - margin.left - margin.right,
  height = screen[1] - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Read data
d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv', function() {
  data=Object.entries(datas).map(c=>({name:c[0],parent:"Origin",value:c[1]}))
  data.unshift({name:"Origin",value:1})
  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", function (d) { return colorschemes[d.parent.children.indexOf(d)%colorschemes.length] });

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("text-anchor", "middle")
      .attr("x", function(d){ return (d.x0+d.x1)/2})    // +10 to adjust position (more right)
      .attr("y", function(d){ return (d.y0+d.y1)/2})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "15px")
      .attr("fill", "white")
})
