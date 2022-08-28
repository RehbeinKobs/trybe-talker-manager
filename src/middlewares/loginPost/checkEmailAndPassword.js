const checkEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) return next();
    return email
        ? res.status(400).json({ message: 'O campo "password" é obrigatório' })
        : res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

module.exports = checkEmailAndPassword;
