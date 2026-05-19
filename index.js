const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server running');
});

app.get('/on', async (req, res) => {
  console.log('LIGHT ON');
  res.send('Light ON');
});

app.get('/off', async (req, res) => {
  console.log('LIGHT OFF');
  res.send('Light OFF');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
