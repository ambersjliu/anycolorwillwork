import { Component, Input } from '@angular/core';
import { RGB } from '../../interfaces/rgb';

@Component({
  selector: 'app-colordiv',
  imports: [],
  templateUrl: './colordiv.component.html',
  styleUrl: './colordiv.component.css'
})
export class ColordivComponent {

  @Input() color!: RGB;

  getColor() {
    const { r, g, b } = this.color;
    return `rgb(${r}, ${g}, ${b})`;
  }
}
