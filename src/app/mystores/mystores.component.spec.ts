import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MystoresComponent } from './mystores.component';

describe('MystoresComponent', () => {
  let component: MystoresComponent;
  let fixture: ComponentFixture<MystoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
