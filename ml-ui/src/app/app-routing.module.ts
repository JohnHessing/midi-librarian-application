import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlayListEditorComponent} from "./play-list-editor/play-list-editor.component";
import {SongTextListenerComponent} from "./song-text-listener/song-text-listener.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'playlisteditor', component: PlayListEditorComponent },
  { path: 'textListener', component: SongTextListenerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
