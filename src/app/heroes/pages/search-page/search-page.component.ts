/** Angular */
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** Rxjs */
import { switchMap, tap } from 'rxjs';

/** Services */
import { HeroService } from '../../services/hero.service';

/** Interfaces */
import { IntHero, IntPagination } from '../../interfaces';

/** Helpers */
import { getSizePageByDevice } from 'src/app/shared/helpers/device.helper';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  @Input() messageEmpty: string = 'No se han encontrado resultados';
  @Input() pagination: IntPagination = {
    startPage: 1,
    offset: getSizePageByDevice(),
  };
  public valueSearch = '';
  public heroes = signal<IntHero[]>([]);
  public showHeroes = computed<boolean>(() => !!this.heroes()?.length);

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private heroService: HeroService = inject(HeroService);

  //#region -----------------------------------------------------> HOOKS

  ngOnInit(): void {
    this.searchHeroes();
  }

  ngOnDestroy(): void {
    this.heroes.set([]);
  }

  //#endregion

  //#region -----------------------------------------------------> INIT

  searchHeroes(added: boolean = false) {
    this.activatedRoute.params
      .pipe(
        tap(({ valueSearch }) => {
          this.valueSearch = valueSearch;
        }),
        switchMap(({ valueSearch }) =>
          this.heroService.getSuggestions(valueSearch, this.pagination)
        )
      )
      .subscribe({
        next: (heroes) => {
          added
            ? this.heroes.set([...this.heroes(), ...heroes])
            : this.heroes.set(heroes);
        },
        error: (err) => console.error(err),
      });
  }

  //#endregion

  //#region -----------------------------------------------------> EVENTS

  onScroll = () => {
    this.pagination.startPage++;
    this.searchHeroes(true);
  };

  //#endregion

  //#region -----------------------------------------------------> AUX

  trackById(index: number, hero: IntHero): string {
    return hero.id;
  }

  //#endregion
}
