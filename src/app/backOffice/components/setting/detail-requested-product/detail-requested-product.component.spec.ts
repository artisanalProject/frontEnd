import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestedProductComponent } from './detail-requested-product.component';

describe('DetailRequestedProductComponent', () => {
  let component: DetailRequestedProductComponent;
  let fixture: ComponentFixture<DetailRequestedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRequestedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
