const chalk = require("chalk");
const log = console.log;

const checkPollNovosibirsk = require("./utils/novosibirsk");
const checkPollGosuslugi = require("./utils/gosuslugi");

(async () => {
    if (process.argv.length < 9) {
        log(chalk.red.bold("No poll number(s) has been passed"));
        log(chalk.blue("Example: npm run check 144 942 2297 2299 2300 2301 2302"));
        process.exit(0);
    }

    const pollNumberNovosibirsk = process.argv[2];

    const pollNumberGosuslugi = process.argv[3];
    const arrAnswersGosuslugi = [process.argv[4],
        process.argv[5],
        process.argv[6],
        process.argv[7],
        process.argv[8]
    ];

    async function check() {
        log(chalk.blue(`Checking for poll, Novo-Sibirsk.ru: ${pollNumberNovosibirsk}`));
        await checkPollNovosibirsk(pollNumberNovosibirsk);

        log(chalk.blue(`Checking for poll, Gosuslugi.ru: ${pollNumberGosuslugi}`));
        await checkPollGosuslugi(pollNumberGosuslugi, arrAnswersGosuslugi);
        return true;
    }

    await check();

    let now = new Date();
    log(chalk.red(`Last check: ${now}`))

    process.exit(0);
})();
