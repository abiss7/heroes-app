/** Angular */
import { Inject, Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

/** Rxjs */
import { Observable, delay, map, tap } from 'rxjs';

/** Services */
import { LoadingService } from '../services/laoding.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService: LoadingService = inject(LoadingService);

  // TODO: este parámetro se deja para simular una latencia por cada request. Se configura desde el App.Module
  constructor(@Inject('REQUEST_DELAY') private requestDelay: number) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.isLoading.set(true);
    return next.handle(req).pipe(
      delay(this.requestDelay),
      map((resp) => {
        this.loadingService.isLoading.set(false);
        return resp;
      })
    );
  }
}
