import { Component, OnInit } from '@angular/core';

interface Cell {
  isCircle: boolean | null 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  board:Array<Array<Cell>> = [];
  htmlBoard: Array<Cell> = [];
  circleIsNextMove: boolean = false;
  gameOver: boolean = false;
  xWinningMessage: string = 'X Wins!';
  circleWinningMessage: string = 'Circle Wins!';
  drawWinningMessage: string = 'Draw!';
  winningMessage: string = '';

  ngOnInit(): void {
      this.initializeBoard();
  }

  initializeBoard() {
    this.board = [];
    this.htmlBoard = [];
    for(let i = 0; i < 3; i++){
      const row: Array<Cell> = [];  
      for (let j = 0; j < 3; j++){
        const cell: Cell = { isCircle: null };
        row.push(cell);
        this.htmlBoard.push(cell);
      }
      this.board.push(row); 
    }
  }

  onCellClick(cell:Cell, i: number) {
    if (cell.isCircle !== null)
      return
    
    this.markCell(cell);
    if (this.checkForWin(cell, i)){
      this.gameOver = true;
      this.winningMessage = cell.isCircle ? this.circleWinningMessage : this.xWinningMessage;
    }else if (this.checkForDraw()){
      this.gameOver = true;
      this.winningMessage = this.drawWinningMessage;
    }
  }
  
  
  markCell(cell: Cell) {
    cell.isCircle = this.circleIsNextMove ? true : false;
    this.circleIsNextMove = !this.circleIsNextMove;
  }

  checkForWin(cell:Cell, i: number): boolean {
    let win: boolean = false;
    
    win = this.checkRowForWin(i, cell);
    if (win)
      return win
    
    win = this.checkColForWin(i, cell);
    if (win)
      return win

    return (this.checkRightDiagonal(cell) || this.checkLeftDiagonal(cell))
  }

  checkRowForWin(i: number, cell: Cell): boolean {
    let row: number;
    if (i in {0: true, 1: true, 2: true})
      row = 0
    else if (i in {3: true, 4: true, 5: true})
      row = 1
    else
      row = 2

    return (
      this.board[row][0].isCircle === cell.isCircle &&
      this.board[row][1].isCircle === cell.isCircle &&
      this.board[row][2].isCircle === cell.isCircle
      )
  }

  checkColForWin(i: number, cell: Cell): boolean {
    let col: number
    if (i in {0: true, 3: true, 6: true})
      col = 0;
    else if (i in {1: true, 4: true, 7: true})
      col = 1;
    else
      col = 2;

    return (
      this.board[0][col].isCircle === cell.isCircle &&
      this.board[1][col].isCircle === cell.isCircle &&
      this.board[2][col].isCircle === cell.isCircle
      )
  }

  checkRightDiagonal(cell: Cell): boolean {
    return (
      this.board[0][0].isCircle === cell.isCircle &&
      this.board[1][1].isCircle === cell.isCircle &&
      this.board[2][2].isCircle === cell.isCircle 
    )
  }
  checkLeftDiagonal(cell: Cell): boolean {
    return (
      this.board[0][2].isCircle === cell.isCircle &&
      this.board[1][1].isCircle === cell.isCircle &&
      this.board[2][0].isCircle === cell.isCircle 
    )
  }

  checkForDraw(): boolean{
    let isThereEmptyCell = false;
    for (let row of this.board){
      for (let cell of row){
        if (cell.isCircle === null){
          isThereEmptyCell = true;
          break;
        }
      }
      if (isThereEmptyCell)
        break;
    }
    return !isThereEmptyCell;
  }



  restart() {
    this.initializeBoard();
    this.circleIsNextMove = false;
    this.gameOver = false;
  }


  
}



