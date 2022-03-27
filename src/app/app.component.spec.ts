import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ AppComponent ],
    }).compileComponents();
  });

  it('X win on left diagonal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();
    // X
    app.onCellClick(app.htmlBoard[0], 0);
    // O
    app.onCellClick(app.htmlBoard[1], 1);
    // X
    app.onCellClick(app.htmlBoard[4], 4);
    // O
    app.onCellClick(app.htmlBoard[2], 2);
    // X 
    app.onCellClick(app.htmlBoard[8], 8);

    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.xWinningMessage);
  });

  it('X win on right diagonal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();
    // X
    app.onCellClick(app.htmlBoard[2], 2);
    // O
    app.onCellClick(app.htmlBoard[1], 1);
    // X
    app.onCellClick(app.htmlBoard[4], 4);
    // O
    app.onCellClick(app.htmlBoard[0], 0);
    // X 
    app.onCellClick(app.htmlBoard[6], 6);

    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.xWinningMessage);
  });

  it('O win on middle column', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();
    // X
    app.onCellClick(app.htmlBoard[0], 0);
    // O
    app.onCellClick(app.htmlBoard[1], 1);
    // X
    app.onCellClick(app.htmlBoard[3], 3);
    // O
    app.onCellClick(app.htmlBoard[4], 4);
    // X 
    app.onCellClick(app.htmlBoard[8], 8);
    // O
    app.onCellClick(app.htmlBoard[7], 7);

    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.circleWinningMessage);
  });

  it('X win on middle row', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();
    // X
    app.onCellClick(app.htmlBoard[3], 3);
    // O
    app.onCellClick(app.htmlBoard[1], 1);
    // X
    app.onCellClick(app.htmlBoard[4], 4);
    // O
    app.onCellClick(app.htmlBoard[2], 2);
    // X 
    app.onCellClick(app.htmlBoard[5], 5);
    
    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.xWinningMessage);
  });

  it('O win on middle row', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();
    // X
    app.onCellClick(app.htmlBoard[1], 1);
    // O
    app.onCellClick(app.htmlBoard[3], 3);
    // X
    app.onCellClick(app.htmlBoard[2], 2);
    // O
    app.onCellClick(app.htmlBoard[4], 4);
    // X 
    app.onCellClick(app.htmlBoard[6], 6);
    // O 
    app.onCellClick(app.htmlBoard[5], 5);
    
    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.circleWinningMessage);
  });
  
  it('Draw', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initializeBoard();

    // X
    app.onCellClick(app.htmlBoard[4], 4);
    // O
    app.onCellClick(app.htmlBoard[0], 0);
    // X
    app.onCellClick(app.htmlBoard[2], 2);
    // O
    app.onCellClick(app.htmlBoard[6], 6);
    // X 
    app.onCellClick(app.htmlBoard[3], 3);
    // O 
    app.onCellClick(app.htmlBoard[5], 5);
    // X
    app.onCellClick(app.htmlBoard[1], 1);
    // O
    app.onCellClick(app.htmlBoard[7], 7);
    // X
    app.onCellClick(app.htmlBoard[8], 8);

    expect(app.gameOver).toBeTruthy();
    expect(app.winningMessage).toBe(app.drawWinningMessage);
  });


});
