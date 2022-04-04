import * as fs from 'fs';

(async () => {
    await start();
})();

async function start() {
    const tip = getRandomTip();

    console.log(tip);
}

function getRandomTip() {
    const files = fs.readdirSync(__dirname + '/data/tips');
    const randomTipPosition = getRandomNumber(0, files.length - 1);
    const selectedTip = files[randomTipPosition];
    const fileContent = fs.readFileSync(__dirname + '/data/tips/' + selectedTip, 'utf8');

    const tip = JSON.parse(fileContent);

    return tip;
}

function getRandomNumber(min: number, max: number) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
}