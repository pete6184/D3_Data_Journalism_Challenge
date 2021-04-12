// Set SVG parameters
const svgWidth = 1000;
const svgHeight = 600;

// Set margins
const margin = {
    top: 40,
    bottom: 50,
    left: 60,
    right: 80
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper, append SVG group, shift margins
const svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(stateData => {
    
    // Parse data/cast as numbers
    stateData.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Create scale functions
    const xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    const yLinearScale = d3.scaleLinear()
        .domain([2, d3.max(stateData, d => d.healthcare)])
        .range([height, 0]);

    // Create axis functions
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3. axisLeft(yLinearScale);


    // Append axes to the chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append('g')
        .call(leftAxis);

    // Create circles
    const circlesGroup = chartGroup.selectAll('circle')
    .data(stateData)
    .join('circle')
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr('r', '15')
    .attr('fill', 'blue')
    .attr('opacity', 0.5)
    .attr('stroke', 'red')
    .attr('stroke-width', 1)
    .text(d => d.abbr);

    // Initialize tool tip
    const toolTip = d3.tip()
        .attr('class', 'tooltip')
        .offset([100, 0])
        .html(d => `${d.state}<br>Poverty Rate: ${d.poverty}%<br> Heathcare Rate: ${d.healthcare}% `);

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listener to display and hide the tooltip
    circlesGroup.on('mouseover', function(data) {
        toolTip.show(data, this);
    })

        .on('mouseout', function(data) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height))
        .attr('dy', '1em')
        .attr('class', 'axisText')
        .text("Percentage of Population in Poverty");

    chartGroup.append('text')
        .attr('transform', `translate(${width / 3}, ${height + margin.top + 10} )`)
        .attr('class', 'axisText')
        .text("Percentage of Population w/o Healthcare");


}).catch(error => console.log(error));
