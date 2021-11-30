import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingviewerComponent } from './listingviewer.component';

describe('ListingviewerComponent', () => {
  let component: ListingviewerComponent;
  let fixture: ComponentFixture<ListingviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
