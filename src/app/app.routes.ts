import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDoneComponent } from './game-done/game-done.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'next',
        component: GameDoneComponent
    }
];
