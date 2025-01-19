import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ColordivComponent } from "../colordiv/colordiv.component";
import { ViewStateService } from '../../services/view-state/view-state.service';
import { RGB } from '../../interfaces/rgb';
import { GameStateService } from '../../services/game-state/game-state.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  imports: [ColordivComponent, ColorPickerModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy{
  
  totalScore: number = 0;
  round: number = 0;
  
  colorForm = new FormGroup({
    baseColor: new FormControl(''),  
    overlayColor: new FormControl(''), 
    opacity: new FormControl(50)     
  });

  viewStateService: ViewStateService = inject(ViewStateService);
  gameStateService: GameStateService = inject(GameStateService);

  contextColor: RGB = {r: 0, g: 0, b: 0};
  targetColor: RGB = {r: 0, g: 0, b: 0};
  overlayColor: string = "#000000";
  baseColor: string = "#000000";

  // constructor(){
  // }

  // ngOnInit() {
  //   this.reset();
  //   this.gameStateService.nextRound();
  //   this.updateValues();
  // }

  // ngOnDestroy(){

  // }

  private subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.reset();
    this.initializeSubscriptions();
    this.gameStateService.nextRound();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initializeSubscriptions() {
    this.subscriptions.add(
      this.gameStateService.currentRound$.subscribe((round) => {
        this.round = round;
      })
    );

    this.subscriptions.add(
      this.gameStateService.totalScore$.subscribe((score) => {
        this.totalScore = score;
      })
    );

    this.subscriptions.add(
      this.gameStateService.contextColor$.subscribe((color) => {
        this.contextColor = color;
      })
    );

    this.subscriptions.add(
      this.gameStateService.targetColor$.subscribe((color) => {
        this.targetColor = color;
      })
    );
  }

  
  
  submitRound(){
    this.colorForm.patchValue({
      baseColor: this.baseColor,
      overlayColor: this.overlayColor
    });
    const baseColor = this.colorForm.value?.baseColor;
    const overlayColor = this.colorForm.value?.overlayColor;
    const opacity = this.colorForm.value?.opacity! / 100;
    if (baseColor && overlayColor && opacity != null){
      console.log("i called")
      this.gameStateService.submitRound(baseColor, overlayColor, opacity);
      this.colorForm.reset();
      this.resetColorPickers();
      if (this.gameStateService.isGameFinished()){
        this.gameStateService.reset();
        this.viewStateService.setState("summary");
      }
    }
  }

  // updateValues() {
  //   this.contextColor = context;
  //   this.targetColor = target;
  //   this.totalScore = this.gameStateService.getTotalScore();
  //   this.round = this.gameStateService.getCurrentRound();
  // }

  resetColorPickers(){
    this.overlayColor = "#000000";
    this.baseColor = "#000000"; 
  }

  reset(){
    this.resetColorPickers();
    this.contextColor = {r: 0, g: 0, b: 0};
    this.targetColor = {r: 0, g: 0, b: 0};
    this.totalScore = 0;
    this.round = 0;
  }

}
