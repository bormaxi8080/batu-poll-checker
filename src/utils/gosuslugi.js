const puppeteer = require("puppeteer");
const moment = require("moment");
const fs = require("fs");



async function checkPollGosuslugi(pollNumber, arrAnswers) {  

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
        userDataDir: "./profileData",
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'  // get Chrome browser on MacOS
    });
    const page = await browser.newPage();
    await page.setViewport({width:0, height:0});
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    ); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue

    for (let i = 0; i < arrAnswers.length; i++) {
        console.log(`Checking for https://pos.gosuslugi.ru/lkp/projects/${pollNumber}/09/${arrAnswers[i]}`);
        await page.goto(
            `https://pos.gosuslugi.ru/lkp/projects/${pollNumber}/09/${arrAnswers[i]}`,
            { defaultViewPort: null, waitUntil: "networkidle2" }
        );
        await fs.promises.mkdir(`./results/gosuslugi/${pollNumber}/${arrAnswers[i]}/`, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            }
        });
        await page.screenshot({
            path: `./results/gosuslugi/${pollNumber}/${arrAnswers[i]}/${pollNumber}_${arrAnswers[i]}_${moment().format("YYYY-MM-DD_HH-mm-ss")}.jpeg`
        });
    }
    await browser.close();
    return true;
}

module.exports = checkPollGosuslugi;