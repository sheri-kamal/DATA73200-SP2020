export function bar2() {
    const width = window.innerWidth * 0.45,
      height = window.innerHeight * 0.7,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 50, left: 60, right: 40 };
  
    d3.csv("Final Dataset Simplified.csv", d => ({
      Borough: d.Borough,
      ['Water Quality']: +d['Water Quality'],
    })).then(data => {
  
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.Borough))
      .range([margin.left, width - margin.right])
      .paddingInner(paddingInner);
  
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d['Water Quality'])])
      .range([height - margin.bottom, margin.top]);
  
    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0s"));
  
    const colorScale = d3
      .scaleOrdinal(d3.schemeAccent)
      .domain(d => d.Borough);
  
    const svg = d3
      .select("#d3-container-bar2")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    svg
      .append("g")
      .attr("class", "title")
      .append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .text("Water Quality Complaints in NYC");
  
    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("x", "50%")
      .attr("dy", "3em")
      .text("Borough");
  
    svg
      .append("g")
      .attr("class", "axis y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("y", "50%")
      .attr("dx", "-3em")
      .attr("writing-mode", "vertical-lr")
      .text("Water Quality Complaints");
  
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => yScale(d['Water Quality']))
      .attr("x", d => xScale(d.Borough))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d['Water Quality']))
      .attr("fill", "darkcyan")
  
    svg
      .append("g")
      .attr("class", "label")
      .append("text")
      .attr("x", d => xScale(d.Borough) + (xScale.bandwidth() / 2))
      .attr("y", d => yScale(d['Water Quality']))
      .text(d => d['Water Quality'])
      .attr("dy", "1.25em");
  
    });
}
