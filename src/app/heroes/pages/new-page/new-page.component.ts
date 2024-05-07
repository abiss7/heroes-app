/** Angular */
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** Rxjs */
import { filter, switchMap, tap } from 'rxjs';

/** Angular Material */
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

/** Interfaces */
import { EnumPublisher, IntHero } from '../../interfaces';

/** Components */
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

/** Services */
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<EnumPublisher>(EnumPublisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: EnumPublisher.DCComics, desc: 'DC - Comics' },
    { id: EnumPublisher.MarvelComics, desc: 'Marvel - Comics' },
  ];

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackbar: MatSnackBar = inject(MatSnackBar);
  private dialog: MatDialog = inject(MatDialog);

  private heroService: HeroService = inject(HeroService);

  get currentHero(): IntHero {
    const hero = this.heroForm.value as IntHero;
    return hero;
  }

  //#region -----------------------------------------------------> HOOKS

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.initHero();
  }

  //#endregion

  //#region -----------------------------------------------------> INIT

  initHero() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe({
        next: (hero) => {
          if (!hero) return this.router.navigateByUrl('/');

          this.heroForm.reset(hero);
          return;
        },
        error: () => {
          this.router.navigateByUrl('/');
          return;
        },
      });
  }

  //#endregion

  //#region -----------------------------------------------------> EVENTS

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`${hero.superhero} updated!`);
      });

      return;
    }

    this.heroService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(['/heroes/edit', 'hero.id']);
      this.showSnackbar(`${hero.superhero} created!`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.navigateToListHeroes();
      });
  }

  //#endregion

  //#region -----------------------------------------------------> AUX

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
    this.navigateToListHeroes();
  }

  private navigateToListHeroes() {
    this.router.navigate(['/heroes']);
  }

  //#endregion
}
