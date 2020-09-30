//Scatter Plot
//Loading the dataset + Auto Type Conversion
d3.csv('cities.csv', d3.autoType).then(data=>{
	////////console.log('cities', data);         DELETE
	//Filter out Non-European cities
	data = data.filter(d=>d.eu==true);
	console.log('cities', data);

	//Set SVG for Scatter Plot
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	//Graphing
	//Draw a circle for each city
	svg.selectAll('circle')
        .data(data)
		.enter()
		.append('circle')
        .attr('r', function(d){
			if(d.population<1000000){
				return 4
			}
			else{
				return 8
			}
		})
        .attr('cx', function(d) { return d.x; })
		.attr('cy', function(d) { return d.y; })
		.attr('fill', 'skyblue');
	
	//Add Labels for cities with population >= 1,000,000
	svg.selectAll('.population-plot')
        .data(data)
		.enter()
		.filter((d,i)=>d.population>=1000000)
		.append('text')
		.attr('dx', function(d) { return d.x; })
		.attr('dy', function(d) { return d.y-10; })
		.attr('font-size', '12px')
		.text(function(d) { return d.country; })
		.style('text-anchor', 'middle');

	//Display the number of European cities
	svg.selectAll('.city-count')
	    .data(data)
		.enter()
		.append('text')
		.attr('dx', 0)
        .attr('dy', 20)
		.text(function(d) { return `Number of Cities: ${data.length}`; });
});

//Bar Chart
d3.csv('buildings.csv', d3.autoType).then(data=>{
	//Filter out Non-European cities
	data = data.sort(function(d, i){ return d3.descending(d.height_ft, i.height_ft); });
	console.log('buildings', data);

	//Set SVG for Bar Chart
	const widthB = 500;
	const heightB = 500;
	const svgB = d3.select('.bchart')
		.append('svg')
		.attr('width', widthB)
		.attr('height', heightB);

	//Graphing
	svgB.selectAll('rect')
        .data(data)
		.enter()
		.append('rect')
		.attr('x', (d,i)=>205)
		.attr('width', (d,i)=>d.height_px)
		.attr('y', (d,i)=>(i * 43) + 20)//.attr('y', (d,i)=>(i * width/data.length) + 10)
		.attr('height', 38)
		.attr("fill", "orange")
		.attr('class', 'bar')
		.on('click', (d, i)=>{
			d3.select('.image').attr('src', "img/" + i.image)
			d3.select('.building-name').text(i.building)
			d3.select('.height').text(i.height_ft)
			d3.select('.city').text(i.city)
			d3.select('.country').text(i.country)
			d3.select('.floors').text(i.floors)
			d3.select('.completed').text(i.completed)
		});

	svgB.selectAll('text.labels')
		.data(data)
		.enter()
		.append('text')
		.attr('dx', 5)
		.attr('dy', (d,i) => (i * 44) + 40)
		.text(function(d) {return d.building;})
		.attr('text-anchor', 'front')
		.attr('font-size', '14px')		
		.attr('fill', 'black')
	
	svgB.selectAll('text.values')
		.data(data)
		.enter()
		.append("text")
		.attr('dx', (d,i) => (d.height_px) + 190)
		.attr('dy', (d,i) => (i * 44) + 40)
		.text(d=> (d.height_ft + 'ft'))	
		.attr('text-anchor', 'end')
		.attr('font-size', '12px')	
		.attr('fill', 'white')
});