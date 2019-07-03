import React from 'react';
import {Helmet} from 'react-helmet';
import d3 from 'd3';
import Header from '../components/header';
import Footer from '../components/footer';
import Chart from '../components/chart';
import Legend from '../components/legend';
import Button from '../components/button';
import '../scss/main.scss';

const onDownloadClick = () => {
  d3.selectAll(".layerArc").style("fill", "#fff");
  d3.selectAll(".layerText").style("fill", "#6b6b6b");
};

const App = () => {
  return (
    <div className="mw">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Magic Wheel</title>
        <link rel="apple-touch-icon" sizes="180x180" href="../public/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="../public/favicon/site.webmanifest"/>
        <link rel="mask-icon" href="../public/favicon/safari-pinned-tab.svg" color="#ff4700"/>
        <link rel="shortcut icon" href="../public/favicon/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-config" content="./assets/favicon/browserconfig.xml"/>
        <meta name="theme-color" content="#ff4700"/>
      </Helmet>
      <Header/>
      <main className="mw-main">
        <Legend />
        <Chart />
        <div className="mw-main__buttons">
          <Button className="mw-btn__secondary" onClick={onDownloadClick}>Reset</Button>
          <Button className="mw-btn__primary">Download</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
