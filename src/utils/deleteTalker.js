const fs = require('fs').promises;
const path = require('path');
const readTalker = require('./readTalker');

const talkerPath = path.join(__dirname, '../talker.json');

const deleteTalker = async (id) => {
    const talkers = await readTalker();
    const editedTalkers = talkers.filter((t) => t.id !== id);
    try {
        await fs.writeFile(talkerPath, JSON.stringify(editedTalkers));
    } catch (err) {
        console.error(`erro ao escrever o arquivo: ${err.message}`);
    }
    return id;
};

module.exports = deleteTalker;