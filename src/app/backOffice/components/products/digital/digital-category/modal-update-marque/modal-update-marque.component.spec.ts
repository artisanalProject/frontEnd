import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMarqueComponent } from './modal-update-marque.component';

describe('ModalUpdateMarqueComponent', () => {
  let component: ModalUpdateMarqueComponent;
  let fixture: ComponentFixture<ModalUpdateMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
