import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanPendingRequestsComponent } from './artisan-pending-requests.component';

describe('ArtisanPendingRequestsComponent', () => {
  let component: ArtisanPendingRequestsComponent;
  let fixture: ComponentFixture<ArtisanPendingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanPendingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
