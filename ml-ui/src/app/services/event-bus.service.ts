import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FileContentsResponse, FileSaveRequest} from '../playlists/playlists.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  TextFileRecievedStream: Subject<FileContentsResponse>;
  TellEditorToSave: Subject<FileSaveRequest>
  ReadyForSave: Subject<FileSaveRequest>

  constructor() {
    this.TextFileRecievedStream = new Subject<FileContentsResponse>();
    this.TellEditorToSave = new Subject<FileSaveRequest>();
    this.ReadyForSave = new Subject<FileSaveRequest>();
  }
}
