const puppeteer = require("puppeteer");
const moment = require("moment");
const fs = require("fs");

async function checkPollNovosibirsk(pollNumber) {
    await fs.promises.mkdir(`./results/novosibirsk/${pollNumber}`, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        }
    });
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
    console.log(`Checking for http://poll.novo-sibirsk.ru/result.aspx?quiz=${pollNumber}`);
    await page.goto(
        `http://poll.novo-sibirsk.ru/result.aspx?quiz=${pollNumber}`,
        { defaultViewPort: null, waitUntil: "networkidle2" }
    );
    await page.screenshot({
        path: `./results/novosibirsk/${pollNumber}/${pollNumber}_${moment().format("YYYY-MM-DD_HH-mm-ss")}.jpeg`
    });
    await browser.close();
    return true;
}

module.exports = checkPollNovosibirsk;