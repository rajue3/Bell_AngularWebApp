import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOnlinePaymentsReceivedComponent } from './update-online-payments-received.component';

describe('UpdateOnlinePaymentsReceivedComponent', () => {
  let component: UpdateOnlinePaymentsReceivedComponent;
  let fixture: ComponentFixture<UpdateOnlinePaymentsReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOnlinePaymentsReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOnlinePaymentsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
