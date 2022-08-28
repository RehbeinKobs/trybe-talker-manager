const checkDateFormat = require('../../utils/checkDateFormat');
const checkNumberRange = require('../../utils/checkNumberRange');

const checkNameAndAge = (req, res, next) => {
    const { name, age } = req.body;
    if (name && age) return next();
    return name
    ? res.status(400).json({ message: 'O campo "age" é obrigatório' })
    : res.status(400).json({ message: 'O campo "name" é obrigatório' });
};

const validateNameAndAge = (req, res, next) => {
    const { name, age } = req.body;
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (age < 18) {
        return res.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const checkTalk = (req, res, next) => {
    const { talk } = req.body;
    if (talk) return next();
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const checkWatchedAndRate = (req, res, next) => {
    const { watchedAt, rate } = req.body.talk;
    if (watchedAt && rate) return next();
    return watchedAt
    ? res.status(400).json({ message: 'O campo "rate" é obrigatório' })
    : res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
};

const validateWatchedAndRate = (req, res, next) => {
    const { watchedAt, rate } = req.body.talk;
    if (!checkDateFormat(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!checkNumberRange(rate, 1, 5)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
};

module.exports = {
    checkNameAndAge,
    validateNameAndAge,
    checkTalk,
    checkWatchedAndRate,
    validateWatchedAndRate,
};
