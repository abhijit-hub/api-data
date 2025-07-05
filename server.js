const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/api/indiamart', (req, res) => {
<<<<<<< HEAD
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
=======
  const data = [];

  for (let i = 1; i <= 20; i++) {
    data.push({
      QUERY_ID: `INQ${100000 + i}`,
      SENDER_NAME: `Buyer ${i}`,
      SENDER_MOBILE: `9876543${100 + i}`,
      SENDER_EMAIL: `buyer${i}@example.com`,
      PRODUCT_NAME: `Product ${i}`,
      MESSAGE: `Looking for Product ${i}. Please share details.`,
      ENQUIRY_DATE: `2025-06-${10 + i} ${10 + i}:00:00`,
      CITY: `City ${i}`,
      STATE: `State ${i}`,
      PINCODE: `4000${i}`,
      COMPANY_NAME: `Company ${i}`,
      REQUIREMENT_TYPE: i % 2 === 0 ? "BuyLead" : "Direct",
      PREFERRED_CALL_TIME: "Anytime",
      QUANTITY: `${i * 10}`,
      UNIT: "Piece",
      RESPONSE_TYPE: "New",
      SUB_CATEGORY: `SubCategory ${i}`,
      CATEGORY: `Category ${i}`,
      TIMESTAMP: new Date().toISOString()
    });
  }

  res.json({ RESPONSE: { STATUS: "SUCCESS", DATA: data } });
});

app.listen(port, () => {
  console.log(`✅ Dummy API running on http://localhost:${port}/api/indiamart`);
>>>>>>> 633abaae2d4897d673a417baa4331271c54d8d18
});
