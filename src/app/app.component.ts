import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  cells:Array<number> = []

  ngOnInit(): void {
      for(let i = 0; i < 9; i++)
        this.cells.push(i);
  }
}



