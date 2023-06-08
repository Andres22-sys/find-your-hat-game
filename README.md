# Find Your Hat

Find Your Hat is a command-line game where you need to navigate a field to find your lost hat. This README file provides instructions on how to clone the project from GitHub and run it in the terminal.

## Prerequisites

To run this game, you need to have Node.js installed on your machine. You can download and install Node.js from the official website: [Node.js](https://nodejs.org)

## Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:
git clone https://github.com/your-username/find-your-hat.git

Replace `your-username` with your GitHub username.

4. Once the cloning process is complete, navigate into the project directory:
cd find-your-hat

## Install Dependencies

1. In the project directory, run the following command to install the project dependencies:
npm install
npm install terminal-kit

This will install the necessary dependencies defined in the `package.json` file.

## Run the Game

1. After the dependencies are installed, you can start the game by running the following command:
`node main.js`

2. The game will start, and you will see the initial field printed in the terminal. Follow the prompts to input your moves (U/D/L/R for Up/Down/Left/Right).
3. Navigate through the field, avoiding the holes (O) and try to find your hat (^).
4. The game will provide feedback on each move, and it will end when you either find the hat or fall into a hole.
5. After the game ends, you can run it again by running the same `node main.js` command.

Enjoy playing Find Your Hat!

## Customization

If you want to customize the game settings, such as the field size or hole percentage, you can modify the values in the `main.js` file. Look for the following lines of code:

```javascript
const height = 10;
const width = 10;
const percentage = 20;
