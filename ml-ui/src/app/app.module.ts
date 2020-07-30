import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PlayListsComponent } from './playlists/playlists.component';
import { HttpClientModule } from '@angular/common/http';

import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayListEditorComponent } from './play-list-editor/play-list-editor.component';
import { SongTextListenerComponent } from './song-text-listener/song-text-listener.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Mp3PlayerComponent } from './mp3-player/mp3-player.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Mp3FinderComponent } from './mp3-finder/mp3-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PlayListsComponent,
    PlayListEditorComponent,
    SongTextListenerComponent,
    Mp3PlayerComponent,
    Mp3FinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
