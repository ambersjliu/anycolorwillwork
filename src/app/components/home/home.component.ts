import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state/view-state.service';
import { GameStateService } from '../../services/game-state/game-state.service';
import { ColordivComponent } from "../colordiv/colordiv.component";
import { RGB } from '../../interfaces/rgb';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ColordivComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  viewStateService: ViewStateService = inject(ViewStateService);
  gameStateService: GameStateService = inject(GameStateService);
  
  gameParametersForm = new FormGroup({
    numRounds: new FormControl(1)
  });
  colour1: RGB = {r: 113, g: 121, b: 157};
  colour2: RGB = {r: 95, g: 80, b: 87};

  startGame(){
    const numRounds = this.gameParametersForm.value!.numRounds!;
    this.gameParametersForm.reset();
    this.viewStateService.setState("game");
    this.gameStateService.setTotalRounds(numRounds);
  }
}
