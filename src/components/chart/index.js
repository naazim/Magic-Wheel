import React from 'react';
import d3 from 'd3';


export const colors = ["#7FD322", "#FFD805", "#DC3545"];

class Chart extends React.Component {

  componentDidMount() {
    this.createPieChart();
  }

  componentDidUpdate(prevProps) {
    const {data: layerData} = this.props;

    // only update chart if the data has changed
    if (prevProps.data !== layerData) {


      // Remove the existing text before adding new
      this.svg.selectAll(`.chart__text`).remove();


      for (let index = 0; index < layerData.length; index++) {
        //Add the updated text layer
        this.addTextLayer(index);
      }
    }
  }

  // Append the layer names within the arcs
  addTextLayer = (index) => {
    const {data: layerData} = this.props;
    return this.svg
      .selectAll(`.chart__text${index}`)
      .data(layerData[index])
      .enter()
      .append("text")
      .attr("class", `chart__text${index === 0 ? ' chart__text--innermost' : ''}`)
      .attr("dy", this.textPadding) //Move the text down
      .append("textPath")
      .attr("id", (d, i) => `chart__textpath${index}_${i}`)
      .style({"text-anchor": "middle"})
      .attr("startOffset", `23%`)
      .attr("xlink:href", (d, i) => `#chart__arc${index}_${i}`)
      .text(d => d);
  };

  createPieChart = () => {
    const layerData = this.props.data;

    //since the fetcheed colors are in rgb format, convert them back to hex
    const rgbToHex = x => "#" + x.match(/\d+/g)
      .map((z => (+z < 16 ? "0" : "") + (+z > 255 ? 255 : +z).toString(16)))
      .join("");

    const containerHeight = document.querySelector('.chart').clientHeight;
    const margin = {left: 24, top: 24, right: 24, bottom: 24},
      width = containerHeight - margin.left - margin.right,
      height = containerHeight - margin.top - margin.bottom;


    const layerSize = height / layerData.length / 2;
    this.textPadding = layerSize / 2 + 4; // 4 = border width * 2


    this.svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "multiLayerPie")
      .style("font-family", "\"Roboto\", -apple-system, BlinkMacSystemFont, \"Segoe UI\"")
      .append("g")
      .attr("class", "wrapper")
      .attr(
        "transform",
        "translate(" +
        (width / 2 + margin.left) +
        "," +
        (height / 2 + margin.top) +
        ")"
      );


    // Loop through arrays and draw svg fo all layers
    for (let index = 0; index < layerData.length; index++) {

      //Creates a function that makes SVG paths in the shape of arcs with the specified inner and outer radius
      const arc = d3.svg
        .arc()
        .innerRadius(layerSize * index)
        .outerRadius(layerSize + layerSize * index);

      //Creates function that will turn the layer data into start and end angles
      const pie = d3.layout.pie().value(function (d) {
        return true;
      });

      //Draw the arcs themselves
      this.svg
        .selectAll(`.chart__arc${index}`)
        .data(pie(layerData[index]))
        .enter()
        .append("path")
        .attr("class", "chart__arc")
        .attr("d", arc)
        .attr("id", (d, i) => `chart__arc${index}_${i}`)
        .on("click", function (d) {
          const currentColorRGB = d3.select(this).style("fill");
          const currentColor = rgbToHex(currentColorRGB); //current color in hex
          const nextColorIndex = colors.indexOf(currentColor.toUpperCase()) + 1;
          const nextColor =
            nextColorIndex >= colors.length ? colors[0] : colors[nextColorIndex];  //if you need white as well, use '>' instead of '>='
          d3.select(this).style("fill", nextColor);
        });

      this.addTextLayer(index);


    }
  };


  render() {
    return <div className="chart"/>;
  }

}

export default Chart;