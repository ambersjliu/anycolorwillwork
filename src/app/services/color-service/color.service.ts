import { Injectable } from '@angular/core';
import { RGB } from '../../interfaces/rgb';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  /**
   * Linearly blend the colours
   * @param baseColor Base colour
   * @param overlayColor Colour to be overlaid
   * @param opacity Opacity of overlay colour
   * @returns The final colour after applying the overlay
   */
  blendColors(baseColor: RGB, overlayColor: RGB, opacity: number): RGB{
    const finalRed = baseColor.r * (1.0-opacity) + overlayColor.r * opacity;
    const finalGreen = baseColor.g * (1.0-opacity) + overlayColor.g * opacity;
    const finalBlue = baseColor.b * (1.0-opacity) + overlayColor.b * opacity;
    const outputColour: RGB = {r: finalRed, g: finalGreen, b: finalBlue};
    return outputColour;
  }

  /**
   * Calculate the perceived distance between colours from 0-100
   * Based on: https://www.compuphase.com/cmetric.htm
   * @param color1 The first colour to be compared
   * @param color2 The second colour to be compared
   * @returns The perceived distance between them from 0-100
   */
  calculateColorDistance(color1: RGB, color2: RGB): number {
    const maxDistance = 805.8;
    const rmean = Math.floor((color1.r + color2.r) / 2);
    const r = color1.r - color2.r;
    const g = color1.g - color2.g;
    const b = color1.b - color2.b;

    const distance = Math.sqrt(
      (((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8)
    );
  
    // Normalize to 0-100
    return (distance / maxDistance) * 100;
  }

  /**
   * @returns Returns a random colour in RGB format
   */
  getRandomColor(): RGB{
    const r = this.#getRandomInt(256);
    const g = this.#getRandomInt(256);
    const b = this.#getRandomInt(256);
    const outputColour: RGB = {r: r, g: g, b: b}
    return outputColour;
  }

  hexToRGB(hex: string): RGB {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
  
    if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
    }
  
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    return { r, g, b };
  }

  #getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
