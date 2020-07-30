import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FileContentsResponse, FileSaveRequest, Mp3Config} from '../playlists/playlists.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  TextFileRecievedStream: Subject<FileContentsResponse>;
  Mp3ConfigStream: Subject<Mp3Config>;
  AskToSendMp3ConfigStream: Subject<string>;

  constructor() {
    this.TextFileRecievedStream = new Subject<FileContentsResponse>();
    this.Mp3ConfigStream = new Subject<Mp3Config>();
    this.AskToSendMp3ConfigStream = new Subject<string>();
  }
}
