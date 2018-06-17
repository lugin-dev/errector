import chalk from 'chalk';
import fancyLog from 'fancy-log';
import { version } from '../../package.json';


// Build mode info
const envLog = devmode => {

    const logDevmode = chalk.white.bgYellow;
    const logProdmode = chalk.white.bgCyan;

    let message, info;

    if (devmode === true || devmode == undefined) {
        message = `✌   Welcome to Erector v${version}`
        info = logDevmode(` ⇢  Build mode: development `)
    } else {
        message = `😎   Yeah! You did it!`
        info = logProdmode(` ⇢  Build mode: production `)
    }
    fancyLog(chalk.white(message));
    fancyLog(info)

}

export { envLog };