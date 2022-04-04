require('dotenv').config();

import * as fs from 'fs';
import { Novu } from '@novu/node';

(async () => {
    await start();
})();

async function start() {
    const tip = getRandomTip();
    const subscribers = getSubscribers();

    const novu = new Novu(process.env.NOVU_API_KEY);

    for (const subscriber of subscribers) {
        await novu.trigger('daily-tip-5JhmK1xlB', {
            $user_id: subscriber.username,
            username: subscriber.username,
            content: tip.content,
            authorName: tip.authors.toString(),
            $email: subscriber.email,
        });
    }

    console.log(`
        The daily tip that was selected: ${tip.content} 
        By: ${tip.authors.toString()}
        
        The notification was sent to ${subscribers.length} people.
    `);
}

function getSubscribers() {
    const subscriberFolders = __dirname + '/data/subscribers'
    const files = fs.readdirSync(subscriberFolders);

    const subscribers = [];
    for (const file of files) {
        const fileContent = fs.readFileSync(`${subscriberFolders}/${file}`, 'utf8');

        subscribers.push({
            username: file.replace('.json', ''),
            ...JSON.parse(fileContent)
        });
    }

    return subscribers;
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