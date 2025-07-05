const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/api/indiamart', (req, res) => {
  const filePath = path.join(__dirname, 'indiaMART.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ RESPONSE: { STATUS: 'ERROR', MESSAGE: 'Failed to read data.' } });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ RESPONSE: { STATUS: 'ERROR', MESSAGE: 'Invalid JSON format.' } });
    }
  });
});

app.listen(port, () => {
  console.log(`✅ API running on http://localhost:${port}/api/indiamart`);
});
