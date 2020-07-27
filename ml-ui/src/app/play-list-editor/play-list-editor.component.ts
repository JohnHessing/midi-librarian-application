import { Component, OnInit, ViewChild } from '@angular/core';
import {PlayListsService} from "../services/playlists-service";
import {PlayListsHolder, PlayListsSaveRequest} from "../playlists/playlists.model";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-play-list-editor',
  templateUrl: './play-list-editor.component.html',
  styleUrls: ['./play-list-editor.component.css']
})
export class PlayListEditorComponent implements OnInit {

  playListsHolder: PlayListsHolder;
  jsonPlayListsDefinitie: string;
  hasSyntaxError = false;
  isSaved = false;

  constructor(private readonly playListsService: PlayListsService,
              private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {

    this.playListsService.retrievePlayLists().
    subscribe( result => {
      this.playListsHolder = result;
      this.jsonPlayListsDefinitie = JSON.stringify(this.playListsHolder, ["playLists", "path", "name", "playListItems", "delay", "mp3FilePath"], 2);
    });

  }

  savePlayLists(): void {
    this.hasSyntaxError = false;
    this.isSaved = false;

    try {
      this.isSaved = true;
      JSON.parse(this.jsonPlayListsDefinitie);
      let playListsSaveRequest: PlayListsSaveRequest = {
        fileContents: this.jsonPlayListsDefinitie
      }
      this.httpClient.post<any>(`/ml/savePlayListsFile`, playListsSaveRequest, this.playListsService.getHttpHeader()).subscribe(() => {
        console.log('playlistfile was saved');
      });
    } catch (e) {
      this.hasSyntaxError = true;
      let errorArray = e.message.split(' ');
      let lastIndex = errorArray.length - 1;
      let errPosition = Number(errorArray[lastIndex]);
      this.setSelectionRange(document.getElementById('jsonPlayLists'), errPosition, errPosition + 1);
    }
  }

  setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

  setCaretToPos (input, pos) {
  this.setSelectionRange(input, pos, pos);
}
}
