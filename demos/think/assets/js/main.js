$(document).ready(function () {
    $.getJSON('assets/network.json', function (data) {
        console.log(data);

        var graph = new Springy.Graph(),
            nodes = [];

        data.nodes.map(function (n, i) {
            nodes.push(graph.newNode({ label: n.name }))
        });

        data.nodes.map(function (n, i) {
            graph.newEdge(nodes[0], nodes[i], { color: n.color })
        });

        jQuery('#springy').springy({
            graph: graph,
            nodeSelected: function (node) {
                console.log('Selected: ', node);
            }
        });
    });
});