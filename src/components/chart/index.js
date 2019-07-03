import React from 'react';
import d3 from 'd3';

export const colors = ["#7FD322", "#FFD805", "#DC3545"];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.createPieChart();
  }

  componentDidUpdate() {
    this.createPieChart();
  }

  createPieChart() {
    const layerData = [
      ["Freude an der Arbeit", "Inhalt der Arbeit, Sinn", "Arbeitstätig-keiten"],
      ["Herausforderungsgrad", "Arbeitsvielfalt, Abwechslung", "Entscheidungsspielraum"],
      ["Verhältnis zu Vorgesetzten", "Verhältnis zu Kollegen/innen und Kunden/innen", "Firmenkultur, Leitbild, Werte", "Arbeitsklima insgesamt"],
      ["Lohn- und Sozialleistungen", "Arbeitszeit, Arbeitsflexibilität", "Arbeitsplatz an sich/ Ausstattung", "Tools/  Technologien, Interne Prozess", "Arbeitsweg", "Innovationsgrad des\n Unternehmens"],
      ["Weiterbildungsangebot der Firma", "Persönliche Personalentwicklung", "Firmenorganisation, -struktur", "Karrieremöglichkeiten in der Firma"]
    ];
    

    let y;
    const rgbToHex = x =>
      "#" +
      x
        .match(/\d+/g)
        .map((y = z => (+z < 16 ? "0" : "") + (+z > 255 ? 255 : +z).toString(16)))
        .join("");

    const containerHeight = document.querySelector('.chart').clientHeight;
    const margin = {left: 24, top: 24, right: 24, bottom: 24},
      width = containerHeight - margin.left - margin.right,
      height = containerHeight - margin.top - margin.bottom;



    const layerSize = height / layerData.length / 2;
    const textPadding = layerSize / 2 + 4; // 4 = border width * 2

    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "multiLayerPie")
      .style("font-family","\"Roboto\", -apple-system, BlinkMacSystemFont, \"Segoe UI\"")
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
            nextColorIndex >= colors.length ? colors[0] : colors[nextColorIndex];  //if you need white as well, use '>' instead of '>='
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
        .text(d => d);
    }
  }


  render() {
    return <div className="chart" />;
  }

}

export default Chart;