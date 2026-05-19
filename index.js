const express = require('express');
const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

const app = express();

const PORT = process.env.PORT || 3000;

console.log('ACCESS_ID:', process.env.ACCESS_ID);
console.log('ACCESS_SECRET:', process.env.ACCESS_SECRET ? 'EXISTS' : 'MISSING');
console.log('DEVICE_ID:', process.env.DEVICE_ID);

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: process.env.ACCESS_ID,
  secretKey: process.env.ACCESS_SECRET
});

const DEVICE_ID = process.env.DEVICE_ID;

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
