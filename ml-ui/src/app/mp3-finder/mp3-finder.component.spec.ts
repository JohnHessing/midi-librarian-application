import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mp3FinderComponent } from './mp3-finder.component';

describe('Mp3FinderComponent', () => {
  let component: Mp3FinderComponent;
  let fixture: ComponentFixture<Mp3FinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mp3FinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mp3FinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
