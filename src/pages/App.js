import React from 'react';
import d3 from 'd3';
import { saveSvgAsPng } from 'save-svg-as-png';
import Header from '../components/header';
import Footer from '../components/footer';
import Chart from '../components/chart';
import Legend from '../components/legend';
import Button from '../components/button';
import Meta from '../components/meta';
import '../scss/main.scss';

const onResetClick = () => {
  d3.selectAll(".layerArc").style("fill", "#fff");
  d3.selectAll(".layerText").style("fill", "#6b6b6b");
};

const onDownloadClick = () => {
  saveSvgAsPng(document.getElementById('multiLayerPie'), 'employee-vote-result.png');
};

const App = () => {
  return (
    <div className="mw">
      <Meta />
      <Header/>
      <main className="mw-main">
        <Legend />
        <Chart />
        <div className="mw-main__buttons">
          <Button className="mw-btn__secondary" onClick={onResetClick}>Reset</Button>
          <Button className="mw-btn__primary"onClick={onDownloadClick}>Download</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
