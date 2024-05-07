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
import { Router } from '@angular/router';

/** Rxjs */
import { filter, switchMap } from 'rxjs';

/** Angular Material */
import { MatDialog } from '@angular/material/dialog';

/** Interfaces */
import { IntHero, IntPagination } from '../../interfaces';

/** Components */
import { DialogConfirmComponent } from '@components/dialog-confirm/dialog-confirm.component';

/** Services */
import { HeroService } from '../../services/hero.service';

/** Helpers */
import { getSizePageByDevice } from 'src/app/shared/helpers/device.helper';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  @Input() heroes = signal<IntHero[]>([]);
  @Input() messageEmpty: string = 'No se han encontrado resultados';
  @Input() pagination: IntPagination = {
    startPage: 1,
    offset: getSizePageByDevice(),
  };
  showHeroes = computed<boolean>(() => !!this.heroes()?.length);

  private router: Router = inject(Router);
  private dialog: MatDialog = inject(MatDialog);
  private heroService: HeroService = inject(HeroService);

  //#region -----------------------------------------------------> HOOKS

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngOnDestroy(): void {
    this.heroes.set([]);
  }

  //#endregion

  //#region -----------------------------------------------------> INIT

  loadHeroes(added: boolean = false) {
    this.heroService.getHeroes(this.pagination).subscribe({
      next: (heroes: IntHero[]) => {
        added
          ? this.heroes.set([...this.heroes(), ...heroes])
          : this.heroes.set([...heroes]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //#endregion

  //#region -----------------------------------------------------> EVENTS

  onScroll = () => {
    this.pagination.startPage++;
    this.loadHeroes(true);
  };

  onDelete(hero: IntHero) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: hero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroService.deleteHeroById(hero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.heroes.update((heroes) => {
          return heroes.filter((h) => h.id !== hero.id);
        });
        this.router.navigate(['/heroes']);
      });
  }

  //#endregion

  //#region -----------------------------------------------------> AUX

  trackById(index: number, hero: IntHero): string {
    return `${index}-${hero.id}`;
  }

  //#endregion
}
