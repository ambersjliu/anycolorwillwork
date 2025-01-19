import { Component, inject } from '@angular/core';
import { ColordivComponent } from "../colordiv/colordiv.component";
import { ViewStateService } from '../../services/view-state/view-state.service';
import { RGB } from '../../interfaces/rgb';
import { GameStateService } from '../../services/game-state/game-state.service';

@Component({
  selector: 'app-game',
  imports: [ColordivComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  viewStateService: ViewStateService = inject(ViewStateService);
  gameStateService: GameStateService = inject(GameStateService);

  //contextColor: RGB = {...}
  //targetColor: RGB = {...}

}
