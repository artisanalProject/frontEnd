import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerVerticalComponent } from './best-seller-vertical.component';

describe('BestSellerVerticalComponent', () => {
  let component: BestSellerVerticalComponent;
  let fixture: ComponentFixture<BestSellerVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestSellerVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
