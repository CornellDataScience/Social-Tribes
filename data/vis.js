var margin = {
	top: 20,
	right: 20,
	bottom: 50,
	left: 60
	},
	width = 600 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var canvas = d3.select("body").select("svg")
	.attr("width", width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('pca.csv', function (data){
	var sl = data.map(function (i) {
		return i.Comp1;
	});
	var sw = data.map(function (i) {
		return i.Comp2;
	});
	var x = d3.scaleLinear()
		.range([0, width])
		.domain([-3, 3]);
	var y = d3.scaleLinear()
		.range([height,0])
		.domain([-1.5, 1.5])

	var color = d3.scaleOrdinal(['#4abdac','#fc4a1a', '#f7b733']);
	console.log(d3.schemeCategory10);


	var circle = canvas.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'dot')
		.attr('r', function (d) {
			return 6 * Math.pow(d.Followers,0.3) / 50;
		})
		.attr('cx', function (d) {
			return x(d.Comp1);
		})
		.attr('cy', function (d) {
			return y(d.Comp2);
		})
		.attr('fill', function (d) {
			if(d.Followers > 1000000)
				return color(1);
			else if(d.Followers > 50000)
			 	return color(2);
			else
				return color(3);
		});

	// var xAxis = d3.axisBottom(x);
	// canvas.append('g')
	// 	.attr('transform', `translate(0, ${height})`)
	// 	.call(xAxis);
	// canvas.append('g')
	// 	.call(d3.axisLeft(y));
	// canvas.append('text')
	// 	.attr('class', 'xAxisLabel')
	// 	.attr('transform', `translate(${width},${height + 35})`)
	// 	.text('Principal Component 1');
	// canvas.append('text')
	// 	.attr('class', 'yAxisLabel')
	// 	.attr('transform', 'rotate(-90)')
	// 	.attr('y', -35)
	// 	.text('Principal Component 2');

	// var legend = canvas.selectAll('legend')
	// 	.data(color.domain()).enter()
	// 	.append('g')
	// 	.attr('class', 'legend')
	// 	.attr('transform', function (d, i) {
	// 		return 'translate(0, ' + i * 20 + ')';
	// 	});
	// legend.append('rect')
	// 	.attr('x', width)
	// 	.attr('width', 14)
	// 	.attr('height', 14)
	// 	.attr('fill', color)
	// legend.append('text')
	// 	.attr('x', width - 6)
	// 	.attr('y', 9)
	// 	.attr('text-anchor', 'end')
	// 	.text(function (d) {
	// 		return d;
	// 	});

	// K means
//
// 	var lines, circles, centroids;
// 	var points = [];
//
// 	for (var i = 0; i < sl.length; i++) {
// 		points.push({
// 			cluster: -1,
// 			x: sl[i],
// 			y: sw[i]
// 		});
// 	};
//
// 	lines = canvas.selectAll('line').data(points)
// 		.enter().append('line')
// 		.attr('x1', function (d) {
// 			return x(d.x);
// 		})
// 		.attr('y1', function (d) {
// 			return y(d.y);
// 		})
// 		.attr('x2', function (d) {
// 			return x(d.x);
// 		})
// 		.attr('y2', function (d) {
// 			return y(d.y);
// 		})
// 		.attr('stroke', 'grey')
// 		.attr('stroke-width', '1px')
// 		.attr('opacity', 0.7);
//
// 	centroids = new Array(3);
// 	for (var i = 0; i < centroids.length; i++) {
// 		var centroid_seed = Math.round(Math.random() * points.length);
// 		console.log(points[centroid_seed]);
// 		centroids[i] = {
// 			x: points[centroid_seed].x,
// 			y: points[centroid_seed].y
// 		}
// 	}
//
// 	var centroidCircles = canvas.selectAll('.centroid').data(centroids)
// 		.enter().append('circle')
// 		.attr('class', 'centroid')
// 		.attr('r', 5)
// 		.attr('fill', '#333333')
// 		.attr('cx', function (d) {
// 			return x(d.x);
// 		})
// 		.attr('cy', function (d) {
// 			return y(d.y);
// 		});
//
// 	function nearest(point, candidates) {
// 		var nearest;
// 		var shortestDistance = Number.MAX_VALUE;
// 		for (var i = 0; i<candidates.length; i++) {
// 			var c = candidates[i];
// 			var distance = Math.sqrt(
// 				(c.x - point.x) * (c.x - point.x) +
// 				(c.y - point.y) * (c.y - point.y)
// 			);
//
// 			if (distance < shortestDistance) {
// 				shortestDistance = distance;
// 				nearest = i;
// 			}
// 		}
// 		return nearest;
// 	}
//
// 	function moveMeans() {
// 		centroids.forEach(function (centroid, i) {
// 			var assignedPoints = points.filter(function (point) {
// 				return point.cluster == i;
// 			});
// 			centroid.x = d3.mean(assignedPoints, function (d) {
// 				return d.x;
// 			});
// 			centroid.y = d3.mean(assignedPoints, function (d) {
// 				return d.y;
// 			});
// 		});
//
// 		centroidCircles.transition().duration(1000)
// 			.attr('cx', function (d) {
// 				return x(d.x);
// 			})
// 			.attr('cy', function (d) {
// 				return y(d.y);
// 			});
//
// 		lines.transition().duration(1000)
// 			.attr('x2', function (point) {
// 				return x(centroids[point.cluster].x);
// 			})
// 			.attr('y2', function (point) {
// 				return y(centroids[point.cluster].y);
// 			});
// 	}
//
// 	function findClosest() {
// 		var ct = 0;
// 		points.forEach(function (point) {
// 			var newCluster = nearest(point, centroids);
// 			point.cluster = newCluster;
// 		});
//
// 		lines.transition().duration(1000)
// 			.attr("x2", function (point) {
// 				return x(centroids[point.cluster].x);
// 		})
// 			.attr("y2", function (point) {
// 				return y(centroids[point.cluster].y);
// 		});
// 	}
//
// 	function cluster() {
// 		findClosest();
// 		moveMeans();
// 		setInterval(function () {
// 			findClosest();
// 			moveMeans();
// 		}
// 		, 1000);
//
// 	}
//
// 	d3.select('#cluster').on('click', cluster);
});
