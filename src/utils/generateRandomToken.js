const generateRandomToken = () => {
    const TOKENSIZE = 16;
    const alfabeto = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < TOKENSIZE; i += 1) {
        token += alfabeto[Math.floor(Math.random() * (alfabeto.length))];
    } 
    return token;
};

module.exports = generateRandomToken;