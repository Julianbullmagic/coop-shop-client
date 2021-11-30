import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreviewerComponent } from './storeviewer.component';

describe('StoreviewerComponent', () => {
  let component: StoreviewerComponent;
  let fixture: ComponentFixture<StoreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
