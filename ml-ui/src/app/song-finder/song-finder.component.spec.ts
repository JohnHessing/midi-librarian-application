import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFinderComponent } from './song-finder.component';

describe('SongFinderComponent', () => {
  let component: SongFinderComponent;
  let fixture: ComponentFixture<SongFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
