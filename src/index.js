const express = require('express');
const bodyParser = require('body-parser');
const readTalker = require('./utils/readTalker');
const generateRandomToken = require('./utils/generateRandomToken');
const checkEmailAndPassword = require('./middlewares/loginPost/checkEmailAndPassword');
const validateEmailAndPassword = require('./middlewares/loginPost/validateEmailAndPassword');
const {
  checkNameAndAge,
  validateNameAndAge,
  checkTalk,
  checkWatchedAndRate,
  validateWatchedAndRate,
} = require('./middlewares/talkerPost/validateTalkerPost');
const writeTalker = require('./utils/writeTalker');

let TOKEN = '';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== TOKEN) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
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

app.get('/talker', async (req, res) => res.status(200).json(await readTalker()));

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerData = await readTalker();
  const filteredData = talkerData.filter((t) => t.id === Number(id));
  return filteredData.length > 0
    ? res.status(200).json(filteredData[0])
    : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post(
  '/login',
  checkEmailAndPassword,
  validateEmailAndPassword,
  (req, res) => {
    const token = generateRandomToken();
    TOKEN = token;
    return res.status(200).json({ token });
  },
);

app.post(
  '/talker',
  validateToken,
  checkNameAndAge,
  checkTalk,
  checkWatchedAndRate,
  validateNameAndAge,
  validateWatchedAndRate,
  async (req, res) => {
    const talker = req.body;
    const id = await writeTalker(talker);
    return res.status(201).json({ id, ...talker });
  },
);
