/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    const playerO = 'O';
    const emptyPlay = ' ';
    if (this._lastSymbol === emptyPlay && player === playerO) {
      throw new Error('Invalid first player');
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    const emptyPlay = ' ';
    if (this._board.TileAt(x, y).Symbol !== emptyPlay) {
      throw new Error('Invalid position');
    }
  }

  public Winner(): string {
    const winningLines = [
      // Rows
      [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
      [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
      // Columns
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
      // Diagonals
      [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
      [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
    ];

    for (const line of winningLines) {
      if (this.isLineFull(line) && this.isLineFullWithSameSymbol(line)) {
        return this._board.TileAt(line[0].x, line[0].y).Symbol;
      }
    }

    return ' ';
  }

  private isLineFull(line: { x: number; y: number }[]): boolean {
    return line.every(({ x, y }) => this._board.TileAt(x, y).Symbol !== ' ');
  }

  private isLineFullWithSameSymbol(line: { x: number; y: number }[]): boolean {
    const firstSymbol = this._board.TileAt(line[0].x, line[0].y).Symbol;
    return line.every(({ x, y }) => this._board.TileAt(x, y).Symbol === firstSymbol);
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this._plays.push({ X: i, Y: j, Symbol: ' ' });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    const tile = this.TileAt(x, y);
    tile.Symbol = symbol;
  }
}
