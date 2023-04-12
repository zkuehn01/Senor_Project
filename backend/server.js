const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const app = express();

const PORT = 5000;

const DATA_FILE_PATH = __dirname + '/waveform.xml';
const DATA_XML_FILE_PATH = __dirname + '/data.xml';
let data = [];
let dataXml = [];

app.use(express.json());

// Serve combined data from waveform.xml and data.xml
app.get('/dataCombined', async (req, res) => {
  try {
    const resultWaveform = await parser.parseStringPromise(data);
    const resultDataXml = await parser.parseStringPromise(dataXml);

    const getPoints = (result) => {
      const dataSection = result['result']['dataSection'][0];
      const resElements = dataSection['res'];
      const lastRes = resElements[resElements.length - 1];
      const waveformContainer = lastRes['waveForm'][0]['waveformContainer'][0];
      const dataPoints = waveformContainer['rawWaveForm'][0]['dp'];
      return dataPoints.map(dp => ({
        x: dp['$']['x'],
        y: dp['$']['y']
      }));
    };

    const waveformPoints = getPoints(resultWaveform);
    const dataXmlPoints = getPoints(resultDataXml);

    res.json({ waveform: waveformPoints, dataXml: dataXmlPoints });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading data from waveform.xml and data.xml');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/dataCombined`);

  // Load existing waveform data
  fs.readFile(DATA_FILE_PATH, (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    }
    data = fileData;
    console.log('Existing waveform data loaded successfully');
  });

  // Load existing data.xml
  fs.readFile(DATA_XML_FILE_PATH, (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    }
    dataXml = fileData;
    console.log('Existing data.xml loaded successfully');
  });
});
