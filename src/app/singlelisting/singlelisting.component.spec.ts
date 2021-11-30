import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglelistingComponent } from './singlelisting.component';

describe('SinglelistingComponent', () => {
  let component: SinglelistingComponent;
  let fixture: ComponentFixture<SinglelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
