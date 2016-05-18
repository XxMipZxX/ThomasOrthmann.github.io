var margin ={top:20, right:30, bottom:30, left:40},
    width=960-margin.left - margin.right, 
    height=300-margin.top-margin.bottom;

                var datasetFull=[];
                var datasetTillDate=[];
                var dataset;

                d3.json("json/collisionPerYear.json", function(data) {
                    for (var i = 0, l=data.length, j=0, k=0; i <l; i++) {
                        if (data[i]['Type']=="FullYear") {
                            datasetFull.push([]);
                            datasetFull[j].push(data[i]["Year"]);
                            datasetFull[j].push(data[i]["Occurrence"]); 
                            j++;
                        }
                        else {
                            datasetTillDate.push([]);
                            datasetTillDate[k].push(data[i]["Year"]);
                            datasetTillDate[k].push(data[i]["Occurrence"]); 
                            k++; 
                        }
                    };

                    dataset=datasetFull;

                    //var maxProstitution2003=Math.max(arrayProstitution2003);

                    function getMaxOfArray(numArray) {
                        return Math.max.apply(null, numArray);
                    }

                    var maxCollision=getMaxOfArray(dataset);

                    var x = d3.scale.ordinal()
                                    .domain(dataset.map(function(d){ return d[0]; }))
                                    .rangeRoundBands([0, width], .1);

                    var y = d3.scale.linear()
                                    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                    .range([height, 0]);

                    var barHeight = d3.scale.linear()
                                         .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                         .range([1, height]);

                    //Define X axis
                    var xAxis = d3.svg.axis()
                                      .scale(x)
                                      .orient("bottom");

                    //Define Y axis
                    var yAxis = d3.svg.axis()
                                      .scale(y)
                                      .orient("left");

                    //Create SVG element
                    var chart = d3.select("#chart2")  
                                  .append("svg")  //append svg element inside #chart
                                  .attr("width", width+(2*margin.left)+margin.right)    //set width
                                  .attr("height", height+margin.top+margin.bottom);

                    var bar = chart.selectAll("g")
                                    .data(dataset)
                                    .enter()
                                    .append("g")
                                    .attr("transform", function(d, i){
                                      return "translate("+x(d[0])+", 0)";});
                                    
                    //Create circles
                    bar.append("rect")
                        .attr("y", function(d) { 
                          return y(d[1]); 
                        })
                        .attr("x", function(d,i){
                          return 40;
                        })
                        .attr("height", function(d) { 
                          return barHeight(d[1]); 
                        })
                        .attr("width", x.rangeBand());

                    bar.append("text")
                        .attr("x", x.rangeBand()/2+45)
                        .attr("y", function(d) { return y(d[1]) + 2; })
                        .attr("dy", ".75em")
                        .text(function(d) { return d[1]; })
                        .style('fill', 'black');

                    chart.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate("+margin.left+","+ height+")")        
                        .call(xAxis)
                        .selectAll("text")  
                            .style("text-anchor", "end")
                            .attr("dx", "-.8em")
                            .attr("dy", ".15em")
                            .attr("transform", "rotate(-65)" );

                    chart.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate("+margin.left+",0)")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Occurrence");

                    d3.select("#ButtonFull")
                        .on("click", function() {
                            var dataset=datasetFull;

                            y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

                            chart.select(".y.axis")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                                    
                            //Update all bars
                            bar.select("rect")
                               .data(dataset)
                               .transition()
                               .duration(1000)
                               .attr("y", function(d) { 
                                  return y(d[1]); 
                                })
                                .attr("height", function(d) { 
                                  return barHeight(d[1]); 
                                });

                            bar.select("text")
                                   .data(dataset)
                                   .transition()   
                                   .duration(1000)
                                    .attr("y", function(d) { return y(d[1]) + 2; })
                                    .attr("dy", ".75em")
                                    .text(function(d) { return d[1]; });



                        }); 

                      d3.select("#ButtonTillDate")
                        .on("click", function() {
                            var dataset=datasetTillDate;

                            y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

                            chart.select(".y.axis")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                                    
                            //Update all bars
                            bar.select("rect")
                               .data(dataset)
                               .transition()
                               .duration(1000)
                               .attr("y", function(d) { 
                                  return y(d[1]); 
                                })
                                .attr("height", function(d) { 
                                  return height/284*d[1]; 
                                });

                            bar.select("text")
                                   .data(dataset)
                                   .transition()   
                                   .duration(1000)
                                    .attr("y", function(d) { return y(d[1]) + 2; })
                                    .attr("dy", ".75em")
                                    .text(function(d) { return d[1]; });

                            


                        });

                    
                });
