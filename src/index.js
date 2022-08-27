const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.join(__dirname, './talker.json');

const readTalkerData = async () => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => res.status(200).json(await readTalkerData()));
