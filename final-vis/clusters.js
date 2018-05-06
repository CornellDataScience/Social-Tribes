src = "https://unpkg.com/d3-3d/build/d3-3d.js"

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

// list of more significant political journalists
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

	var comp1 = data.map(function (i) {
		return i.Comp1;
	});
	var comp2 = data.map(function (i) {
		return i.Comp2;
	});

	var x = d3.scaleLinear()
		.range([0, width])
		.domain([-3, 3]);
	var y = d3.scaleLinear()
		.range([height,0])
		.domain([-1.5, 1.5])

	var hexColors = ['#4abdac','#fc4a1a', '#f7b733']

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
		})
		.style("opacity", 1);

	// hovering elements
	var div = d3.select("body").select("#innertext")
        .attr("class", "tooltip")
        .style("opacity", 0);
	var div2 = d3.select("body").select("#innerinst")

    // "listen" for when the mouse is hovering over a circle
    circle.on('mousemove', function (d) { 
						div2.transition().duration(500).style('opacity', '0');


            div.transition().duration(500)
                .style('opacity', '1.0')
						var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
            div.html(
							"<span style='font-size:32; font-family:NeueMontreal'>" + d.Names + "</span> <br>" +
							"<span style='color:	#484848; font-style:italic'>" + d.Followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").substring(0, d.Followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length - 2) + " followers </span><br><br>" +
							d.Descriptions + "<br><br>" +
							"_______________________________________________________<br><br>" +
							`<div style='font-size:17.5; line-height:40px; font-family:NeueMontreal'><center><i>Prominent Journalists Within Cluster</i></center></div>` +
							`<span style='font-size:16; color:#202020;line-height:30px'><center>${prominents[algo][cluster_algos[algo]][0]}<br>${prominents[algo][cluster_algos[algo]][1]}<br>${prominents[algo][cluster_algos[algo]][2]}<br><br><span style='font-size:80; color:${hexColors[cluster_algos[algo]]}'>&#9673</span></center></span>`
						);

        })
        .on("mouseout", function (d) {
            div.transition().duration(500)
                .style('opacity', '0');

						div2.transition().duration(1200)
                .style('opacity', '1.0');
        });

    function algo_change(x) {
		console.log(algos[x]);
		algo = x;
		document.getElementById('algo').innerHTML = "Currently using: " + algos[algo] + " Clustering";

		circle.transition().duration(1000)
		.attr('fill', function (d) {
			var cluster_algos = [d.Gaussian, d.Spectral, d.Agglomerative, d.KMeans];
			return hexColors[cluster_algos[algo]];
		});
	}

	// provides a list of closest names to what the user is typing into search box
	var names = ['Justin Sink', 'Howard Fineman', 'Michelle Malkin', 'Paul Singer', 'Peggy Noonan', 'David Shepardson', 'Susan Joan Archer', 'Susan Page', 'Alex Leary', 'John Harwood', 'john r stanton', 'E!!', 'Michael Roston', 'Scott Wong', 'Amy Chozick', 'Arianna Huffington', 'Kevin Robillard', 'Juana Summers Markland', 'Paul Lewis', 'michaelscherer', 'Josh Hafner', 'Sean Hannity', 'SarahBakerNBC', 'Maeve Reston', 'Patricia DiCarlo', 'Ron Fournier', 'MATT DRUDGE', 'Max Fisher', 'Michael D. Shear', 'Christina Wilkie', 'Roger Simon', 'Frank Thorp V', 'Mike Allen', 'Madeline Marshall', 'HowardKurtz', "Mike O'Brien", 'Michael McAuliff', 'Steve Contorno', 'Chris Suellentrop', 'Anna Palmer', 'Jonathan Strong', 'Tom Curry', 'John Berman', 'Jamie Dupree', 'Adam Smith', 'Matt Lewis', 'Ann Coulter', 'Steven Shepard', 'Jon Ralston', 'Caroline Horn', 'Bill Keller', 'Michelle Jaconi', 'James Bennet', 'Russell Berman', 'Aaron Blake', 'Dan Balz', 'Jeffrey Young', 'Joe McQuaid', 'David S. Joachim', 'O. Kay Henderson', 'Julie Bosman', 'Ken Thomas', 'Matt Fuller', 'Reid J. Epstein', 'Reid Cherlin', 'Shawna Thomas', 'Steve Bousquet', 'Steve Benen', 'Kyle Kondik', 'John Bresnahan', 'Paul Kane', 'Jessica Yellin', 'Mark Benjamin', 'Alicia M. Cohn', 'Major Garrett', 'Ryan Lizza', 'Melinda Henneberger', 'Ben Jacobs', 'Josh Kraushaar', 'Glenn Greenwald', 'Jordan Fabian', 'Katie Smith Allen', 'Sam Stein', 'Abby D. Phillip', 'Bob Cohn', 'Patricia Murphy', 'Steven Portnoy', 'Dana Bash', 'Nicholas Jackson', 'Manu Raju', 'Julie Davis', 'Terry Moran', 'Michael Falcone', 'Dave Wasserman', 'Megan Carpentier', 'Andrew Rafferty', 'Marc Ambinder', 'lucy morgan', 'Bret Baier', 'Nick Valencia', 'Karen Tumulty', 'Jim Acosta', 'Arlette Saenz', 'George Bennett', 'Matt Stiles', 'amy walter', 'Scott Bland', 'Steve Sebelius', 'Dan Eggen', 'Shira T. Center', 'John Dickerson', 'Katharine Q. Seelye', 'Carrie Dann', 'Neda Semnani', 'Cameron Joseph', 'Jennifer Duffy', 'Chris Moody', 'Olivier Knox', 'Cook Political Report', 'Peter Hamby', 'Trish Turner', 'Walter Shapiro', 'Michael Hirsh', 'Philip Rucker', 'Neil King', 'carl hulse', 'Sara Murray', 'Jonathan Capehart', 'Byron Tau', 'Emily Pierce', 'Elahe Izadi', 'Matthew Daly', 'Melissa Harris-Perry', 'James Hohmann', 'Matt Vasilogambros', 'Elizabeth Titus', 'Kasie Hunt', 'Lisa Desjardins', 'Thomas DeFrank', 'Bob Cusack', 'Beth Reinhard', 'Jessica Taylor', 'Annie Karni', 'Michael C. Bender', 'Steven Ginsberg', 'Steve Peoples', 'David Wastell', 'Ann Curry', 'Josh', 'Lauren Fox', 'George Stephanopoulos', 'Daniel', 'Glenn Thrush', 'Larry Sabato', 'Jeremy W. Peters', 'Joshua Green', 'Betsy Fischer Martin', 'Steven Dennis', 'Rick Dunham', 'David Mark', 'Anderson Cooper', 'Reid Wilson', 'Rebecca Berg', 'Charles Krauthammer', 'Emma Dumain', 'Charles Dharapak', 'Phil Elliott', 'Jennifer Bendery', 'Jonathan Martin', 'Rick Klein', 'Amanda Muoz-Temple', 'Nate Silver', 'Mark Z. Barabak', 'AP Politics', 'Robert Yoon', 'Ali Rogin', 'devindwyer', 'Anjeanette Damon', 'Paul Krugman', 'Jeff Zeleny', 'Dave Levinthal', 'Henry C.J. Jackson', 'Tom Bevan', 'David A. Graham', 'Rachel Rose Hartman', 'John Gizzi', 'Jeremy P. Jacobs', 'Amy Gardner', 'Kate Nocera', 'Eliot Nelson', 'Bob Schieffer', 'Mark Murray', 'Dan Merica', 'Michael Crowley', 'Jose A. Del Real', "P. J. O'Rourke", 'Holly Ramer', 'Shannon Travis', 'Marin Cogan', 'Adam Wollner', 'Perry Bacon Jr.', 'Taegan Goddard', 'Ted Bridis', 'Jill Abramson', 'Patrick W. Gavin', 'Jo Ling Kent', 'David Nakamura', 'Deirdre Walsh', 'Caitlin Huey-Burns', 'Joe Scarborough', 'Natalie Jennings', 'Dan Nowicki', 'Kevin Brennan', 'Susan Davis', 'Amie Parnes', 'Ron Lieber', 'Rosalind Helderman', 'bonney', 'Kenneth P. Vogel', 'Rachel Streitfeld', 'Matthew Keys', 'Felix Salmon', 'Alex Parker', 'Maggie Haberman', 'Benny', 'CNN Political Ticker', 'andrew kaczynski', 'Erin McPike', 'Dan Hirschhorn', 'Domenico Montanaro', 'Leslie Larson Caimi', 'Amy Harder', 'Donna Brazile', 'Dylan Byers', 'Katie Zezima', "Ed O'Keefe", 'Alex Roarty', 'Dan Berman', 'AnnGerhart', 'Julie Mason', 'Dan Lothian', 'Patrick LaForge', 'Maggie', 'David M. Drucker', "Adam O'Neal", 'Laura E. Davis', 'Kevin Bohn', 'Ed Henry', 'Nathan Gonzales', 'Adam B. Kushner', 'Alexis Simendinger', 'Megyn Kelly', 'Alexandra Jaffe', 'Rachel Maddow MSNBC', 'Matt Wuerker', 'Aaron Gould Sheinin', 'Troy Kinsey', 'Peter Baker', 'Jenny Blanco', 'Gregg Birnbaum', 'Josh Gerstein', 'Terence Samuel', 'Burgess Everett', 'Charlie Mahtesian', 'Dana Perino', 'Emily Heil', 'Jamie Kirchick', 'Megan McArdle', 'Susan Ferrechio', 'Wolf Blitzer', 'melissa block', 'Jamie Gray', 'Kathie Obradovich', 'Shushannah Walshe', 'PETER MAER', 'Jonathan Allen', 'Ed Hornick', 'Ethan Klapper', 'Carl Cannon', 'Tim Alberta', 'Robert Costa', 'Carol Lee', 'Gabriel Debenedetti', 'Todd Zwillich', 'Anita Kumar', 'Matt Viser', 'Jeffrey Goldberg', 'George Condon', 'Donovan Slack', 'Josh Lederman', 'Alex Brown', 'Jordan J Frasier', "Patrick O'Connor", 'Beth Fouhy', 'Jason Horowitz', 'McKay Coppins', 'Kathleen Hennessey', 'Dick Stevenson', 'Chris Licht', 'Jim Roberts', 'Savannah Guthrie', 'Vaughn Sterling', 'Greta Van Susteren', 'Andrew Malcolm', 'Marty Kady', 'Andrea Mitchell', 'Niels Lesniewski', 'Chris Cillizza', 'Dana Milbank', 'Julie Pace', 'Taylor West', 'Colleen Nelson', 'Joe Hagan', 'Nick Corasaniti', 'Christian Heinze', 'Holly Bailey', 'Karen Travers', 'Dave Weigel', 'Mark Joyella', 'Tim Grieve', 'David Freedlander', 'Emma V. Angerer', 'David Muir', 'Tom Diemer', 'Eamon Javers', 'Eliza Newlin Carney', 'Michael Barbaro', 'Adriel Bettelheim', 'Aman Batheja', 'Edward-Isaac Dovere', 'Jan Crawford', 'David Catanese', 'Emily C. Singer', 'Molly Ball', 'Glenn Beck', 'Gabriel Sherman', 'Carol Costello', 'Mike Memoli', 'michael viqueira', "John O'Connor", 'Mark Preston', 'Judy Kurtz', 'Chris Stirewalt', 'Jesse Rodriguez', 'Sean Geary Higgins', 'Jennifer Epstein', 'Garance Franke-Ruta', 'Hadas Gold', 'Lauren Whittington', 'Jonathan Karl', 'jodikantor', 'Brianna Keilar', 'Fareed Zakaria', 'JonathanWeisman', 'Jamie Novogrod', 'Mark Leibovich', 'Lloyd Grove', 'ryan teague beckwith', 'Stephanie Ebbert', 'Jill Jackson', 'Chuck Todd', 'Alex Burns', 'Alex Bolton', 'Ashley Parker', 'Rebecca Shabad', 'Jonathan Easley', 'NYT Politics', 'Mark Halperin', 'David Leonhardt', 'Abby Livingston', 'Patricia Zengerle', "Kelly O'Donnell", 'Lauren S. Camera', 'Scott Wilson', 'Alex Pappas', 'Marc Fortier', 'Ben Adler', 'Alexander Mooney', 'Paul Steinhauser', 'Sam Youngman', 'Alex Moe', 'Scott Conroy', 'Jill Lawrence', 'Jenna Sakwa', 'National Journal', 'Luke Russert', 'Mike Barnicle', 'Jennifer Jacobs', 'Jake Sherman', 'Chris Hayes', 'Sean Sullivan', 'David Chalian', 'Felicia Sonmez', 'Peter Foster', 'Jake Tapper', 'Stuart Rothenberg', 'Ben Leubsdorf', 'Marc Caputo', 'Sarah Huisenga', 'Mark Knoller', 'Adam Beam', "Bill O'Reilly", 'James Pindell', 'Meredith Shiner', 'Mackenzie Weinger', 'Julie Sobel', 'Jay Newton-Small', 'Glen Johnson', 'Rebecca Kaplan', 'Brooke Brower', '2016 Iowa Caucuses', 'Nikole Killion', 'Jackie Kucinich', 'Ben Smith', 'Chad Pergram', 'Kate Tummarello', 'Jim Geraghty', 'Emily Schultheis', 'Christiane Amanpour', 'Jon Resnick DJI', 'jimrutenberg', 'jack healy', 'Steve Holland', 'Pema Levy', 'Nick Confessore', 'Drew Cline', 'Ginger Gibson', "Norah O'Donnell", 'Sarah Mimms', 'Ryan Murphy', 'Lisa Lerer', 'Zeke Miller'];

	$('#myVal').autocomplete({
	    lookup: names,
	    onSelect: function (suggestion) {
	      selected = suggestion.value;
	      handleClick();
	    }
	});

	// checkers to see what the most recently executed algorithm was 
	// in order to clear any irrelevant objects from the view
	var previouslyKMeans = false;
	var previouslyAgg = false;

	////////// Clustering Algorithms 

	function gaussian() {
		if (previouslyKMeans)
			clearKMeans();

		if (previouslyAgg)
			clearAggClustering();

		algo_change(0);
		previouslyAgg = false;
		previouslyKMeans = false;
	}

	function spectral() {
		if (previouslyKMeans)
			clearKMeans();

		if (previouslyAgg)
			clearAggClustering();

		algo_change(1);
		previouslyAgg = false;
		previouslyKMeans = false;
	}

	// implementing K Means Clustering 

	// finds the points that are nearest to the three centroids
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

	// moves the lines to point to their updated group of nodes
	function findClosest(lines, centroids, points) {
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

	// moves the centroids to their new centroid locations
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

	// animates K Means
	function cluster(lines, centroids, centroidCircles, points) {
		var timesRun = 0;

		var interval = setInterval(function () {
			timesRun += 1;
			findClosest(lines, centroids, points);
			moveMeans(lines, centroids, centroidCircles, points);
			
			if (timesRun === 20)
	        	clearInterval(interval);
		}
		, 1000);

	}

	// putting everything together
	function kmeans(){
		previouslyKMeans = true;

		if (previouslyAgg)
			clearAggForKMeans();

		previouslyAgg = false;

		var lines, circles, centroids;
		var points = [];

		for (var i = 0; i < comp1.length; i++) {
			points.push({
				cluster: -1,
				x: comp1[i],
				y: comp2[i]
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

	// Implementing Agglomerative Clustering 

	//c1 is all of the circles of color1, c2 is all of the circles of color2, etc.
	var c1, c2, c3;

	function agglomerative(){
		previouslyAgg = true;

		if (previouslyKMeans) {
			clearKMeans();
		}

		previouslyKMeans = false;

		algo_change(2)

		clump(c1, 0);

		d3.selectAll(".blurValues")
			.transition().duration(1000).delay(1000)
			.attrTween("values", function() {
				return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6",
												"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5");
			});

		clump(c2, 1);

		d3.selectAll(".blurValues")
			.transition().duration(1000).delay(1000)
			.attrTween("values", function() {
				return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6",
												"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5");
			});

		clump(c3, 2);

		d3.selectAll(".blurValues")
			.transition().duration(1000).delay(1000)
			.attrTween("values", function() {
				return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6",
												"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5");
			});

	}

	// clumps nodes of the same group together to their centroid value on the canvas
	function clump(colorPoints, index) {
		var aggCentroids = [[0.98357655389628795, 0.042222006389032063], [-1.9114944687702777, 0.17076873899592768], [-0.4882784109814387, -0.13816327866093175]]
		colorPoints = canvas.selectAll('circle').filter(function (d) {
				return d.Agglomerative == index;
			})
			.transition()
			.duration(2000).delay(function(d,i) { return i * 5; })
			.attr("cx", x(aggCentroids[index][0]))
			.attr("cy", y(aggCentroids[index][1]))
			.attr("r", function(d) {
				return 0.8 * Math.pow(d.Followers,0.3);
			})
			.attr('fill', hexColors[index])
			.style("opacity", 1);

	}

	// expands nodes is user clicks on canvas during agglomerative clustering
	canvas.selectAll('circle').on("click", function(d) {
		if(previouslyAgg){
			clearAggClustering();
			previouslyAgg = false;
		}
	});

	////////// Clearing Animations

	function clearKMeans(){
		d3.selectAll('line').remove();
		d3.selectAll('.centroid').remove();
	}

	function clearAggClustering() {
		canvas.selectAll("circle")
			.transition("move").duration(2000)
						.delay(function(d,i) { return i * 5; })
			.attr('r', function (d) {
				return 8 * Math.pow(d.Followers,0.3) / 50;
			})
			.attr('cx', function (d) {
				return x(d.Comp1);
			})
			.attr('cy', function (d) {
				return y(d.Comp2);
			})
			.style("opacity", 1);
	}


	function clearAggForKMeans() {
		canvas.selectAll("circle")
			.transition("move").duration(1000)
			.attr('r', function (d) {
				return 8 * Math.pow(d.Followers,0.3) / 50;
			})
			.attr('cx', function (d) {
				return x(d.Comp1);
			})
			.attr('cy', function (d) {
				return y(d.Comp2);
			})
			.style("opacity", 1);
	}

	// mouse click events
	function handleClick() {
      var name = document.getElementById("myVal").value
			for(var j in data){
				if(data[j]['Names'].toLowerCase().includes(name.toLowerCase())) {
					console.log(data[j]['Names'])
					var div = d3.select("body").select("#innertext")
				        .attr("class", "tooltip")
				        .style("opacity", 0);

      div.transition().duration(500)
          .style('opacity', '1.0')
				var cluster_algos = [data[j]['Gaussian'], data[j]['Spectral'], data[j]['Agglomerative'], data[j]['KMeans']];
				div.html(
					"<span style='font-size:32; font-family:NeueMontreal'>" + data[j]['Names'] + "</span> <br>" +
					"<span style='color:	#484848; font-style:italic'>" + data[j]['Followers'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").substring(0, data[j]['Followers'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length - 2) + " followers </span><br><br>" +
					data[j]['Descriptions'] + "<br><br>" +
					"_______________________________________________________<br><br>" +
					`<div style='font-size:17.5; line-height:40px; font-family:NeueMontreal'><center><i>Prominent Journalists Within Cluster</i></center></div>` +
					`<span style='font-size:16; color:#202020;line-height:30px'><center>${prominents[algo][cluster_algos[algo]][0]}<br>${prominents[algo][cluster_algos[algo]][1]}<br>${prominents[algo][cluster_algos[algo]][2]}<br><br><span style='font-size:80; color:${hexColors[cluster_algos[algo]]}'>&#9673</span></center></span>`
				);

				canvas.selectAll('circle').filter(function (d) {
					return d.Names == data[j]['Names'];}).moveToFront();


				// Makes the circle blink and turn green when a user searches for the specific node
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

  	// adding button functionality
	d3.select('#select').on('click', handleClick);
	d3.select('#gaussian').on('click', gaussian);
	d3.select('#spectral').on('click', spectral);
	d3.select('#agglomerative').on('click', agglomerative);
	d3.select('#kmeans').on('click', kmeans);
});
