const DDMMYYYY = (array) => array[0].length === 2 && array[1].length === 2 && array[2].length === 4;
const allNum = (array) => array.every((n) => !Number(n).isNaN);

const checkDateFormat = (date) => {
    const splitedDate = date.toString().split('/');
    if (splitedDate.length === 3) {
        return DDMMYYYY(splitedDate) && allNum(splitedDate);
    }
    return false;
};

module.exports = checkDateFormat;
