import React from 'react';
import d3 from 'd3';
import i18next from 'i18next';
import { saveSvgAsPng } from 'save-svg-as-png';
import Header from '../components/header';
import Footer from '../components/footer';
import Chart from '../components/chart';
import Legend from '../components/legend';
import Button from '../components/button';
import Meta from '../components/meta';


const onResetClick = () => {
  d3.selectAll(".chart__arc").style("fill", "#fff");
  d3.selectAll(".chart__text").style("fill", "#6b6b6b");
};

const onDownloadClick = () => {
  saveSvgAsPng(document.getElementById('multiLayerPie'), 'employee-vote-result.png');
};

const Main = () => {
  return (
    <div className="mw">
      <Meta />
      <Header/>
      <main className="mw-main">
        <Legend />
        <Chart data={i18next.t('chartdata', {returnObjects: true})} />
        <div className="mw-main__buttons">
          <Button className="mw-btn mw-btn__secondary" onClick={onResetClick}>{i18next.t('reset')}</Button>
          <Button className="mw-btn mw-btn__primary"onClick={onDownloadClick}>{i18next.t('download')}</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;