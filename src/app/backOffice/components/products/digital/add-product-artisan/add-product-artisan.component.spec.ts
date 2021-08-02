import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductArtisanComponent } from './add-product-artisan.component';

describe('AddProductArtisanComponent', () => {
  let component: AddProductArtisanComponent;
  let fixture: ComponentFixture<AddProductArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductArtisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
