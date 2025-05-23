// TicTacToeComponent: Implements a simple Tic-Tac-Toe game logic and UI binding
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * @component TicTacToeComponent
 * @description Angular component for a Tic-Tac-Toe game. Handles game state, player turns, win/draw logic, and UI interaction.
 */
@Component({
  selector: 'app-tic-tac-toe', // Component selector for use in templates
  imports: [CommonModule], // Import Angular common module
  templateUrl: './tic-tac-toe.component.html', // HTML template for the game board
  styleUrl: './tic-tac-toe.component.scss', // SCSS styles for the component
})
export class TicTacToeComponent {
  /**
   * @property {string[]} board - Represents the 3x3 game board as a flat array
   * @property {string} currentPlayer - Tracks the current player ('X' or 'O')
   * @property {string | null} winner - Stores the winner ('X', 'O', or null if no winner yet)
   * @property {boolean} isDraw - True if the game ended in a draw
   */
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;

  /**
   * Checks if a cell is already occupied.
   * @param index Index of the cell to check
   * @returns True if the cell is not empty
   */
  private isCellOccupied(index: number): boolean {
    return this.board[index] !== '';
  }

  /**
   * Checks if the game is over (win or draw).
   * @returns True if the game has ended
   */
  private isGameOver(): boolean {
    return this.winner !== null || this.isDraw;
  }

  /**
   * Checks if a move is invalid (cell occupied or game over).
   * @param index Index of the cell to check
   * @returns True if the move is not allowed
   */
  private isMoveInvalid(index: number): boolean {
    return this.isCellOccupied(index) || this.isGameOver();
  }

  /**
   * Switches the current player from 'X' to 'O' or vice versa.
   */
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  /**
   * Checks if the current player has won the game.
   * @returns True if there is a winner
   */
  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left
      [2, 4, 6], // Diagonal from top-right
    ];

    // Check if any winning combination is satisfied
    return winningCombinations.some(
      ([a, b, c]) =>
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
    );
  }

  /**
   * Checks if the board is full (no empty cells).
   * @returns True if all cells are filled
   */
  private isBoardFull(): boolean {
    return this.board.every((cell) => cell !== '');
  }

  /**
   * Updates the game state after a move: sets winner, draw, or switches player.
   * @param index Index of the last move
   */
  private updateGameState(index: number): void {
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else if (this.isBoardFull()) {
      this.isDraw = true;
    } else {
      this.switchPlayer();
    }
  }

  /**
   * Handles a player's move: validates, updates board, and game state.
   * @param index Index of the cell to play
   */
  makeMove(index: number): void {
    if (this.isMoveInvalid(index)) return;
    this.board[index] = this.currentPlayer;
    this.updateGameState(index);
  }

  /**
   * Resets the game to the initial state.
   */
  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }
}
