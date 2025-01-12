import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemslistComponent } from './view-itemslist.component';

describe('ViewItemslistComponent', () => {
  let component: ViewItemslistComponent;
  let fixture: ComponentFixture<ViewItemslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
