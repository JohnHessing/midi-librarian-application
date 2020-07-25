import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongTextListenerComponent } from './song-text-listener.component';

describe('SongTextListenerComponent', () => {
  let component: SongTextListenerComponent;
  let fixture: ComponentFixture<SongTextListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongTextListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongTextListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
