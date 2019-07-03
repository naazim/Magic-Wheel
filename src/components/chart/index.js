import React from 'react';
import d3 from 'd3';

export const colors = ["#7FD322", "#FFD805", "#DC3545"];

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.createPieChart = this.createPieChart.bind(this)
  }

  componentDidMount() {
    this.createPieChart()
  }

  componentDidUpdate() {
    this.createPieChart()
  }

  createPieChart() {
    const screenWidth = window.innerWidth;
    const layerSize = 80;
    const textPadding = layerSize / 2 + 4; // 4 = border width * 2

    let y;
    const rgbToHex = x =>
      "#" +
      x
        .match(/\d+/g)
        .map((y = z => (+z < 16 ? "0" : "") + (+z > 255 ? 255 : +z).toString(16)))
        .join("");

    const margin = {left: 20, top: 20, right: 20, bottom: 20},
      width = Math.min(screenWidth, 1000) - margin.left - margin.right,
      height = Math.min(screenWidth, 1000) - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "multilayerPie")
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

// Scales & Data
    const layerData = [
      ["Freude an der Arbeit", "Inhalt der Arbeit, Sinn", "Arbeitstätig-keiten"],
      ["Herausforderungsgrad", "Arbeitsvielfalt, Abwechslung", "Entscheidungsspielraum"],
      ["Verhältnis zu Vorgesetzten", "Verhältnis zu Kollegen/innen und Kunden/innen", "Firmenkultur, Leitbild, Werte", "Arbeitsklima insgesamt"],
      ["Lohn- und Sozialleistungen", "Arbeitszeit, Arbeitsflexibilität", "Arbeitsplatz an sich/ Ausstattung", "Tools/  Technologien, Interne Prozess", "Arbeitsweg", "Innovationsgrad des\n Unternehmens"],
      ["Weiterbildungsangebot der Firma", "Persönliche Personalentwicklung", "Firmenorganisation, -struktur", "Karrieremöglichkeiten in der Firma"]
    ];

    for (let index = 0; index < layerData.length; index++) {
      const outerRadiusVal =
        index === 0 ? layerSize * 2 : layerSize + layerSize * index;

      //Creates a function that makes SVG paths in the shape of arcs with the specified inner and outer radius
      const arc = d3.svg
        .arc()
        .innerRadius(layerSize * index)
        .outerRadius(layerSize + layerSize * index);

      //Creates function that will turn the layer data into start and end angles
      const pie = d3.layout.pie().value(function (d) {
        return true;
      });

      // Create the Slices

      //Draw the arcs themselves
      svg
        .selectAll(`.layerArc${index}`)
        .data(pie(layerData[index]))
        .enter()
        .append("path")
        .attr("class", "layerArc")
        .attr("d", arc)
        .attr("id", function (d, i) {
          return `layerArc${index}_${i}`;
        })
        .on("click", function (d) {
          const currentColorRGB = d3.select(this).style("fill");
          const currentColor = rgbToHex(currentColorRGB); //current color in hex
          const nextColorIndex = colors.indexOf(currentColor.toUpperCase()) + 1;
          const nextColor =
            nextColorIndex >= colors.length ? colors[0] : colors[nextColorIndex];
          d3.select(this).style("fill", nextColor);
        });

      // Append the layer names within the arcs
      svg
        .selectAll(`.layerText${index}`)
        .data(layerData[index])
        .enter()
        .append("text")
        .attr("class", "layerText")
        .attr("dy", textPadding) //Move the text down
        .append("textPath")
        .style({"text-anchor": "middle"})
        .attr("startOffset", `23%`)
        .attr("xlink:href", function (d, i) {
          return `#layerArc${index}_${i}`;
        })
        .text(d => {
          console.log("d===", d);
          return d;
        });
    }
  }



  render() {
    return <div id="chart" />;
  }



  //
  //
  //
  //   const node = this.node;
  //   const dataMax = max(this.props.data);
  //   const yScale = scaleLinear()
  //     .domain([0, dataMax])
  //     .range([0, this.props.size[1]]);
  //
  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .enter()
  //     .append('rect')
  //
  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .exit()
  //     .remove()
  //
  //   select(node)
  //     .selectAll('rect')
  //     .data(this.props.data)
  //     .style('fill', '#fe9922')
  //     .attr('x', (d, i) => i * 25)
  //     .attr('y', d => this.props.size[1] — yScale(d)
  // )
  // .
  //   attr('height', d => yScale(d))
  //     .attr('width', 25)
  // }
}

export default Chart;