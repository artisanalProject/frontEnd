import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePendingProductComponent } from './update-pending-product.component';

describe('UpdatePendingProductComponent', () => {
  let component: UpdatePendingProductComponent;
  let fixture: ComponentFixture<UpdatePendingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePendingProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePendingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
