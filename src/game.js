import { LINES, COLUMNS } from './constants.js';

export default class Game {
  score = 0;

  lines = 0;

  level = 0;

  playfield = new Array(LINES).fill(new Array(COLUMNS).fill(0));

  activePiece = {
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    x: 0,
    y: 0,
  };

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }

  hasCollision() {
    const {
      playfield,
      activePiece: { x: pieceX, y: pieceY, blocks },
    } = this;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (playfield[pieceY + y] === undefined ||
            playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { blocks, x: pieceX, y: pieceY } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[y + pieceY][x + pieceX] = blocks[y][x];
        }
      }
    }
  }
}
