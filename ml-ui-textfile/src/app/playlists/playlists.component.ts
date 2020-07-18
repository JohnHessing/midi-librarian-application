import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileSaveRequest, PlayList, PlayListItem, PlayListsHolder} from './playlists.model';
import {EventBusService} from '../services/event-bus.service';
import {FileContentsResponse} from '../playlists/playlists.model';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlayListsComponent implements OnInit {

  constructor(private readonly httpClient: HttpClient,
              private readonly eventBusService: EventBusService) { }

  ngOnInit(): void {
      this.keepOnRefreshing();
  }

  keepOnRefreshing() {
      this.refreshCurrentSongContents();
      setTimeout(() => {
          this.keepOnRefreshing();
      }, 1000);
  }

  refreshCurrentSongContents() {
      this.retrieveCurrentSongText().
        subscribe( result => {
          this.eventBusService.TextFileRecievedStream.next(result)
      });
}

  getHttpHeader() {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', `*`)
    };
  }

  retrieveCurrentSongText(): Observable<FileContentsResponse> {
    return this.httpClient.get<FileContentsResponse>(`/ml/currentTextFile`, this.getHttpHeader());
  }

}
