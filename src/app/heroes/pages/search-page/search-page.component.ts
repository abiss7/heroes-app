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
import { IntHero, IntPagination } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
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

  ngOnInit(): void {
    this.searchHeroes();
  }

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

  onScroll = () => {
    this.pagination.startPage++;
    this.searchHeroes(true);
  };

  trackById(index: number, hero: IntHero): string {
    return hero.id;
  }

  ngOnDestroy(): void {
    this.heroes.set([]);
  }
}
