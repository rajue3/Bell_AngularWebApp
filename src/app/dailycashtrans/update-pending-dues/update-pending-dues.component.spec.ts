import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePendingDuesComponent } from './update-pending-dues.component';

describe('UpdatePendingDuesComponent', () => {
  let component: UpdatePendingDuesComponent;
  let fixture: ComponentFixture<UpdatePendingDuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePendingDuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePendingDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
