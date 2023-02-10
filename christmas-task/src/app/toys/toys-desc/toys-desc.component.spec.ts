import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysDescComponent } from './toys-desc.component';

describe('ToysDescComponent', () => {
  let component: ToysDescComponent;
  let fixture: ComponentFixture<ToysDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToysDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToysDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
