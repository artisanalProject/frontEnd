import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisantComponent } from './artisant.component';

describe('ArtisantComponent', () => {
  let component: ArtisantComponent;
  let fixture: ComponentFixture<ArtisantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
