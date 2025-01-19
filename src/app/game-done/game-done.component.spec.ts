import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDoneComponent } from './game-done.component';

describe('GameDoneComponent', () => {
  let component: GameDoneComponent;
  let fixture: ComponentFixture<GameDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
