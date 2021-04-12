// Set SVG parameters
const svgWidth = 900;
const svgHeight = 500;

// Set margins
const margin = {
    t: 20,
    b: 20,
    l: 20,
    r: 20
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeigth - margin.top - margin.bottom;

// Create SVG wrapper, append SVG group, shift margins
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./data/data.csv").then(stateData => {
    
    // Parse data/cast as numbers
    stateData.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Create scale functions
    const xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    const yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.healthcare)])
        .range([height, 1]);

    // Create axis functions
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3. axisLeft(yLinearScale);


    // Append axes to the chart
    chartGroup.append('g')
        .call(leftAxis);

    // Create circles
    const circlesGroup = chartGroup.selectAll('circle')
    .data(stateData)
    .join('circle')
    .attr('cx' d => xLinearScale(d.poverty))
    .attr('cy' d => yLinearScale(d.healthcare))
    .attr('r', '15')
    .attr('fill', 'blue')
    .attr('opacity', 0.5)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

    // Initialize tool tip
    const toolTip = d3.tip()
        .attr('class', 'tooltip')
        .offset([80. -60])
        .html(d => `${d.state}<br>Poverty Rate: ${d.poverty}<br> Heathcare Rate: ${d.healthcare} `);

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listener to display and hide the tooltip
    circlesGroup.on('mouseover', function(data) {
        toolTip.show(data, this);
    });

    .on('mouseout', function(data) {
        toolTip.hide(data);
    });

}).catch(error => console.log(error));
