const fs = require('fs').promises;
const path = require('path');
const readTalker = require('./readTalker');

const talkerPath = path.join(__dirname, '../talker.json');

const writeTalker = async (talker) => {
    const talkers = await readTalker();
    const id = talkers[talkers.length - 1].id + 1;
    talkers.push({ id, ...talker });
    try {
        await fs.writeFile(talkerPath, JSON.stringify(talkers));
    } catch (err) {
        console.error(`erro ao escrever o arquivo: ${err.message}`);
    }
    return id;
};

module.exports = writeTalker;