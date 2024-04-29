#! /usr/bin/env node 
import chalk from "chalk";
import inquirer from "inquirer";
// create a player class
class Player {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name; 
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}

// create an opponent class
class Opponent {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name; 
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}

(async () => {
    // get player name
    let playerResponse = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is your name?"
    });
    const playerName = playerResponse.name;

    // get opponent selection
    let opponentResponse = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select your opponent?",
        choices: ['Skeleton', 'Zombie', 'Assassin']
    });
    const opponentName = opponentResponse.select;

    // create player and opponent objects
    let p1 = new Player(playerName);
    let o1 = new Opponent(opponentName);

    do {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "What do you want to do?",
            choices: ['Attack', 'Drink Portion', 'Run For Your Life..']
        });

        // handle player's choice
        if (ask.option === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
                if (o1.fuel <= 0) {
                    console.log(chalk.bold.italic("You Win"));
                    process.exit();
                }
            } else {
                o1.fuelDecrease();
                console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
                if (o1.fuel <= 0) {
                    console.log(chalk.bold.italic("You Win"));
                    process.exit();
                }
            }
        } else if (ask.option === "Drink Portion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Portion. Your Fuel is ${p1.fuel}`));
            console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
        } else if (ask.option === "Run For Your Life..") {
            console.log(chalk.bold.italic("You Lose, Better Luck Next Time"));
            process.exit();
        }
    } while (true);
})();
