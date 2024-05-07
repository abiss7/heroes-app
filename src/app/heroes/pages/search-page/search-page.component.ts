import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { IntHero } from '../../interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { first, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  @Input() messageEmpty: string = 'No se han encontrado resultados';
  public valueSearch = '';
  public heroes = signal<IntHero[]>([]);
  public showHeroes = computed<boolean>(() => !!this.heroes()?.length);

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.searchHeroes();
  }

  searchHeroes() {
    this.activatedRoute.params
      .pipe(
        tap(({ valueSearch }) => {
          this.valueSearch = valueSearch;
        }),
        switchMap(({ valueSearch }) =>
          this.heroService.getSuggestions(valueSearch)
        )
      )
      .subscribe({
        next: (heroes) => {
          this.heroes.set(heroes);
        },
        error: () => {
          this.heroes.set([]);
        },
      });
  }

  trackById(index: number, hero: IntHero): string {
    return hero.id;
  }

  ngOnDestroy(): void {
    this.heroes.set([]);
  }
}
