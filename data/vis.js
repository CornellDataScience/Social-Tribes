src="https://unpkg.com/d3-3d/build/d3-3d.js"
var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
	},
	width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

d3.selection.prototype.moveToFront = function(){
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
};

var prominents = [[['Dave Weigel', 'Mark Halperin', 'Ben Smith'],
  ['Rachel Maddow MSNBC', 'Anderson Cooper', 'Paul Krugman'],
  ['Jonathan Martin', 'Zeke Miller', 'Mike Allen']],
 [['Mike Allen', 'andrew kaczynski\xf0\x9f\xa4\x94', 'Ben Smith'],
  ['Sean Hannity', 'Anderson Cooper', 'Arianna Huffington'],
  ['Nate Silver', 'Paul Krugman', 'Rachel Maddow MSNBC']],
 [['Mike Allen', 'andrew kaczynski\xf0\x9f\xa4\x94', 'Ben Smith'],
  ['Anderson Cooper', 'Paul Krugman', 'Rachel Maddow MSNBC'],
  ['Terry Moran', 'Robert Costa', 'Dave Weigel']],
 [['Rachel Maddow MSNBC', 'Anderson Cooper', 'Paul Krugman'],
  ['Jonathan Martin', 'Zeke Miller', 'Mike Allen'],
  ['Dave Weigel', 'Mark Halperin', 'Ben Smith']]]

var canvas = d3.select("body").select("svg")
	.attr("width", width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('pca.csv', function (data){
	var algo = 1;
	var algos = ['Gaussian', 'Spectral', 'Agglomerative', 'K-Means'];

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

	var hexColors = ['#4abdac','#fc4a1a', '#f7b733']
	// var color = d3.scaleOrdinal(hexColors);

	var circle = canvas.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'dot')
		.attr('r', function (d) {
			return 8 * Math.pow(d.Followers,0.3) / 50;
		})
		.attr('cx', function (d) {
			return x(d.Comp1);
		})
		.attr('cy', function (d) {
			return y(d.Comp2);
		})
		.attr('fill', function (d) {
			var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
			return hexColors[cluster_algos[algo]];
		});

	// hovering elements
	var div = d3.select("body").select("#innertext")
        .attr("class", "tooltip")
        .style("opacity", 0);
    //"listen" for when the mouse is hovering over a circle
    circle.on('mousemove', function (d) { //Optional add-on: have labels come up when hovering
            div.transition().duration(500)
                .style('left', d3.event.pageX - 20 + "px")
                .style('top', function (d) {
                    return d3.event.pageY > height ? d3.event.pageY - 30 + 'px' : d3.event.pageY + 20 + 'px';
                })
                .style('opacity', '0.9')
                .style('display', 'inline-block')
						var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
            div.html(
							"<span style='font-size:26'>" + d.Names + "</span> <br>" +
							"<span style='color:	#484848; font-style:italic'>" + d.Followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").substring(0, d.Followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length - 2) + " followers </span><br><br>" +
							d.Descriptions + "<br><br>" +
							"_____________________________________________<br><br>" +
							`<div style='font-size:17.5; line-height:40px'><center><i>Prominent Journalists Within Cluster</i></center></div>` +
							`<span style='font-size:16; color:#202020;line-height:30px'><center>${prominents[algo][cluster_algos[algo]][0]}<br>${prominents[algo][cluster_algos[algo]][1]}<br>${prominents[algo][cluster_algos[algo]][2]}<br><br><span style='font-size:80; color:${hexColors[cluster_algos[algo]]}'>&#9673</span></center></span>`
						);

        })
        .on("mouseout", function (d) {
            div.transition().duration(500)
                .style('opacity', '0');
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

	function nearest(point, candidates) {
		var nearest;
		var shortestDistance = Number.MAX_VALUE;
		for (var i = 0; i<candidates.length; i++) {
			var c = candidates[i];
			var distance = Math.sqrt(
				(c.x - point.x) * (c.x - point.x) +
				(c.y - point.y) * (c.y - point.y)
			);

			if (distance < shortestDistance) {
				shortestDistance = distance;
				nearest = i;
			}
		}
		return nearest;
	}

	function moveMeans(lines, centroids, centroidCircles, points) {
		centroids.forEach(function (centroid, i) {
			var assignedPoints = points.filter(function (point) {
				return point.cluster == i;
			});
			centroid.x = d3.mean(assignedPoints, function (d) {
				return d.x;
			});
			centroid.y = d3.mean(assignedPoints, function (d) {
				return d.y;
			});
		});

		centroidCircles.transition().duration(1000)
			.attr('cx', function (d) {
				return x(d.x);
			})
			.attr('cy', function (d) {
				return y(d.y);
			});

		lines.transition().duration(1000)
			.attr('x2', function (point) {
				return x(centroids[point.cluster].x);
			})
			.attr('y2', function (point) {
				return y(centroids[point.cluster].y);
			});
	}

	function findClosest(lines, centroids, points) {
		var ct = 0;
		points.forEach(function (point) {
			var newCluster = nearest(point, centroids);
			point.cluster = newCluster;
		});

		lines.transition().duration(1000)
			.attr("x2", function (point) {
				return x(centroids[point.cluster].x);
		})
			.attr("y2", function (point) {
				return y(centroids[point.cluster].y);
		});
	}

	function cluster(lines, centroids, centroidCircles, points) {

		var timesRun = 0;
		findClosest(lines, centroids, points);
		moveMeans(lines, centroids, centroidCircles, points);
		var interval = setInterval(function () {
			timesRun += 1;
			findClosest(lines, centroids, points);
			moveMeans(lines, centroids, centroidCircles, points);
			if(timesRun === 20){
	        clearInterval(interval);
	    }
		}
		, 1000);

	}

	function algo_change(x){
		console.log(algos[x]);
		algo = x;
		document.getElementById('algo').innerHTML = "Currently using: " + algos[algo] + " Clustering";

		circle.transition().duration(1000)
		.attr('fill', function (d) {
			var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
			return hexColors[cluster_algos[algo]];
		});
	}

	function clearKMeans(){
		d3.selectAll('line').remove();
		d3.selectAll('.centroid').remove();
	}
	function gaussian(){clearKMeans();algo_change(0)}
	function spectral(){
		// d3._3d()
		clearKMeans();
		algo_change(1)
	}
	function agglomerative(){
		clearKMeans();
		algo_change(2)
	}

	function kmeans(){
			var lines, circles, centroids;
			var points = [];

			for (var i = 0; i < sl.length; i++) {
				points.push({
					cluster: -1,
					x: sl[i],
					y: sw[i]
				});
			};

			lines = canvas.selectAll('line').data(points)
				.enter().append('line')
				.attr('x1', function (d) {
					return x(d.x);
				})
				.attr('y1', function (d) {
					return y(d.y);
				})
				.attr('x2', function (d) {
					return x(d.x);
				})
				.attr('y2', function (d) {
					return y(d.y);
				})
				.attr('stroke', 'grey')
				.attr('stroke-width', '1px')
				.attr('opacity', 0.5);

			centroids = new Array(3);
			for (var i = 0; i < centroids.length; i++) {
				var centroid_seed = Math.round(Math.random() * points.length);
				console.log(points[centroid_seed]);
				centroids[i] = {
					x: points[centroid_seed].x,
					y: points[centroid_seed].y
				}
			}

			var centroidCircles = canvas.selectAll('.centroid').data(centroids)
				.enter().append('circle')
				.attr('class', 'centroid')
				.attr('r', 5)
				.attr('fill', '#333333')
				.attr('cx', function (d) {
					return x(d.x);
				})
				.attr('cy', function (d) {
					return y(d.y);
				});
		algo_change(3);
		cluster(lines, centroids, centroidCircles, points);
	}

	function handleClick(){
      var name = document.getElementById("myVal").value
			for(var j in data){
				if(data[j]['Names'].includes(name)){
					console.log(data[j]['Names'])
					var div = d3.select("body").select("#innertext")
				        .attr("class", "tooltip")
				        .style("opacity", 0);

          div.transition().duration(500)
              .style('left', d3.event.pageX - 20 + "px")
              .style('top', function (d) {
                  return d3.event.pageY > height ? d3.event.pageY - 30 + 'px' : d3.event.pageY + 20 + 'px';
              })
              .style('opacity', '0.9')
              .style('display', 'inline-block')
					var cluster_algos = [data[j]['Gaussian'], data[j]['Spectral'], data[j]['Agglomerative'], data[j]['KMeans']];
					div.html(
						"<span style='font-size:26'>" + data[j]['Names'] + "</span> <br>" +
						"<span style='color:	#484848; font-style:italic'>" + data[j]['Followers'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").substring(0, data[j]['Followers'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length - 2) + " followers </span><br><br>" +
						data[j]['Descriptions'] + "<br><br>" +
						"_____________________________________________<br><br>" +
						`<div style='font-size:17.5; line-height:40px'><center><i>Prominent Journalists Within Cluster</i></center></div>` +
						`<span style='font-size:16; color:#202020;line-height:30px'><center>${prominents[algo][cluster_algos[algo]][0]}<br>${prominents[algo][cluster_algos[algo]][1]}<br>${prominents[algo][cluster_algos[algo]][2]}<br><br><span style='font-size:80; color:${hexColors[cluster_algos[algo]]}'>&#9673</span></center></span>`
					);
					canvas.selectAll('circle').filter(function (d) {
						return d.Names == data[j]['Names'];}).moveToFront();

					circle.transition().duration(1000)
						.filter(function (d) {
							return d.Names == data[j]['Names'];})
						.attr('fill', '#5AD75A')
						.attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.1);
						})
            .transition()
            .duration(800)
            .attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.3) / 50;
						})
						.transition()
            .duration(800)
						.attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.1);
						})
						.transition()
            .duration(800)
            .attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.3) / 50;
						})
						.transition()
            .duration(800)
						.attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.1);
						})
            .transition()
            .duration(200)
            .attr("r", function (d) {
							return 8 * Math.pow(d.Followers,0.3) / 50;
						})
						.attr('fill', function (d) {
							var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
							return hexColors[cluster_algos[algo]];
						})

						;
				}
			}
  }

	// canvas.selectAll("circle")
	// .on("click", function(d) {
	// 	d.pulse = !d.pulse;
	// 	if (d.pulse) {
	// 		var selected_circles = d3.select(this);
	// 		console.log(selected_circles);
	// 		pulsate(selected_circles);
  //
	// 	}
	// });
  //
	// function pulsate(selection) {
  //   recursive_transitions();
  //
  //   function recursive_transitions() {
	// 		console.log("HIT")
  //     if (selection.data()[0].pulse) {
  //       selection.transition()
  //           .duration(400)
  //           .attr("r", 8)
  //           .transition()
  //           .duration(800)
  //           .attr("r", 12)
  //           .each("end", recursive_transitions);
  //     } else {
  //       // transition back to normal
  //       selection.transition()
  //           .duration(200)
  //           .attr("r", 8)
  //     }
  //   }
  // }

	d3.select('#select').on('click', handleClick);
	d3.select('#gaussian').on('click', gaussian);
	d3.select('#spectral').on('click', spectral);
	d3.select('#agglomerative').on('click', agglomerative);
	d3.select('#kmeans').on('click', kmeans);
});
