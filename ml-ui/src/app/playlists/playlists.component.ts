import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileSaveRequest, PlayList, PlayListItem, PlayListsHolder} from './playlists.model';
import {EventBusService} from '../services/event-bus.service';
import {FileContentsResponse} from '../playlists/playlists.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlayListsComponent implements OnInit {

  playListsHolder: PlayListsHolder;
  activePlayList: PlayList;
  activePlayListItem: PlayListItem;

  fileIsSaving = false;

  content: string = '';

  config: any = {
    allowedContent: true,
    toolbar: [['Bold', 'Italic', 'Underline', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'NumberedList', '-', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],
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

  constructor(private readonly httpClient: HttpClient,
              private readonly eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.retrievePlayLists().
      subscribe( result => {
        this.playListsHolder = result;
        this.activatePlayList(0);
    });

    this.eventBusService.TextFileRecievedStream.subscribe( result => {
      this.content = result.fileContents;
    })


    this.eventBusService.TellEditorToSave.subscribe(
        (request) => {
          console.log('I will save ' + this.content)
          request.fileContents = this.content;
          this.eventBusService.ReadyForSave.next(request);
        }
    )


  }

  getHttpHeader() {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', `*`)
    };
  }

  retrievePlayLists(): Observable<PlayListsHolder> {
    return this.httpClient.get<PlayListsHolder>(`/ml/playlists`, this.getHttpHeader());
  }

  activatePlayList(i: number): void {
    this.playListsHolder.playLists.forEach(playList => {playList.isActive = false;})
    this.activePlayList = this.playListsHolder.playLists[i - 1];
    if (this.activePlayList !== undefined) {
      this.activePlayList.isActive = true;
      this.activePlayList.playListItems.forEach(playListItem => {playListItem.isActive = false;})
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
  console.log('retrieving text file');
    const body = {
        songName: playListItem.name,
        path: filePath
    };
    return this.httpClient.post<FileContentsResponse>(`/ml/textFile`, body, this.getHttpHeader());
  }

  onSave(event: any) {
    this.fileIsSaving = true;
    const fileSaveRequest: FileSaveRequest = {
      songName: this.activePlayListItem.name,
      path: this.activePlayList.path,
      fileContents: this.content
    }
    this.httpClient.post<any>(`/ml/saveTextFile`, fileSaveRequest, this.getHttpHeader()).subscribe(() => {
      console.log('file was saved');
      this.fileIsSaving = false;
    });
  }

}
