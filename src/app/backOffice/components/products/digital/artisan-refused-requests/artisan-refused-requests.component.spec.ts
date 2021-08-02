import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanRefusedRequestsComponent } from './artisan-refused-requests.component';

describe('ArtisanRefusedRequestsComponent', () => {
  let component: ArtisanRefusedRequestsComponent;
  let fixture: ComponentFixture<ArtisanRefusedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanRefusedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanRefusedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
