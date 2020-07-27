import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlayListEditorComponent} from "./play-list-editor/play-list-editor.component";
import {SongTextListenerComponent} from "./song-text-listener/song-text-listener.component";
import {Mp3PlayerComponent} from "./mp3-player/mp3-player.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'playlisteditor', component: PlayListEditorComponent },
  { path: 'textListener', component: SongTextListenerComponent },
  { path: 'audioPlayer', component: Mp3PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
