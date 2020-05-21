function dashboard(id, Data){
  var barColor = 'steelblue';

  function pieSeg(c){ return {Bronx: "mediumorchid", Brooklyn: "palevioletred", Manhattan: "slategray", Queens: "mediumturquoise", "Staten Island": "darkmagenta"}[c]; }

  Data.forEach(function(d){d.total = d.Borough.Bronx+ d.Borough.Brooklyn + d.Borough.Manhattan + d.Borough.Queens + d.Borough["Staten Island"];});

  function barChart(fD){
    var bC = {},
    width = window.innerWidth * 0.55, 
    height = window.innerHeight / 2,
    margin = {top: 20, bottom: 20, left: 20, right: 40};

    var xScale = d3
      .scaleBand()
      .domain(fD.map(function(d) { return d[0]; }))
      .range([0, width - margin.right])
      .paddingInner(0.05);

    var yScale = d3
      .scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, d3.max(fD, function(d) { return d[1]; })]);
    
    var xAxis = d3.axisBottom(xScale);

    var bCsvg = d3
      .select(id)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    bCsvg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    var bars = bCsvg
      .selectAll(".bar")
      .data(fD)
      .enter()
      .append("g")
      .attr("class", "bar");

    bars
      .append("rect")
      .attr("x", function(d) { return xScale(d[0]); })
      .attr("y", function(d) { return yScale(d[1]); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - margin.bottom - yScale(d[1]); })
      .attr("fill", barColor)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    bars
      .append("text")
      .text(function(d){ return d3.format(",")(d[1]) })
      .attr("x", function(d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .attr("y", function(d) { return yScale(d[1])-3; })
      .attr("text-anchor", "middle")
      .attr("fill", "grey");

    function mouseover(d){  
      var st = Data.filter(function(s){ return s.Descriptor == d[0]; })[0],
      nD = d3.keys(st.Borough).map(function(s){ return {type:s, Borough:st.Borough[s]}; });
               
      pC.update(nD);
      leg.update(nD);
    }

    function mouseout(d){       
      pC.update(tF);
      leg.update(tF);
    }

    bC.update = function(nD, color){
      yScale.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
      var bars = bCsvg.selectAll(".bar").data(nD);
            
      bars
        .select("rect")
        .transition()
        .duration(500)
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return height - margin.bottom - yScale(d[1]); })
        .attr("fill", color);

      bars
        .select("text")
        .transition()
        .duration(500)
        .text(function(d){ return d3.format(",")(d[1]) })
        .attr("y", function(d) { return yScale(d[1])-3; });            
    }        
    return bC;
  }

  function pieChart(pD){
    var pC = {},    
    pieDim = {w: 300, h: 300};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
    var piesvg = d3
      .select(id)
      .append("svg")
      .attr("width", pieDim.w)
      .attr("height", pieDim.h)
      .append("g")
      .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
    var arc = d3
      .arc()
      .outerRadius(pieDim.r - 10)
      .innerRadius(0);

    var pie = d3
      .pie()
      .sort(null)
      .value(function(d) { return d.Borough; });

    piesvg
      .selectAll("path")
      .data(pie(pD))
      .enter()
      .append("path")
      .attr("d", arc)
      .each(function(d) { this._current = d; })
      .style("fill", function(d) { return pieSeg(d.data.type); })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    pC.update = function(nD){
      piesvg
        .selectAll("path")
        .data(pie(nD))
        .transition()
        .duration(500)
        .attrTween("d", arcTween);
    }        
        
    function mouseover(d){
      bC.update(Data.map(function(v){ return [v.Descriptor,v.Borough[d.data.type]]; }), pieSeg(d.data.type));
    }
     
    function mouseout(d){
      bC.update(Data.map(function(v){ return [v.Descriptor,v.total]; }), barColor);
    }
        
    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) { return arc(i(t)); };
    }    
    
    return pC;
  }
    
  function legend(lD){
    var leg = {};
            
    var legend = d3
      .select(id)
      .append("table")
      .attr('class','legend');
        
    var tr = legend
      .append("tbody")
      .selectAll("tr")
      .data(lD)
      .enter()
      .append("tr");
            
    tr
      .append("td")
      .append("svg")
      .attr("width", '16')
      .attr("height", '16')
      .append("rect")
      .attr("width", '16')
      .attr("height", '16')
			.attr("fill", function(d){ return pieSeg(d.type); });
            
    tr
      .append("td")
      .text(function(d){ return d.type; });

    tr  
      .append("td")
      .attr("class", 'legendBorough')
      .text(function(d){ return d3.format(",")(d.Borough); });

    tr
      .append("td")
      .attr("class",'legendPerc')
      .text(function(d){ return getLegend(d,lD); });

    leg.update = function(nD){
      var l = legend.select("tbody").selectAll("tr").data(nD);

      l.select(".legendBorough").text(function(d){ return d3.format(",")(d.Borough); });

      l.select(".legendPerc").text(function(d){ return getLegend(d,nD); });        
    }
        
    function getLegend(d,aD){ 
      return d3.format(",.2%")(d.Borough / d3.sum(aD.map(function(v){ return v.Borough; })));
    }
    return leg;
  }
    
  var tF = ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'].map(function(d){ return {type:d, Borough: d3.sum(Data.map(function(t){ return t.Borough[d]; }))}; });    
    
  var sF = Data.map(function(d){ return [d.Descriptor,d.total]; });

  var bC = barChart(sF),
  pC = pieChart(tF), 
  leg= legend(tF);
}

data = [{Descriptor: 'Organisms', Borough: {Bronx: 35, Brooklyn: 17, Manhattan: 16, Queens: 31, "Staten Island": 14}}, {Descriptor: 'Particles', Borough: {Bronx: 180, Brooklyn: 417, Manhattan: 315, Queens: 366, "Staten Island": 103}}, {Descriptor: 'Cloudy/Milky', Borough: {Bronx: 383, Brooklyn: 659, Manhattan: 685, Queens: 687, "Staten Island": 310}}, {Descriptor: 'Oil/Grease', Borough: {Bronx: 63, Brooklyn: 96, Manhattan: 60, Queens: 76, "Staten Island": 25}}, {Descriptor: 'Other', Borough: {Bronx: 36, Brooklyn: 99, Manhattan: 79, Queens: 80, "Staten Island": 46}}, {Descriptor: 'Bitter/Metallic', Borough: {Bronx: 173, Brooklyn: 325, Manhattan: 361, Queens: 255, "Staten Island": 76}}, {Descriptor: 'Chemical', Borough: {Bronx: 143, Brooklyn: 360, Manhattan: 364, Queens: 289, "Staten Island": 126}}, {Descriptor: 'Chlorine', Borough: {Bronx: 119, Brooklyn: 316, Manhattan: 267, Queens: 268, "Staten Island": 112}}, {Descriptor: 'Musty Odor', Borough: {Bronx: 226, Brooklyn: 274, Manhattan: 687, Queens: 242, "Staten Island": 106}}, {Descriptor: 'Sewer Odor', Borough: {Bronx: 169, Brooklyn: 256, Manhattan: 198, Queens: 290, "Staten Island": 93}}, {Descriptor: 'Unknown Odor', Borough: {Bronx: 260, Brooklyn: 367, Manhattan: 413, Queens: 289, "Staten Island": 103}}];

dashboard('#dashboard', data);
