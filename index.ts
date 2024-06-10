#!/usr/bin/env node
///////////////////////////////////////////////
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
import figlet from "figlet";
////////////////////////////////////////////////

console.log(chalk.yellowBright(figlet.textSync("Countdown Timer"))); 

const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: chalk.green("Please enter the amount of seconds"),
    validate: (Input) => {
        if (isNaN(Input)) {
            return chalk.green("Please enter a valid number");
        } else if (Input > 60) {
            return chalk.green("Seconds must be less than or equal to 60");
        } else {
            return true;
        }
    }
});

let Input = response.userInput;

function startTime(value: number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + (value+2));
    const intervalTime = new Date(initialTime);
    console.clear();

    let warningDisplayed = false;
    const warningTime = 10; 

    console.log(chalk.yellowBright("Timer starting..."));

    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if (!warningDisplayed && timeDiff <= warningTime) {
            console.log(chalk.redBright("⚠️ WARNING: Danger zone! Bomb is about to explode!"));
            warningDisplayed = true;
        }

        if (timeDiff <= 0) {
            clearInterval(intervalId);
            console.log(chalk.redBright("\n💥 BOOM! The bomb has exploded!"));
            process.exit();
        }

        const min = Math.floor(timeDiff / 60);
        const sec = Math.floor(timeDiff % 60);
        process.stdout.write(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}\r`);

    }, 1000);
}

startTime(Input);
