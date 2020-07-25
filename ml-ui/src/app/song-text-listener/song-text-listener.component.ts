import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventBusService} from "../services/event-bus.service";
import {Observable} from "rxjs/index";
import {FileContentsResponse} from "../playlists/playlists.model";

@Component({
  selector: 'app-song-text-listener',
  templateUrl: './song-text-listener.component.html',
  styleUrls: ['./song-text-listener.component.css']
})
export class SongTextListenerComponent implements OnInit {

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
