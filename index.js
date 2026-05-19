const express = require('express');
const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

const app = express();

const PORT = process.env.PORT || 3000;

// TUYA CONFIG
const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: process.env.ACCESS_ID,
  secretKey: process.env.ACCESS_SECRET,
});

const DEVICE_ID = process.env.DEVICE_ID;

// TEST
app.get('/', (req, res) => {
  res.send('Server running');
});

// LIGHT ON
app.get('/on', async (req, res) => {
  try {
    const response = await tuya.request({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${DEVICE_ID}/commands`,
      body: {
        commands: [
          {
            code: 'switch_1',
            value: true
          }
        ]
      }
    });

    console.log('ON RESPONSE:', response);

    res.send('Light ON');
  } catch (error) {
    console.error('ON ERROR:', error);
    res.status(500).send(error.message);
  }
});

// LIGHT OFF
app.get('/off', async (req, res) => {
  try {
    const response = await tuya.request({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${DEVICE_ID}/commands`,
      body: {
        commands: [
          {
            code: 'switch_1',
            value: false
          }
        ]
      }
    });

    console.log('OFF RESPONSE:', response);

    res.send('Light OFF');
  } catch (error) {
    console.error('OFF ERROR:', error);
    res.status(500).send(error.message);
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
