import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColordivComponent } from './colordiv.component';

describe('ColordivComponent', () => {
  let component: ColordivComponent;
  let fixture: ComponentFixture<ColordivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColordivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColordivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
