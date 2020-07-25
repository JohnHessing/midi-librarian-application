import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {PlayListsHolder} from "../playlists/playlists.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PlayListsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getHttpHeader() {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', `*`)
    };
  }

  public retrievePlayLists(): Observable<PlayListsHolder> {
    return this.httpClient.get<PlayListsHolder>(`/ml/playlists`, this.getHttpHeader());
  }

}
