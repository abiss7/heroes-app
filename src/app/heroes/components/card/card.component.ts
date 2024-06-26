// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Interfaces
import { IntHero } from '../../interfaces';

@Component({
  selector: 'hero-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  public hero!: IntHero;

  @Output() onDeleteEmitter = new EventEmitter<IntHero>();

  //#region -----------------------------------------------------> HOOKS

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is required');
  }

  //#endregion

  //#region -----------------------------------------------------> EVENTS

  onDelete(hero: IntHero) {
    this.onDeleteEmitter.emit(hero);
  }

  //#endregion
}
