import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysControllerComponent } from './toys-controller.component';

describe('ToysControllerComponent', () => {
  let component: ToysControllerComponent;
  let fixture: ComponentFixture<ToysControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToysControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToysControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
