import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalaComponent } from './wala.component';

describe('WalaComponent', () => {
  let component: WalaComponent;
  let fixture: ComponentFixture<WalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
