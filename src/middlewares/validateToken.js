// const fs = require('fs').promises;
// const path = require('path');

// const tokenPath = path.join(__dirname, '../token.json');

// const readTokenData = async () => {
//   try {
//     const data = await fs.readFile(tokenPath, 'utf-8');
//     return JSON.parse(data).token;
//   } catch (error) {
//     return [];
//   }
// };

// const validateToken = async (req, res, next) => {
//     const { authorization } = req.headers;
//     const token = await readTokenData();
//     if (token.length > 0) {
//         return token === authorization
//         ? next() : res.status(401).json({ message: 'Token inválido' });
//     }
//     return res.status(401).json({ message: 'Token não encontrado' });
// };

// module.exports = validateToken;