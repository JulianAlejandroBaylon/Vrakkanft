import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrkComponent } from './vrk.component';

describe('VrkComponent', () => {
  let component: VrkComponent;
  let fixture: ComponentFixture<VrkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VrkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
