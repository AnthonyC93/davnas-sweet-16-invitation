import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('davna-sweet');
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

}
