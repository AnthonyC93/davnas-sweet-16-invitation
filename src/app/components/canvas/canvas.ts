import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas {
 @ViewChildren('#canvas') canvasList: QueryList<ElementRef>

  ngOnInit() {
    this.canvasList.changes.subscribe(item => {
      console.log('item!', item);
    })
  }
}
