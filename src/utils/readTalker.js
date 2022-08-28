const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.join(__dirname, '../talker.json');

const readTalker = async () => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

module.exports = readTalker;