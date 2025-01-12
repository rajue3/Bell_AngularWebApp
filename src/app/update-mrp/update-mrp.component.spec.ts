import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMrpComponent } from './update-mrp.component';

describe('UpdateMrpComponent', () => {
  let component: UpdateMrpComponent;
  let fixture: ComponentFixture<UpdateMrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
