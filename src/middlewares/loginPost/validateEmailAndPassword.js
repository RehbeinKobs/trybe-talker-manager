const validateEmailRegex = require('../../utils/validateEmailRegex');

const validateEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    if (!validateEmailRegex(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = validateEmailAndPassword;
