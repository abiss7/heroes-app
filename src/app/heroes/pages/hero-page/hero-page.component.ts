// Angular
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Rxjs */
import { switchMap } from 'rxjs';

/** Interfaces */
import { IntHero } from '../../interfaces';

// Services
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent {
  public hero = signal<IntHero>({} as IntHero);

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private heroService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.initHero();
  }

  initHero() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe({
        next: (hero) => {
          if (!hero) return this.router.navigate(['/heroes/list']);
          this.hero.set(hero);
          return;
        },
        error: () => {
          this.hero.set({} as IntHero);
        },
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}
