import { Component, inject } from '@angular/core';
import { IntHero } from '../../interfaces';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'hero-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  public searchInput = new FormControl();
  public heroes: IntHero[] = [];

  private router: Router = inject(Router);

  searchHero() {
    if (!this.searchInput?.value) {
      return;
    }

    this.router.navigate(['/heroes/search', this.searchInput.value]);
  }
}
