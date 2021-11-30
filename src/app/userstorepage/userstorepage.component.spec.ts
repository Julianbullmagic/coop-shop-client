import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstorepageComponent } from './userstorepage.component';

describe('UserstorepageComponent', () => {
  let component: UserstorepageComponent;
  let fixture: ComponentFixture<UserstorepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstorepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstorepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
