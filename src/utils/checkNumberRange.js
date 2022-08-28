const checkNumberRange = (number, min, max) => {
    if (!Number(number).isNaN) {
        return number >= min && number <= max;
    }
    return false;
};

module.exports = checkNumberRange;