import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedProductsComponent } from './confirmed-products.component';

describe('ConfirmedProductsComponent', () => {
  let component: ConfirmedProductsComponent;
  let fixture: ComponentFixture<ConfirmedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
