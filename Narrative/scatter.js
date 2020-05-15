export function scatter() {
    const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 },
    radius = 5;
  
    let svg;
    let xScale;
    let xAxis;
    let yScale;
    let yAxis;
  
    let state = {
      data: null,
      selectedborough: "All"
    };
  
    d3.csv("Final Dataset.csv", d3.autoType).then(raw_data => {
      state.data = raw_data;
      init();
    });
  
    function init() {
      xScale = d3
      .scaleLinear()
      .domain([0, d3.max(state.data, d => d["Water Quality"])])
      .range([margin.left, width - margin.right]);
  
      yScale = d3
      .scaleLinear()
      .domain([0, d3.max(state.data, d => d["Waterborne Illness"])])
      .range([height - margin.bottom, margin.top]);
  
      xAxis = d3.axisBottom(xScale);
      yAxis = d3.axisLeft(yScale);
  
      const selectElement = d3.select("#dropdown").on("change", function() {
        console.log("new selected borough is", this.value);
        state.selectedborough = this.value;
        draw(); 
      });
  
      selectElement
      .selectAll("option")
      .data(["All", "Bronx", "Brooklyn", "Queens", "Manhattan", "Staten Island"]) 
      .join("option")
      .attr("value", d => d)
      .text(d => d);
  
      svg = d3
      .select("#d3-container-scatter")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
      svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("x", "50%")
      .attr("dy", "3em")
      .text("Water Quality Complaints per Year");
  
      svg
      .append("g")
      .attr("class", "axis y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("y", "50%")
      .attr("dx", "-3em")
      .attr("writing-mode", "vertical-rl")
      .text("Waterborne Illness Cases per Year");
  
      draw();
    }
  
  
    function draw() {
      let filteredData = state.data;
      if (state.selectedborough !== "All") {
        filteredData = state.data.filter(d => d.Borough === state.selectedborough);
      }
      
      xScale.domain([0, d3.max(filteredData, d => d["Water Quality"])]);

      d3.select("g.x-axis")
      .transition()
      .duration(1000)
      .call(xAxis.scale(xScale));

      yScale.domain([0, d3.max(filteredData, d => d["Waterborne Illness"])]);

      d3.select("g.y-axis")
      .transition()
      .duration(1000)
      .call(yAxis.scale(yScale));
  
      const dot = svg
      .selectAll(".dot")
      .data(filteredData, d => d.Borough)
      .join(
        enter =>
          enter
            .append("circle")
            .attr("class", "dot") 
            .attr("stroke", "lightgrey")
            .attr("opacity", 1)
            .attr("fill", d => {
              if (d.Borough === "Bronx") return "mediumorchid";
              else if (d.Borough === "Brooklyn") return "palevioletred";
              else if (d.Borough === "Queens") return "plum";
              else if (d.Borough === "Manhattan") return "mediumturquoise"; 
              else return "cornflowerBlue";
              })
            .attr("r", radius)
            .attr("cy", d => yScale(d["Waterborne Illness"]))
            .attr("cx", d => margin.left) 
            .call(enter =>
                enter
                  .attr("cx", d => xScale(d["Water Quality"])) .transition()
                  .delay(d => 500 * d["Water Quality"]) 
              ),
          update =>
            update.call(update =>
              update
                .transition()
                .duration(250)
                .attr("stroke", "black")
                .transition()
                .duration(250)
                .attr("stroke", "lightgrey") 
            ),
          exit =>
            exit.call(exit =>
              exit
                .transition()
                .delay((d,i) => i*.5)
                .duration(500)
                .attr("cy", height - margin.bottom)
                .remove() 
          )
      );
    }
}