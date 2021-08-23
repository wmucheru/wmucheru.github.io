var margin = {
        top: 10,
        right: 30, bottom: 30, left: 40
    },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg = d3.select("#network-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");;

d3.json("assets/nodes-d3.json", function (data) {
    console.log(data);

    // Links
    var link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#222")

    // Nodes
    var node = svg
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 20)
        .style("fill", "#81509B")
    
    var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .on("end", ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x + 6; })
            .attr("cy", function (d) { return d.y - 6; });
    }
});