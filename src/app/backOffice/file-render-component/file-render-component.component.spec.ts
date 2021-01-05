import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRenderComponentComponent } from './file-render-component.component';

describe('FileRenderComponentComponent', () => {
  let component: FileRenderComponentComponent;
  let fixture: ComponentFixture<FileRenderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileRenderComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRenderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
