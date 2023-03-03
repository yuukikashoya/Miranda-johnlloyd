import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaFBComponent } from './ala-fb.component';

describe('AlaFBComponent', () => {
  let component: AlaFBComponent;
  let fixture: ComponentFixture<AlaFBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaFBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlaFBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
