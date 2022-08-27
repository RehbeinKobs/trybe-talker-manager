const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const generateRandomToken = require('./utils/generateRandomToken');
const checkEmailAndPassword = require('./middlewares/checkEmailAndPassword');
const validateEmailAndPassword = require('./middlewares/validateEmailAndPassword');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerData = await readTalkerData();
  const filteredData = talkerData.filter((t) => t.id === Number(id));
  return filteredData.length > 0
    ? res.status(200).json(filteredData[0])
    : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post(
  '/login',
  checkEmailAndPassword,
  validateEmailAndPassword,
  async (req, res) => res.status(200).json({ token: generateRandomToken() }),
);