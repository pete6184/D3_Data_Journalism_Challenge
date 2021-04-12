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
