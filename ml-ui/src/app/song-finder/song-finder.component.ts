import {Component, OnInit} from '@angular/core';
import {SongFound} from "./song-finder-model";
import {PlayListsService} from "../services/playlists-service";
import {PlayListsHolder} from "../playlists/playlists.model";

@Component({
  selector: 'app-song-finder',
  templateUrl: './song-finder.component.html',
  styleUrls: ['./song-finder.component.css']
})
export class SongFinderComponent implements OnInit {

  foundSongs = new Array<SongFound>();
  searchedForSong = false;

  songTitle: string;
  theFoundSongs: string;
  playListsHolder: PlayListsHolder;

  constructor(private readonly playListsService: PlayListsService) {
  }

  ngOnInit(): void {
    this.playListsService.retrievePlayLists().subscribe(result => {
      this.playListsHolder = result;
    });

  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // this.findTerm().forEach(el => console.log(el.foundSongName + ' in ' + el.foundPlayListName))
      this.findTerm();
      this.theFoundSongs = '';
      this.foundSongs.forEach(el => {
        this.theFoundSongs = this.theFoundSongs + el.foundSongName + '\n(found in: ' + el.foundPlayListName + ')\n\n'
      });
      console.log(this.theFoundSongs);
    }
  }

  findTerm() {
    this.foundSongs = new Array<SongFound>();
    this.searchedForSong = true;
    this.playListsHolder.playLists
      .forEach(playList => {
        playList
          .playListItems
          .forEach(item => {
            if (item.name.toLowerCase().indexOf(this.songTitle) !== -1) {
              this.foundSongs.push(
                {
                  foundSongName: item.name,
                  foundPlayListName: playList.name
                }
              )
            }
          })
      })
  }

}
