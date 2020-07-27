

import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})

export class Mp3PlayerService {

  public playlist = [
    {
      title: 'Tha Kar ke',
      link: 'https://funksyou.com/fileDownload/Songs/128/13080.mp3'
    },
    {
      title: 'Uptown Funk',
      link: '../../assets/mp3/Uptown Funk.mp3'
    },
    {
      title: 'Golmal',
      link: 'https://funksyou.com/fileDownload/Songs/128/13091.mp3'
    }
  ];

  constructor() {
  }

}
