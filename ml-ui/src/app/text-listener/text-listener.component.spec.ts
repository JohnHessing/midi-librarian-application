import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListenerComponent } from './text-listener.component';

describe('TextListenerComponent', () => {
  let component: TextListenerComponent;
  let fixture: ComponentFixture<TextListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
