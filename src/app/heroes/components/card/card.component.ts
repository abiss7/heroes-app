// Angular
import { Component, Input } from '@angular/core';

// Interfaces
import { IntHero } from '../../interfaces';

@Component({
  selector: 'hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input()
  public hero!: IntHero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is required');
  }
}
