import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Add the onDataFetched prop
const Graph = ({ onDataFetched }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState({ waveform: [], dataXml: [] });

  useEffect(() => {
    fetch('/dataCombined')
      .then(res => res.json())
      .then(res => {
        setData(res);
        // Call the onDataFetched prop with the fetched data
        onDataFetched(res);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    drawGraph(data.waveform, data.dataXml);
  }, [data]);

  const drawGraph = (waveformData, dataXmlData) => {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 }; // Increase bottom and left margin to make space for axis labels
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
  
    svg.selectAll('*').remove();
  
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    const xWaveform = d3.scaleLinear()
      .domain(d3.extent(waveformData, d => parseFloat(d.x)))
      .range([0, width]);
  
    const yWaveform = d3.scaleLinear()
      .domain(d3.extent(waveformData, d => parseFloat(d.y)))
      .range([height, 0]);
  
    const xDataXml = d3.scaleLinear()
      .domain(d3.extent(dataXmlData, d => parseFloat(d.x)))
      .range([0, width]);
  
    const yDataXml = d3.scaleLinear()
      .domain(d3.extent(dataXmlData, d => parseFloat(d.y)))
      .range([height, 0]);
  
    const lineWaveform = d3.line()
      .x(d => xWaveform(parseFloat(d.x)))
      .y(d => yWaveform(parseFloat(d.y)));
  
    const lineDataXml = d3.line()
      .x(d => xDataXml(parseFloat(d.x)))
      .y(d => yDataXml(parseFloat(d.y)));
  
    const createPath = (data, line, color) => {
      g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke', color)
        .style('stroke-width', '2px')
        .style('fill', 'none');
    };
  
    createPath(waveformData, lineWaveform, 'steelblue');
    createPath(dataXmlData, lineDataXml, 'red');
  
    const xAxis = g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xDataXml));
  
    const yAxis = g.append('g')
      .call(d3.axisLeft(yDataXml));
  
    // Add x-axis label
    g.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom / 2)
      .text('X-Axis Label');
  
    // Add y-axis label
    g.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left / 2}, ${height / 2}) rotate(-90)`)
      .text('Y-Axis Label');
  
    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'transparent');
      
      const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(xDataXml);
        const newY = event.transform.rescaleY(yDataXml);
  
        const updatedLineWaveform = lineWaveform
          .x(d => newX(parseFloat(d.x)))
          .y(d => newY(parseFloat(d.y)));
  
        const updatedLineDataXml = lineDataXml
          .x(d => newX(parseFloat(d.x)))
          .y(d => newY(parseFloat(d.y)));
  
        g.selectAll('.line')
          .filter((_, i) => i === 0)
          .attr('d', updatedLineWaveform);
  
        g.selectAll('.line')
          .filter((_, i) => i === 1)
          .attr('d', updatedLineDataXml);
  
        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));
      });
  
    svg.call(zoom);
  };
  
return (
  <svg ref={svgRef}>
    <g className="axis-labels"></g>
  </svg>
);
};

export default Graph;