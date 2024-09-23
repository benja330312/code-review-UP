/* eslint-disable */

// Constantes pour les symboles et la taille de la grille
const EMPTY_SYMBOL = ' ';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const BOARD_SIZE = 3;

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    // Vérification du premier coup
    if (this._lastSymbol === EMPTY_SYMBOL) {
      if (symbol === PLAYER_O) {
        throw new Error('Invalid first player');
      }
    }
    // Vérification si c'est le tour du même joueur
    else if (symbol === this._lastSymbol) {
      throw new Error('Invalid next player');
    }
    // Vérification si la position est déjà occupée
    else if (this._board.TileAt(x, y).Symbol !== EMPTY_SYMBOL) {
      throw new Error('Invalid position');
    }

    // Mise à jour de l'état du jeu
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    // Vérification des lignes gagnantes
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowFull(row)) {
        return this._board.TileAt(row, 0).Symbol;
      }
    }
    return EMPTY_SYMBOL;
  }

  private isRowFull(row: number): boolean {
    return (
      this._board.TileAt(row, 0).Symbol !== EMPTY_SYMBOL &&
      this._board.TileAt(row, 0).Symbol === this._board.TileAt(row, 1).Symbol &&
      this._board.TileAt(row, 1).Symbol === this._board.TileAt(row, 2).Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        this._tiles.push({ X: i, Y: j, Symbol: EMPTY_SYMBOL });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._tiles.find((tile) => tile.X === x && tile.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    const tile = this.TileAt(x, y);
    tile.Symbol = symbol;
  }
}
