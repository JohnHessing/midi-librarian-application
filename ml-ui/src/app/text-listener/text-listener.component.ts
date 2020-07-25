import { Component, OnInit } from '@angular/core';
import {EventBusService} from '../services/event-bus.service';

@Component({
  selector: 'app-text-listener',
  template: `
  <ckeditor
    [(ngModel)]="content"
    [config]="config"
    [readonly]="false"
    debounce="500">
  </ckeditor>
  `,
})
export class TextListenerComponent implements OnInit {

  content = '';

  config: any = {
      allowedContent: true,
      toolbar: [[]],
      removePlugins: 'elementspath',
      resize_enabled: true,
      resize_dir: 'both',
      extraPlugins: 'font,divarea,placeholder',
      contentsCss: ['body {font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;}'],
      autoParagraph: false,
      fullScreen: true,
      height: 1500,
      width: 820,
      enterMode: 2
    };

  constructor(private readonly eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusService.TextFileRecievedStream.subscribe( result => {
      this.content = result.fileContents;
    });

  }

}
