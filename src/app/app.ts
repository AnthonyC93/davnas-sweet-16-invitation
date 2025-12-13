import { Component, computed, DOCUMENT, HostListener, inject, signal } from '@angular/core';
import { CanvasService } from './services/canvas.service';
import { WINDOW } from './constants';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  providers: [Document, CanvasService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  doc = inject(DOCUMENT);
  window = inject(WINDOW);
  canvasService = inject(CanvasService);
  canvasElS = signal<HTMLCanvasElement | null>(null);
  context = computed(()=> this.canvasElS()?.getContext('2d'));
  details = [
    {
      title: 'Date & time',
      img: '',
      list: ['Sunday', 'March 8, 2026', '4:30PM - 9:30PM']
    },
    {
      title: 'Location',
      img: '',
      list: ['Liberty House', '76 Audrey Zapp Dr', 'Jersey City, NJ']
    },
    {
      title: 'Dress Code',
      img: '',
      list: ['Winter Theme', "Please do not wear bluie"]
    }
  ]
  width = this.window.innerWidth;
  height = this.window.innerHeight;

  ngAfterViewInit() {
    this.canvasElS.set(<HTMLCanvasElement>this.doc.getElementById('canvas'));
    this.width = this.window.innerWidth;
    this.canvasElS()!.width = this.window.innerWidth;
    this.height = this.window.innerHeight;
    this.canvasElS()!.height = this.window.innerHeight;
    this.setUpSnowflakes();
  }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    this.width = this.window.innerWidth;
    this.canvasElS()!.width = this.window.innerWidth;
    this.height = this.window.innerHeight;
    this.canvasElS()!.height = this.window.innerHeight;
  }

  setUpSnowflakes() {
    interval(25).subscribe(()=>{
      this.canvasService.updateSnowFall(this.context(), this.width, this.height);
    })
    this.canvasService.createSnowflakes(this.width, this.height);
  }
}
