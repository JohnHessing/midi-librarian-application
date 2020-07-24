import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListEditorComponent } from './play-list-editor.component';

describe('PlayListEditorComponent', () => {
  let component: PlayListEditorComponent;
  let fixture: ComponentFixture<PlayListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
