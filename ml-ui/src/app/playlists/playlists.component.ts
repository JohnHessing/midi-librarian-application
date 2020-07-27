import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileSaveRequest, NetworkInfo, PlayList, PlayListItem, PlayListsHolder} from './playlists.model';
import {EventBusService} from '../services/event-bus.service';
import {FileContentsResponse} from '../playlists/playlists.model';
// import {CKEditorComponent} from "ng2-ckeditor/ckeditor.component";
import {PlayListsService} from "../services/playlists-service";
import { Track, MatAdvancedAudioPlayerComponent } from 'ngx-audio-player';
import {Router} from "@angular/router";
import {Mp3PlayerService} from "../mp3-player/mp3-player-service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Mp3PlayerComponent} from "../mp3-player/mp3-player.component";
import {fromPromise} from "rxjs/internal/observable/fromPromise";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlayListsComponent implements OnInit {

  ipAddress = '';

  playListsHolder: PlayListsHolder;
  activePlayList: PlayList;
  activePlayListItem: PlayListItem;

  fileIsSaving = false;
  savedMessage: string = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

  content: string = '';

  config: any = {
    allowedContent: true,
    //toolbar: [['Bold', 'Italic', 'Underline', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'NumberedList', '-', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],

      toolbarGroups : [
          { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'forms', groups: [ 'forms' ] },
          '/',
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
          { name: 'links', groups: [ 'links' ] },
          { name: 'insert', groups: [ 'insert' ] },
          '/',
          { name: 'styles', groups: [ 'styles' ] },
          { name: 'colors', groups: [ 'colors' ] },
          { name: 'tools', groups: [ 'tools' ] },
          { name: 'others', groups: [ 'others' ] },
          { name: 'about', groups: [ 'about' ] }
      ],

      removeButtons : 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,PageBreak,Iframe,About',

    removePlugins: 'elementspath',
    resize_enabled: true,
    resize_dir: 'both',
    extraPlugins: 'font,divarea,placeholder',
    contentsCss: ["body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}"],
    autoParagraph: false,
    fullScreen: true,
    height: 650,
    width: 820,
    enterMode: 2
  };

  focusedListItemIndex = 0;

  constructor(private readonly httpClient: HttpClient,
              private readonly eventBusService: EventBusService,
              private readonly playListsService: PlayListsService,
              private readonly router: Router,
              private readonly modalService: NgbModal,
              private mp3PlayerService: Mp3PlayerService) {}

  ngOnInit(): void {

    this.savedMessage = '';

    this.getIpAddress().subscribe(result => {
        this.ipAddress = result.ip;
    })

    this.playListsService.retrievePlayLists().
      subscribe( result => {
        this.playListsHolder = result;
        this.activatePlayList(1);
    });

    this.eventBusService.TextFileRecievedStream.subscribe( result => {
      this.content = result.fileContents;
    })

  }
  getHttpHeader() {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', `*`)
    };
  }

 activatePlayList(i: number): void {
    this.playListsHolder.playLists.forEach(playList => {playList.isActive = false;})
    this.activePlayList = this.playListsHolder.playLists[i - 1];
    if (this.activePlayList !== undefined) {
      this.activePlayList.isActive = true;
      this.activePlayList.playListItems.forEach(playListItem => {playListItem.isActive = false;})
      this.setFocusedPlayListItem(1);
    }
  }

  activatePlayListItem(i: number): void {
    this.activePlayListItem = this.activePlayList.playListItems[i - 1];
    this.activePlayList.playListItems.forEach(playListItem => {playListItem.isActive = false;})
    this.activePlayListItem.isActive = true;
    this.activePlayListItem.isPlaying = true;

    console.log('File ' + this.activePlayListItem.name + '.syx will be sent');
    this.sendPlayListItem(this.activePlayListItem, this.activePlayList.path)
    .pipe().subscribe( () => { console.log('File is sent'); this.activePlayListItem.isPlaying = false;} )

    if (i < this.activePlayList.playListItems.length) {
      this.setFocusedPlayListItem(i + 1);
    }
  }

  sendPlayListItem(playListItem: PlayListItem, filePath: string): Observable<any> {
    const body = {
        songName: playListItem.name,
        path: filePath,
        delay: playListItem.delay
    };
    this.retrieveTextFileContents(playListItem, filePath)
        .subscribe(result => {
            console.log('File contents: ' + result.fileContents)
            this.eventBusService.TextFileRecievedStream.next(result)
        });

    return this.httpClient.post<any>(`/ml/sendFile`, body, this.getHttpHeader());
  }

  retrieveTextFileContents(playListItem: PlayListItem, filePath: string): Observable<FileContentsResponse> {
    this.savedMessage = '';
    console.log('retrieving text file');
    const body = {
        songName: playListItem.name,
        path: filePath
    };
    return this.httpClient.post<FileContentsResponse>(`/ml/textFile`, body, this.getHttpHeader());
  }

  onSave(event: any): any {
    this.savedMessage = 'Saving';
    this.fileIsSaving = true;
    const fileSaveRequest: FileSaveRequest = {
      songName: this.activePlayListItem.name,
      path: this.activePlayList.path,
      fileContents: this.content
    }
    this.httpClient.post<any>(`/ml/saveTextFile`, fileSaveRequest, this.getHttpHeader()).subscribe(() => {
      console.log('file was saved');
      this.savedMessage = 'Saved';
      this.fileIsSaving = false;
    });
  }

  setFocusedPlayListItem(i: number) {
    this.focusedListItemIndex = i;
    document.getElementById("PLAY_LIST_ITEM_" + this.focusedListItemIndex).focus().scrollIntoView();
  }

  handleKeyboardEvent(event: KeyboardEvent, i: number) {
    if (event.code === 'ArrowDown') {
      if (i < this.activePlayList.playListItems.length) {
        this.setFocusedPlayListItem(i + 1);
      }
    }
    if (event.code === 'ArrowUp') {
      if (i > 1) {
        this.setFocusedPlayListItem(i - 1);
      }
    }
    if (event.code === 'Space' || event.code === 'Enter') {
      this.activatePlayListItem(this.focusedListItemIndex);
    }

  }

  hasMp3(playListItem: PlayListItem): boolean {
    if (playListItem.mp3Title) {
      return true;
    }
    return false;
  }

  playMp3(playListItem: PlayListItem) {
    const playlist = [
      {
        title: playListItem.mp3Title,
        link: playListItem.mp3FilePath
      }
    ];
    this.mp3PlayerService.playlist = playlist;
    this.callMp3Player();

  }

  getIpAddress() : Observable<NetworkInfo> {
      return this.httpClient.get<NetworkInfo>(`/ml/localIP`, this.getHttpHeader());
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
