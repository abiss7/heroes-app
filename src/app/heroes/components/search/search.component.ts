/** Angular */
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

/** Interfaces */
import { IntHero } from '@interfaces/hero.interface';

@Component({
  selector: 'hero-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  public searchInput = new FormControl();
  public heroes: IntHero[] = [];

  private router: Router = inject(Router);

  //#region -----------------------------------------------------> INIT

  searchHero() {
    if (!this.searchInput?.value) {
      return;
    }

    this.router.navigate([
      '/heroes/search',
      this.searchInput.value.toLowerCase(),
    ]);
  }

  //#endregion
}
