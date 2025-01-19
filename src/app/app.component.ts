import { Component, inject, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ViewState, ViewStateService } from './services/view-state/view-state.service';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from "./components/game/game.component";
import { SummaryComponent } from "./components/summary/summary.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HomeComponent, GameComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  state: ViewState = 'home';
  viewStateService: ViewStateService = inject(ViewStateService);

  title = 'any color will work';

  ngOnInit(): void{
    this.viewStateService.state$.subscribe(newState => {
      this.state = newState;
    })
  }
}
