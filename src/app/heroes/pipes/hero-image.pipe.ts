// Angular
import { Pipe, PipeTransform } from '@angular/core';

// Interfaces
import { IntHero } from '../interfaces';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: IntHero): string {
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }

    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }
}
