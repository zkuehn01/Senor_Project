import xml2js from 'xml2js';
import { useEffect, useState } from 'react';

import waveform from './waveform.xml';

const Parse = ({ onPointsParsed }) => {
  const [waveformPoints, setWaveformPoints] = useState([]);

  useEffect(() => {
    const parseXml = xml => {
      const parser = new xml2js.Parser();
      parser.parseString(xml, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
        } else {
          const points = getPoints(result);
          setWaveformPoints(points);
        }
      });
    };

    // Load the waveform.xml file using fetch API
    fetch(waveform)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(xml => {
        parseXml(xml);
      })
      .catch(error => {
        console.error('Error fetching waveform XML:', error);
      });
  }, []);

  const getPoints = result => {
    const dataSection = result['result']['dataSection'][0];
    const resElements = dataSection['res'];
    const lastRes = resElements[resElements.length - 1];
    const waveformContainer = lastRes['waveForm'][0]['waveformContainer'][0];
    const dataPoints = waveformContainer['rawWaveForm'][0]['dp'];
    return dataPoints.map(dp => ({
      x: dp['$']['x'],
      y: dp['$']['y'],
      source: 'waveform'
    }));
  };

  useEffect(() => {
    onPointsParsed(waveformPoints);
  }, [waveformPoints, onPointsParsed]);

  return null;
};

export default Parse;
