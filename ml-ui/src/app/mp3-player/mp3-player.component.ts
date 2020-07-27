import { Component, OnInit } from '@angular/core';
import {Mp3PlayerService} from "./mp3-player-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mp3-player',
  templateUrl: './mp3-player.component.html',
  styleUrls: ['./mp3-player.component.css']
})
export class Mp3PlayerComponent implements OnInit {

  constructor(public readonly activeModal: NgbActiveModal,
              public readonly mp3PlayerService: Mp3PlayerService) { }

  ngOnInit(): void {
  }
}
