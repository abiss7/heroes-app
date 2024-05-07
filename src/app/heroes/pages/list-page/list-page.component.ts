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

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  @Input() heroes = signal<IntHero[]>([]);
  @Input() messageEmpty: string = 'No se han encontrado resultados';
  showHeroes = computed<boolean>(() => !!this.heroes()?.length);

  private heroesService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.initHeroes();
  }

  initHeroes() {
    this.heroesService.getHeroes().subscribe({
      next: (heroes: IntHero[]) => {
        this.heroes.set([...heroes]);
      },
      error: () => {
        this.heroes.set([]);
      },
    });
  }

  trackById(index: number, hero: IntHero): string {
    return `${index}-${hero.id}`;
  }

  ngOnDestroy(): void {
    this.heroes.set([]);
  }
}
