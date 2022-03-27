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

  // 0
  getRowSlice(i: number): number {
    let row: number = 0;
    if (i in {0: true, 1: true, 2: true}){
      row = 0
    }
    return row;
  }
  getRow(i: number): number {
    const startTime = performance.now();
    let row: number;
    if (i in {0: true, 1: true, 2: true})
    row = 0;
    else if (i in {3: true, 4: true, 5: true})
    row = 1;
    else
    row = 2;
    
    const endTime = performance.now();
    console.log(`getRow took ${endTime - startTime} milliseconds`)
    return row;
  }
  
  // 1
  getColSlice(i: number): number{
    let col: number = 0;
    if (i in {1: true, 4: true, 7: true}){
      col = 1;
    }
    return col;
  }
  getCol(i: number): number{
    const startTime = performance.now();
    let col: number
    if (i in {0: true, 3: true, 6: true})
    col = 0;
    else if (i in {1: true, 4: true, 7: true})
    col = 1;
    else
    col = 2;
    const endTime = performance.now();
    console.log(`getCol took ${endTime - startTime} milliseconds`)
    return col;
  }
  
  // gameOver = True
  onCellClickSliceGameOver(cell:Cell, i: number) {
    if (this.checkForWin(cell, i)){
      this.gameOver = true;
      this.winningMessage = cell.isCircle ? this.circleWinningMessage : this.xWinningMessage;
    }else if (this.checkForDraw()){
      this.gameOver = true;
      this.winningMessage = this.drawWinningMessage;
    }
  }
  // winningMessage = drawWinningMessage
  onCellClickSlicewinningMessage(cell:Cell, i: number) {
    if (this.checkForDraw()){
      this.winningMessage = this.drawWinningMessage;
    }
  }
  onCellClick(cell:Cell, i: number) {
    const startTime = performance.now();
    if (cell.isCircle !== null)
    return;
    
    this.markCell(cell);
    if (this.checkForWin(cell, i)){
      this.gameOver = true;
      this.winningMessage = cell.isCircle ? this.circleWinningMessage : this.xWinningMessage;
    }else if (this.checkForDraw()){
      this.gameOver = true;
      this.winningMessage = this.drawWinningMessage;
    }
    const endTime = performance.now();
    console.log(`onCellClick took ${endTime - startTime} milliseconds`)
  }
  
  
  program(x: number) {
    if (x > 5) 
    x = 9;
    else 
    x += 1
    return x;
  }
  // x = 9
  programSlice(x: number) {
    if (x > 5) 
    x = 9;
    return x;
  }
  
  
  
  
  programSliceFive(x: number) {
    if (x == 3) {
      x = 7;
      console.log(`programSliceFive: line 56: ${x}`);
    }else {
      x += 3
    }
    return x;
  }
  
  initializeBoard() {
    const startTime = performance.now();
    for(let i = 0; i < 3; i++){
      const row: Array<Cell> = [];  
      for (let j = 0; j < 3; j++){
        const cell: Cell = { isCircle: null };
        row.push(cell);
        this.htmlBoard.push(cell);
      }
      this.board.push(row); 
    }
    const endTime = performance.now();
    console.log(`initializeBoard took ${endTime - startTime} milliseconds`)
  }
  
  
  
  markCell(cell: Cell) {
    const startTime = performance.now();
    cell.isCircle = this.circleIsNextMove ? true : false;
    this.circleIsNextMove = !this.circleIsNextMove;
    const endTime = performance.now();
    console.log(`markCell took ${endTime - startTime} milliseconds`)
  }
  
  checkForWin(cell:Cell, i: number): boolean {
    const startTime = performance.now();
    if (this.checkRowForWin(i, cell)){
      const endTime = performance.now();
      console.log(`checkForWin took ${endTime - startTime} milliseconds`)
      return true;
    }
    
    if (this.checkColForWin(i, cell)){
      const endTime = performance.now();
      console.log(`checkForWin took ${endTime - startTime} milliseconds`)
      return true;
    }
    
    if (this.checkRightDiagonal(cell)){
      const endTime = performance.now();
      console.log(`checkForWin took ${endTime - startTime} milliseconds`)
      return true;
    }
    
    const endTime = performance.now();
    console.log(`checkForWin took ${endTime - startTime} milliseconds`)
    return this.checkLeftDiagonal(cell);
  }

  checkRowForWin(i: number, cell: Cell): boolean {
    const row: number = this.getRow(i);
    return (
      this.board[row][0].isCircle === cell.isCircle &&
      this.board[row][1].isCircle === cell.isCircle &&
      this.board[row][2].isCircle === cell.isCircle
      );
  }

  checkColForWin(i: number, cell: Cell): boolean {
    const col: number = this.getCol(i);

    return (
      this.board[0][col].isCircle === cell.isCircle &&
      this.board[1][col].isCircle === cell.isCircle &&
      this.board[2][col].isCircle === cell.isCircle
      );
  }

  checkRightDiagonal(cell: Cell): boolean {
    return (
      this.board[0][0].isCircle === cell.isCircle &&
      this.board[1][1].isCircle === cell.isCircle &&
      this.board[2][2].isCircle === cell.isCircle 
    );
  }

  checkLeftDiagonal(cell: Cell): boolean {
    return (
      this.board[0][2].isCircle === cell.isCircle &&
      this.board[1][1].isCircle === cell.isCircle &&
      this.board[2][0].isCircle === cell.isCircle 
    );
  }

  checkForDraw(): boolean{
    const startTime = performance.now();
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
    const endTime = performance.now();
    console.log(`checkForDraw took ${endTime - startTime} milliseconds`)
    return !isThereEmptyCell;
  }

  restart() {
    this.board = [];
    this.htmlBoard = [];
    this.initializeBoard();
    this.circleIsNextMove = false;
    this.gameOver = false;
  }
  
}