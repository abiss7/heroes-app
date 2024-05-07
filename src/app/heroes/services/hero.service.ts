// Angular
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** Rxjs */
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

// Environments
import { environments } from 'src/environments/environments';

/** Interfaces */
import { IntHero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private baseUrl: string = environments.baseUrl;
  private http: HttpClient = inject(HttpClient);

  getHeroes(): Observable<IntHero[]> {
    return this.http.get<IntHero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<IntHero | null> {
    return this.http
      .get<IntHero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(null)));
  }

  getSuggestions(query: string): Observable<IntHero[]> {
    return this.http.get<IntHero[]>(
      `${this.baseUrl}/heroes?q=${query}&_limit=6`
    );
  }

  addHero(hero: IntHero): Observable<IntHero> {
    return this.http.post<IntHero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: IntHero): Observable<IntHero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.http.patch<IntHero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
