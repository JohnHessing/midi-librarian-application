import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AudioFiles} from "./mp3-finder.model";
import {EventBusService} from "../services/event-bus.service";
import {Mp3PlayerService} from "../mp3-player/mp3-player-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Mp3PlayerComponent} from "../mp3-player/mp3-player.component";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {Mp3Config} from "../playlists/playlists.model";

@Component({
  selector: 'app-mp3-finder',
  templateUrl: './mp3-finder.component.html',
  styleUrls: ['./mp3-finder.component.css']
})
export class Mp3FinderComponent implements OnInit {

  audioFiles: AudioFiles;
  mp3Config: Mp3Config;

  constructor(private readonly httpClient: HttpClient,
              private readonly eventBusService: EventBusService,
              private readonly modalService: NgbModal,
              private mp3PlayerService: Mp3PlayerService) {
  }

  ngOnInit(): void {

    this.eventBusService.Mp3ConfigStream
          .subscribe( result => {
            this.mp3Config = result;
            console.log('Audio files will be retrieved');
            this.retrieveAudioFiles().subscribe(result => {
              console.log('Audio files are retrieved');
              this.audioFiles = result;
            })
          })

    this.eventBusService.AskToSendMp3ConfigStream.next('');

  }

  getHttpHeader() {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', `*`)
    };
  }

  public retrieveAudioFiles(): Observable<AudioFiles> {

    const bodyObject = {
      path: this.mp3Config.mp3FilePathAbsolute as string
    };

    return this.httpClient.post<AudioFiles>('/ml/audioFiles', bodyObject, this.getHttpHeader());
  }

  playMp3(mp3File: string) {
    const playlist = [
      {
        title: mp3File,
        link: this.mp3Config.mp3FilePathRelative + '/' + mp3File
      }
    ];
    this.mp3PlayerService.playlist = playlist;
    this.callMp3Player();

  }

  callMp3Player() {
    this.player().subscribe();
  }

  player(): Observable<string> {
    const modalPlayer = this.modalService.open(Mp3PlayerComponent, {
      centered: true
    });

    return fromPromise(modalPlayer.result);
  }

}
