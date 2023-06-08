const prompt = require("prompt-sync")();
const term = require("terminal-kit").terminal;

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.currentPosition = this.findStartPosition();
    this.isGameOver = false;
  }

  static generateField(height, width, percentage) {
    const field = [];
    const totalCells = height * width;
    const numHoles = Math.floor((percentage / 100) * totalCells);

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(fieldCharacter);
      }
      field.push(row);
    }

    const randomStartRow = Math.floor(Math.random() * height);
    const randomStartCol = Math.floor(Math.random() * width);
    field[randomStartRow][randomStartCol] = pathCharacter; // Set player's initial position

    let holesPlaced = 0;
    while (holesPlaced < numHoles) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);

      if (field[randomRow][randomCol] === fieldCharacter) {
        field[randomRow][randomCol] = hole;
        holesPlaced++;
      }
    }

    const randomHatRow = Math.floor(Math.random() * height);
    const randomHatCol = Math.floor(Math.random() * width);
    field[randomHatRow][randomHatCol] = hat; // Place the hat

    return field;
  }

  findStartPosition() {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        if (this.field[i][j] === pathCharacter) {
          return [i, j];
        }
      }
    }
  }

  print() {
    for (let row of this.field) {
      for (let cell of row) {
        if (cell === hat) {
          term.colorRgb(210, 105, 30)(hat);
        } else if (cell === pathCharacter) {
          term.colorRgb(144, 238, 144)(pathCharacter);
        } else if (cell === hole) {
          term.colorRgb(255, 255, 255)(hole);
        } else {
          term.colorRgb(192, 192, 192)(fieldCharacter);
        }
        term(" "); // Add a space after each character
        term.defaultColor(); // Reset the color back to default
      }
      term("\n");
    }
  }

  playGame() {
    while (!this.isGameOver) {
      this.print();
      const direction = prompt("Which way? (U/D/L/R) ").toUpperCase();
      this.move(direction);
      this.checkStatus();
    }
  }

  move(direction) {
    const [x, y] = this.currentPosition;
    switch (direction) {
      case "U":
        this.currentPosition = [x - 1, y];
        break;
      case "D":
        this.currentPosition = [x + 1, y];
        break;
      case "L":
        this.currentPosition = [x, y - 1];
        break;
      case "R":
        this.currentPosition = [x, y + 1];
        break;
      default:
        console.log("Invalid direction. Please choose from U, D, L, or R.");
        break;
    }
    this.updateField();
  }

  updateField() {
    const [x, y] = this.currentPosition;
    if (
      x < 0 ||
      x >= this.field.length ||
      y < 0 ||
      y >= this.field[0].length ||
      this.field[x][y] === hole
    ) {
      this.isGameOver = true;
      console.log("Game Over! You fell into a hole.");
    } else if (this.field[x][y] === hat) {
      this.isGameOver = true;
      console.log("Congratulations! You found your hat.");
    } else {
      this.field[x][y] = pathCharacter;
    }
  }

  checkStatus() {
    if (!this.isGameOver) {
      const numHoles = this.field.flat().filter((cell) => cell === hole).length;
      console.log(`Holes remaining: ${numHoles}`);
    }
  }
}

const height = 10;
const width = 10;
const percentage = 20;

const field = Field.generateField(height, width, percentage);
const game = new Field(field);
game.playGame();
