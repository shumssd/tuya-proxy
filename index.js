const express = require('express');
const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

const app = express();

const PORT = process.env.PORT || 3000;

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: process.env.ACCESS_ID,
  secretKey: process.env.ACCESS_SECRET,
});

const DEVICE_ID = process.env.DEVICE_ID;

app.get('/', (req, res) => {
  res.send('Server running');
});

app.get('/on', async (req, res) => {
  try {
    await tuya.request({
      method: 'POST',
      path: /v1.0/iot-03/devices/${DEVICE_ID}/commands,
      body: {
        commands: [
          {
            code: 'switch_1',
            value: true
          }
        ]
      }
    });

    res.send('Light ON');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

app.get('/off', async (req, res) => {
  try {
    await tuya.request({
      method: 'POST',
      path: /v1.0/iot-03/devices/${DEVICE_ID}/commands,
      body: {
        commands: [
          {
            code: 'switch_1',
            value: false
          }
        ]
      }
    });

    res.send('Light OFF');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(Server started on port ${PORT});
});
