const http = require('http');
const https = require('https');
const crypto = require('crypto');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const DEVICE_ID = process.env.DEVICE_ID;
const BASE_URL = 'openapi.tuyaeu.com';

function hmac(str, secret) {
  return crypto.createHmac('sha256', secret)
    .update(str).digest('hex').toUpperCase();
}

function apiRequest(path, method, token, body) {
  return new Promise((resolve, reject) => {
    const t = Date.now().toString();
    const signStr = token
      ? CLIENT_ID + token + t
      : CLIENT_ID + t;
    const sign = hmac(signStr, CLIENT_SECRET);
    const bodyStr = body ? JSON.stringify(body) : '';
    const headers = {
      'client_id': CLIENT_ID,
      'sign': sign,
      't': t,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json'
    };
    if (token) headers['access_token'] = token;
    const options = {
      hostname: BASE_URL,
      path: path,
      method: method,
      headers: headers
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function getToken() {
  const res = await apiRequest('/v1.0/token?grant_type=1', 'GET', null, null);
  return res.result.access_token;
}

async function controlDevice(value) {
  const token = await getToken();
  return await apiRequest(
    /v1.0/devices/${DEVICE_ID}/commands,
    'POST',
    token,
    { commands: [{ code: 'switch_1', value: value }] }
  );
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/on') {
    await controlDevice(true);
    res.end('OK');
  } else if (req.url === '/off') {
    await controlDevice(false);
    res.end('OK');
  } else {
    res.end('Tuya Proxy Running');
  }
});

server.listen(process.env.PORT || 3000);
