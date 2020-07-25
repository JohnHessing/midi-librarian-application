import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FileContentsResponse, FileSaveRequest} from '../playlists/playlists.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  TextFileRecievedStream: Subject<FileContentsResponse>;

  constructor() {
    this.TextFileRecievedStream = new Subject<FileContentsResponse>();
  }
}
