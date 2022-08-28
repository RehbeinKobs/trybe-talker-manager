const fs = require('fs').promises;
const path = require('path');
const readTalker = require('./readTalker');

const talkerPath = path.join(__dirname, '../talker.json');

const editTalker = async (id, talker) => {
    const talkers = await readTalker();
    const editedTalkers = talkers.map((t) => {
        if (t.id === id) {
            return { id, ...talker };
        }
        return t;
    });
    try {
        await fs.writeFile(talkerPath, JSON.stringify(editedTalkers));
    } catch (err) {
        console.error(`erro ao escrever o arquivo: ${err.message}`);
    }
};

module.exports = editTalker;
